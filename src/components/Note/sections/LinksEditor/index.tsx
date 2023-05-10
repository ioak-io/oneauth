import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { searchNote } from '../../../../components/Page/BrowsePage/service';
import LinkView from '../LinkView';
import { saveNotelink } from '../LinksCreator/service';
import { deleteNotelink } from './service';
import { deleteNotelinkItems } from '../../../../store/actions/NotelinkActions';

interface Props {
  note: NoteModel;
  space: string;
  notelinkReferences: string[];
}

const LinksEditor = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const noteMap = useSelector((state: any) => state.note.map);

  const addLink = (reference: string) => {
    saveNotelink(props.space, props.note.reference, reference, authorization).then((response: NoteModel) => {
      console.log(response);
    })
  }

  const removeLink = (reference: string) => {
    deleteNotelink(props.space, props.note.reference, reference, authorization).then((response: NoteModel) => {
      console.log(response);
      dispatch(deleteNotelinkItems({
        sourceNoteRef: props.note.reference,
        linkedNoteRef: reference,
      }))
    });
  }

  return (
    <div className="links-editor">
      <h5>References</h5>
      {props.notelinkReferences.map(item =>
        <>
          {noteMap[item] &&
            <LinkView key={item} space={props.space} notelinkReferences={props.notelinkReferences} note={noteMap[item]} addLink={() => addLink(item)} removeLink={() => removeLink(item)} />}
        </>
      )}
    </div>
  );
};

export default LinksEditor;
