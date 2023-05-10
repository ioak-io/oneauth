import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import NotelinkModel from 'src/model/NotelinkModel';
import LinkView from '../LinkView';
import { AutoLinkViewModel } from '../../AutoLinksSection/AutoLinkViewModel';
import AutoLinkView from '../AutoLinkView';

interface Props {
  note: NoteModel;
  space: string;
  notelinkAutoReferences: AutoLinkViewModel[];
  heading: string;
}

const AutoLinksViewer = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const noteMap = useSelector((state: any) => state.note.map);

  return (
    <div className="auto-links-viewer">
      <h5>{props.heading}</h5>
      {props.notelinkAutoReferences.map(item =>
        <>
          {noteMap[item.ref] && <AutoLinkView space={props.space} note={noteMap[item.ref]} link={item} />}
        </>
      )}
    </div>
  );
};

export default AutoLinksViewer;
