import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../model/NoteModel';
import LinksViewer from '../sections/LinksViewer';
import LinksEditor from '../sections/LinksEditor';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import LinksCreator from '../sections/LinksCreator';
import NotelinkModel from 'src/model/NotelinkModel';

interface Props {
  note: NoteModel;
  space: string;
  disable?: boolean;
}

const LinksSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [mode, setMode] = useState<'view' | 'edit' | 'add'>('view');
  const [saving, setSaving] = useState(false);
  const notelinkList = useSelector((state: any) => state.notelink.items);
  const [notelinkReferences, setNotelinkReferences] = useState<string[]>([]);

  useEffect(() => {

    const _notelinkReferences: string[] = [];

    const _notelinks = notelinkList.filter((item: NotelinkModel) =>
      item.sourceNoteRef === props.note.reference || item.linkedNoteRef === props.note.reference
    )
    _notelinks.forEach((item: NotelinkModel) => {
      if (props.note.reference === item.sourceNoteRef) {
        _notelinkReferences.push(item.linkedNoteRef);
      } else {
        _notelinkReferences.push(item.sourceNoteRef);
      }
    })
    setNotelinkReferences(_notelinkReferences);
  }, [props.note, notelinkList]);

  const onSave = () => {

  }

  const onEdit = () => {
    setMode('edit');
  }

  const onAdd = () => {
    setMode('add');
  }

  const onCancel = () => {
    setMode('view');
  }

  return (
    <div className='note-links-section'>
      <SectionContainer>
        {mode === 'edit' && <EditControls onCancel={onCancel} />}
        {mode === 'view' && <ViewControls onEdit={onEdit} disable={mode !== 'view' || !!props.disable} />}
        {mode === 'edit' &&
          <div>
            <LinksEditor notelinkReferences={notelinkReferences} note={props.note} space={props.space} />
            <LinksCreator notelinkReferences={notelinkReferences} note={props.note} space={props.space} />
          </div>
        }
        {mode === 'view' && <LinksViewer heading="References" notelinkReferences={notelinkReferences} note={props.note} space={props.space} />}
      </SectionContainer>
    </div>
  );
};

export default LinksSection;
