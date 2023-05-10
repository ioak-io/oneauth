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
import NotelinkModel from '../../../model/NotelinkModel';
import AutoLinksEditor from '../sections/AutoLinksEditor';
import AutoLinksViewer from '../sections/AutoLinksViewer';
import { AutoLinkViewModel } from './AutoLinkViewModel';
import { saveNotelink } from '../sections/LinksCreator/service';
import { appendNotelinkItem } from '../../../store/actions/NotelinkActions';

interface Props {
  note: NoteModel;
  space: string;
  disable?: boolean;
}

const AutoLinksSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [saving, setSaving] = useState(false);
  const notelinkAutoList = useSelector((state: any) => state.notelinkAuto.items);
  const [notelinkAutoReferences, setNotelinkAutoReferences] = useState<AutoLinkViewModel[]>([]);
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

  useEffect(() => {

    const _notelinkAutoReferences: AutoLinkViewModel[] = [];

    const _notelinks = notelinkAutoList.filter((item: NotelinkModel) =>
      item.sourceNoteRef === props.note.reference || item.linkedNoteRef === props.note.reference
    )
    _notelinks.forEach((item: NotelinkModel) => {
      if (props.note.reference === item.sourceNoteRef) {
        _notelinkAutoReferences.push({ref: item.linkedNoteRef, keywords: item.keywords || []});
      } else {
        _notelinkAutoReferences.push({ref: item.sourceNoteRef, keywords: item.keywords || []});
      }
    })
    setNotelinkAutoReferences(_notelinkAutoReferences.filter(item => !notelinkReferences.includes(item.ref)));
  }, [props.note, notelinkAutoList, notelinkReferences]);

  const onEdit = () => {
    setMode('edit');
  }

  const onCancel = () => {
    setMode('view');
  }

  const addLink = (reference: string) => {
    saveNotelink(props.space, props.note.reference, reference, authorization).then((response: NoteModel) => {
      dispatch(appendNotelinkItem(response));
    })
  }

  return (
    <div className='auto-note-links-section'>
      <SectionContainer>
        {mode === 'edit' && <EditControls saving={saving} onCancel={onCancel} />}
        {mode === 'view' && <ViewControls onEdit={onEdit} disable={mode !== 'view' || !!props.disable} />}
        {mode === 'edit' && <AutoLinksEditor notelinkAutoReferences={notelinkAutoReferences} note={props.note} space={props.space} />}
        {mode === 'view' && <AutoLinksViewer heading="Suggested references" notelinkAutoReferences={notelinkAutoReferences} note={props.note} space={props.space} />}
      </SectionContainer>
    </div>
  );
};

export default AutoLinksSection;
