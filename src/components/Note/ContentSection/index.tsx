import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import './style.scss';
import NoteModel from '../../../model/NoteModel';
import { useNavigate, useParams } from 'react-router-dom';
import SectionContainer from '../ui/SectionContainer';
import EditControls from '../ui/EditControls';
import ViewControls from '../ui/ViewControls';
import { getEditorConfig } from '../../../utils/EditorUtils';
import { deleteNote, saveNote } from './service';
import HeadEditor from '../sections/HeadEditor';
import HeadViewer from '../sections/HeadViewer';
import ContentEditor from '../sections/ContentEditor';
import ContentViewer from '../sections/ContentViewer';
import MetadataEditor from '../sections/MetadataEditor';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import MetadataViewer from '../sections/MetadataViewer';
import LinksSection from '../LinksSection';
import AutoLinksSection from '../AutoLinksSection';
import { AlignmentType, Button, Modal, ModalBody, ModalFooter, ModalHeader, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteNoteItems } from '../../../store/actions/NoteActions';
import { deleteNotelinkItemsByNoteRef } from '../../../store/actions/NotelinkActions';
import { deleteNotelinkAutoItemsByNoteRef } from '../../../store/actions/NotelinkAutoActions';
import { generateReport } from '../../../components/Page/NotePage/service';
import { formatDate } from '../../../components/Lib/DateUtils';

interface Props {
  note: NoteModel;
  space: string;
  onPostNoteSave: any;
}

const ContentSection = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [metadataDefinitionMap, setMetadataDefinitionMap] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const params = useParams();
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEditContent, setIsEditContent] = useState(false);
  const [isEditMetadata, setIsEditMetadata] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [state, setState] = useState<NoteModel>({
    _id: '',
    content: '',
    name: '',
    reference: '',
    labels: []
  });
  const editor = getEditorConfig();

  useEffect(() => {
    setState(props.note);
  }, [props.note]);

  useEffect(() => {
    editor?.commands.setContent(props.note.content || '');
  }, [props.note.content, editor]);

  useEffect(() => {
    const _metadataDefinitionMap: any = {};
    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (_metadataDefinitionMap[item.group]) {
        _metadataDefinitionMap[item.group].push(item);
      } else {
        _metadataDefinitionMap[item.group] = [item];
      }
    })
    setMetadataDefinitionMap(_metadataDefinitionMap);
  }, [metadataDefinitionList]);

  const onCancelHead = () => {
    reset();
    setIsEditHead(false);
    setIsEdit(false);
  }
  const onCancelContent = () => {
    reset();
    setIsEditContent(false);
    setIsEdit(false);
  }
  const onCancelMetadata = (group: string) => {
    reset();
    setIsEditMetadata({});
    setIsEdit(false);
  }

  const reset = () => {
    setState({ ...props.note });
    editor?.commands.setContent(props.note.content || '');
  }

  const onEditHead = () => {
    setIsEditHead(true);
    setIsEdit(true);
  }
  const onEditContent = () => {
    setIsEditContent(true);
    setIsEdit(true);
  }
  const onEditMetadata = (group: string) => {
    setIsEditMetadata({ [group]: true });
    setIsEdit(true);
  }

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveNote(props.space, !!reload, { ...state, content: editor?.getHTML() }, authorization).then((response) => {
      props.onPostNoteSave(response);
      setIsEditContent(false);
      setIsEditHead(false);
      setIsEditMetadata({});
      setIsEdit(false);
      setSaving(false);
    }).catch(() => setSaving(false));
  }

  const onSaveContent = (event: any) => {
    onSave(event, true);
  }

  const handleEditStateChange = (_note: NoteModel) => {
    console.log(_note);
    setState({
      ..._note
    });
  }

  const onDelete = () => {
    setShowDeletePrompt(true);
  }

  const onConfirmDelete = () => {
    setDeleting(true);
    deleteNote(props.space, props.note.reference, authorization).then((response) => {
      dispatch(deleteNoteItems([response.note]));
      dispatch(deleteNotelinkItemsByNoteRef(response.note));
      dispatch(deleteNotelinkAutoItemsByNoteRef(response.note));
      setDeleting(false);
      setShowDeletePrompt(false);
      navigate(-1);
    })
  }

  const onPrint = () => {
    generateReport(props.space, props.note.reference, authorization).then((response => {
      var blob = new Blob([response], { type: "application/zip" });
      saveAs(`data:application/zip;base64,${response}`, `report_${formatDate(
        new Date(),
        'YYYYMMDD_HHmmss'
      )}.zip`);
    }))
  }

  return (
    <>
      <div className='note-content-section'>
        <SectionContainer>
          {isEditHead && <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />}
          {!isEditHead && <ViewControls onEdit={onEditHead} onRemove={onDelete} disable={isEdit} onPrint={onPrint} />}
          {isEditHead && <HeadEditor note={state} onChange={handleEditStateChange} />}
          {!isEditHead && <HeadViewer note={props.note} />}
        </SectionContainer>
        <SectionContainer>
          {isEditContent && <EditControls onCancel={onCancelContent} onSave={onSaveContent} saving={saving} />}
          {!isEditContent && <ViewControls onEdit={onEditContent} disable={isEdit} />}
          {isEditContent && <ContentEditor note={state} editor={editor} onChange={handleEditStateChange} />}
          {!isEditContent && <ContentViewer note={props.note} />}
        </SectionContainer>
        {Object.keys(metadataDefinitionMap).map(group =>
          <SectionContainer>
            {isEditMetadata[group] && <EditControls onCancel={() => onCancelMetadata(group)} onSave={onSave} saving={saving} />}
            {!isEditMetadata[group] && <ViewControls onEdit={() => onEditMetadata(group)} disable={isEdit} />}
            {isEditMetadata[group] && <MetadataEditor onChange={handleEditStateChange} note={state} group={group} metadataDefinitionList={metadataDefinitionMap[group]} />}
            {!isEditMetadata[group] && <MetadataViewer note={state} group={group} metadataDefinitionList={metadataDefinitionMap[group]} />}
          </SectionContainer>
        )}
        <LinksSection note={props.note} space={props.space} disable={false} />
        <AutoLinksSection note={props.note} space={props.space} disable={false} />
      </div>
      <Modal isOpen={showDeletePrompt} onClose={() => setShowDeletePrompt(false)}>
        <ModalBody>
          Are you sure you want to delete?
        </ModalBody>
        <ModalFooter alignment={AlignmentType.default}>
          <Button loading={deleting} onClick={onConfirmDelete} theme={ThemeType.danger}>
            <FontAwesomeIcon icon={faCheck} />
            Yes, delete</Button>
          <Button onClick={() => setShowDeletePrompt(false)}>
            <FontAwesomeIcon icon={faXmark} />
            Cancel</Button>
        </ModalFooter>

      </Modal>
    </>
  );
};

export default ContentSection;
