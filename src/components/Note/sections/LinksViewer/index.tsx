import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import NotelinkModel from 'src/model/NotelinkModel';
import LinkView from '../LinkView';

interface Props {
  note: NoteModel;
  space: string;
  notelinkReferences: string[];
  heading: string;
}

const LinksViewer = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const noteMap = useSelector((state: any) => state.note.map);

  return (
    <div className="links-viewer">
      <h5>{props.heading}</h5>
      {props.notelinkReferences.map(item =>
        <>
          {noteMap[item] && <LinkView space={props.space} notelinkReferences={props.notelinkReferences} note={noteMap[item]} />}
        </>
      )}
    </div>
  );
};

export default LinksViewer;
