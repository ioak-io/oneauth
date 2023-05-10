import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { saveNotelink } from '../LinksCreator/service';
import AutoLinkView from '../AutoLinkView';
import { appendNotelinkItem } from '../../../../store/actions/NotelinkActions';
import { AutoLinkViewModel } from '../../AutoLinksSection/AutoLinkViewModel';

interface Props {
  note: NoteModel;
  space: string;
  notelinkAutoReferences: AutoLinkViewModel[];
}

const AutoLinksEditor = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const noteMap = useSelector((state: any) => state.note.map);

  return (
    <div className="auto-links-editor">
      <h5>Suggested references</h5>
      {props.notelinkAutoReferences.map(item =>
        <>
          {noteMap[item.ref] && <AutoLinkView space={props.space} key={item.ref} sourceNoteRef={props.note.reference} note={noteMap[item.ref]} />}
        </>
      )}
    </div>
  );
};

export default AutoLinksEditor;
