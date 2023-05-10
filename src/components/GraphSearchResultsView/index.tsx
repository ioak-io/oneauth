import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniqBy } from 'lodash';

import './style.scss';
import { getNotelinks } from './service';
import NetworkGraph from '../../components/NetworkGraph';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';
import NotetagModel from '../../model/NotetagModel';
import NoteModel from '../../model/NoteModel';
import BinaryChoiceInput from '../NetworkGraph/BinaryChoiceInput';

interface Props {
  space: string;
  noteNodes: NoteModel[];
}

const GraphSearchResultsView = (props: Props) => {

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const notes = useSelector((state: any) => state.note.items);
  const labelLinks = useSelector((state: any) => state.note.labelLinks);
  const notelinkList = useSelector((state: any) => state.notelink.items);
  const notelinkAutoList = useSelector((state: any) => state.notelinkAuto.items);
  const [noteNodes, setNoteNodes] = useState<NodeModel[]>([]);
  const [tagNodes, setTagNodes] = useState<NodeModel[]>([]);
  const [tagNodesFiltered, setTagNodesFiltered] = useState<NodeModel[]>([]);
  const [noteLinks, setNoteLinks] = useState<LinkModel[]>([]);
  const [noteLinksAuto, setNoteLinksAuto] = useState<LinkModel[]>([]);
  const [tagLinks, setTagLinks] = useState<LinkModel[]>([]);
  const [showAllNodes, setShowAllNodes] = useState(false);
  const [data, setData] = useState<any>({ nodes: [], links: [] });

  useEffect(() => {
    if (authorization.isAuth) {

      const _noteLinks = notelinkList
        .map((item: NotelinkModel) => ({
          source: item.sourceNoteRef,
          target: item.linkedNoteRef,
          type: 'link'
        }));
      setNoteLinks(
        _noteLinks
      );

      const _noteLinksAuto = notelinkAutoList
        .map((item: NotelinkModel) => ({
          source: item.sourceNoteRef,
          target: item.linkedNoteRef,
          type: 'auto-link'
        }));
      setNoteLinksAuto(
        _noteLinksAuto
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
  }, [authorization, notelinkAutoList, notelinkList, labelLinks]);

  useEffect(() => {
    if (showAllNodes) {
      setNoteNodes(
        notes.map((item: NoteModel) => ({
          name: item.name,
          reference: item.reference,
          group: 'note',
          color: item.color,
        }))
      );
    } else {
      const _noteMap: any = {};
      notes.forEach((item: NoteModel) => {
        _noteMap[item.reference] = item;
      });
      setNoteNodes(
        props.noteNodes.map((item: NoteModel) => ({
          name: item.name,
          reference: item.reference,
          group: 'note',
          color: _noteMap[item.reference]?.color,
        }))
      );
    }
  }, [props.noteNodes, notes, showAllNodes]);

  useEffect(() => {
    const _tagNodeIdList: string[] = [];
    const _nodeIdList: string[] = [];

    noteNodes.forEach((item) => {
      _nodeIdList.push(item.reference);
    });

    tagLinks.forEach((item) => {
      if (
        _nodeIdList.includes(item.source) ||
        _nodeIdList.includes(item.target)
      ) {
        _tagNodeIdList.push(item.source);
        _tagNodeIdList.push(item.target);
      }
    });
    setTagNodesFiltered(
      tagNodes.filter((item) => _tagNodeIdList.includes(item.reference))
    );
  }, [tagLinks, tagNodes, noteNodes]);

  useEffect(() => {
    setData({
      nodes: [...noteNodes, ...tagNodesFiltered],
      links: [...noteLinks, ...noteLinksAuto, ...tagLinks],
    });
  }, [noteNodes, tagNodesFiltered, noteLinks, noteLinksAuto, tagLinks]);

  return (
    <NetworkGraph data={data} space={props.space} offsetY={136}>
      <BinaryChoiceInput
        label="Show all nodes"
        value={showAllNodes}
        handleUpdate={(value: boolean) => setShowAllNodes(value)}
      />
    </NetworkGraph>
  );
};

export default GraphSearchResultsView;
