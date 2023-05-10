import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { getNearestLinks, getNotelinks } from './service';
import NetworkGraph from '../../components/NetworkGraph';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';
import NotetagModel from '../../model/NotetagModel';
import NoteModel from '../../model/NoteModel';

interface Props {
  space: string;
  noteref: string;
  isContextExpanded: boolean;
}

const GraphView = (props: Props) => {

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const notes = useSelector((state: any) => state.note.items);
  const labelLinks = useSelector((state: any) => state.note.labelLinks);
  const notelinkList = useSelector((state: any) => state.notelink.items);
  const notelinkAutoList = useSelector((state: any) => state.notelinkAuto.items);
  const [noteNodes, setNoteNodes] = useState<NodeModel[]>([]);
  const [tagNodes, setTagNodes] = useState<NodeModel[]>([]);
  const [noteLinks, setNoteLinks] = useState<LinkModel[]>([]);
  const [tagLinks, setTagLinks] = useState<LinkModel[]>([]);
  const [data, setData] = useState<any>({ nodes: [], links: [] });
  const [depth, setDepth] = useState<number>(1);

  useEffect(() => {
    if (authorization.isAuth && props.noteref) {
      const _noteLinks: any = getNearestLinks([...notelinkAutoList, ...notelinkList], [props.noteref], depth).map((item: NotelinkModel) => ({
        source: item.sourceNoteRef,
        target: item.linkedNoteRef,
        type: (item.keywords && item.keywords.length > 0) ? 'auto-link' : 'link'
      }));;
      setNoteLinks(
        _noteLinks
      );
      const _tagLinks: LinkModel[] = [];
      const _tagNodes: NodeModel[] = [];
      labelLinks.forEach((item: NotetagModel) => {
        _tagLinks.push({
          source: item.noteRef,
          target: item.name,
          type: 'tag'
        });
        _tagNodes.push({
          name: `#${item.name}`,
          reference: item.name,
          group: 'tag',
        });
      });
      setTagLinks(_tagLinks);
      setTagNodes(uniqBy(_tagNodes, 'reference'));
    }
  }, [authorization, props.noteref, depth, notelinkList, notelinkAutoList, labelLinks]);

  useEffect(() => {
    setNoteNodes(
      notes.map((item: NoteModel) => ({
        name: item.name,
        reference: item.reference,
        group: 'note',
        color: item.color,
      }))
    );
  }, [notes]);

  useEffect(() => {
    const _links = [...noteLinks, ...tagLinks];

    const _linkedNoteNodes: string[] = [];
    const _linkedTagNodes: string[] = [];
    [...noteLinks].forEach((item) => {
      _linkedNoteNodes.push(item.source);
      _linkedNoteNodes.push(item.target);
    });
    tagLinks
      .filter(
        (item) =>
          _linkedNoteNodes.includes(item.source) ||
          _linkedNoteNodes.includes(item.target)
      )
      .forEach((item) => {
        _linkedTagNodes.push(item.source);
        _linkedTagNodes.push(item.target);
      });

    const _nodes = [...noteNodes, ...tagNodes].filter(
      (item) =>
        _linkedNoteNodes.includes(item.reference) ||
        _linkedTagNodes.includes(item.reference)
    );

    setData({
      nodes: _nodes,
      links: _links,
    });
  }, [noteLinks, noteNodes, tagLinks, tagNodes]);

  const increaseDepth = () => {
    setDepth(depth + 1);
  };

  const decreaseDepth = () => {
    if (depth > 1) { setDepth(depth - 1); }
  };

  return (
    <>
      <div>
        <NetworkGraph
          data={data}
          space={props.space}
          offsetX={props.isContextExpanded ? 350 : 0}
          focusNodeRef={props.noteref}
        >
          <div className="graph-view__depth-control">
            <div className="graph-view__depth-control__text">Depth</div>
            <div className="graph-view__depth-control__action">
              {depth > 1 && (
                <button className="button" onClick={decreaseDepth}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
              <div>{depth}</div>
              <button className="button" onClick={increaseDepth}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </NetworkGraph>
      </div>
    </>
  );
};

export default GraphView;
