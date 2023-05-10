import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { ButtonVariantType, IconButton, Input, Link, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faMinus, faPlus, faSearch, faTrash, faUnlink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AutoLinkViewModel } from '../../AutoLinksSection/AutoLinkViewModel';
import KeywordViewer from '../KeywordViewer';
import { appendNotelinkItem } from '../../../../store/actions/NotelinkActions';
import { saveNotelink } from '../LinksCreator/service';

interface Props {
  space: string;
  note: NoteModel;
  link?: AutoLinkViewModel;
  sourceNoteRef?: string;
}

const AutoLinkView = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [saving, setSaving] = useState(false);

  const addLink = () => {
    if (props.sourceNoteRef) {
      setSaving(false);
      saveNotelink(props.space, props.sourceNoteRef || '', props.note.reference, authorization).then((response: NoteModel) => {
        dispatch(appendNotelinkItem(response));
        setSaving(true);
      })
    }
  }

  return (
    <div className="auto-link-view">
      {props.sourceNoteRef && <IconButton loading={saving} variant={ButtonVariantType.outline} onClick={addLink}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>}
      <div>
        <Link className="auto-link-view__name" href={`/#/${props.space}/note/${props.note.reference}`}>
          {props.note.name}
        </Link>
        <div>
          {props.note.summary}
        </div>
        <KeywordViewer keywords={props.link?.keywords} />
      </div>
    </div>
  )
};

export default AutoLinkView;
