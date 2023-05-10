import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { searchNote } from '../../../../components/Page/BrowsePage/service';
import { ButtonVariantType, IconButton, Input, ThemeType } from 'basicui';
import { saveNotelink } from './service';
import LinkView from '../LinkView';
import { appendNotelinkItem, deleteNotelinkItems } from '../../../../store/actions/NotelinkActions';
import { deleteNotelink } from '../LinksEditor/service';

interface Props {
  note: NoteModel;
  space: string;
  notelinkReferences: string[];
}

const LinksCreator = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const notes = useSelector((state: any) => state.note.items);
  const [text, setText] = useState('');
  const [state, setState] = useState<NoteModel>({
    _id: '',
    content: '',
    name: '',
    reference: '',
    labels: []
  });

  const [results, setResults] = useState<NoteModel[]>([]);

  useEffect(() => {
    setState(props.note);
  }, [props.note]);

  const onSearch = (event: any) => {
    event.preventDefault();
    searchNote(props.space, { text }, authorization).then(
      (response: NoteModel[]) => {
        setResults(response);
      }
    );
  }

  const onReset = () => {
    setResults([]);
    setText('');
  }

  const addLink = (note: NoteModel) => {
    saveNotelink(props.space, props.note.reference, note.reference, authorization).then((response: NoteModel) => {
      dispatch(appendNotelinkItem(response));
    })
  }

  const removeLink = (note: NoteModel) => {
    deleteNotelink(props.space, props.note.reference, note.reference, authorization).then((response: NoteModel) => {
      dispatch(deleteNotelinkItems({
        sourceNoteRef: props.note.reference,
        linkedNoteRef: note.reference,
      }))
    });
  }

  const handleTextChange = (event: any) => {
    setText(event.currentTarget.value);
  }

  return (
    <div className="links-creator">
      <h6>Find new references to link</h6>

      <form className="links-creator__form" onSubmit={onSearch}>
        <Input name="text"
          value={text}
          onInput={handleTextChange}
          placeholder="Type to search"
          autoFocus />
        {/* <IconButton onClick={onSearch} circle theme={ThemeType.primary} variant={ButtonVariantType.transparent}>
          <FontAwesomeIcon icon={faSearch} />
        </IconButton> */}
      </form>
      <div className="links-creator__links">
        {results.filter(item => !props.notelinkReferences.includes(item.reference)).map((note: NoteModel) =>
          <LinkView space={props.space} notelinkReferences={props.notelinkReferences} note={note} addLink={() => addLink(note)} removeLink={() => removeLink(note)} />
        )}
      </div>
    </div>)
};

export default LinksCreator;
