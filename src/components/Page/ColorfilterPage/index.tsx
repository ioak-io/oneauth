import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import {
  faCheck,
  faChevronRight,
  faPlus,
  faTimes,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Select, Modal, ModalBody, ModalFooter, ModalHeader, ThemeType } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import {
  getColorfilter,
  moveColorfilter,
  saveColorfilter,
} from './service';
import ColorfilterModel from '../../../model/ColorfilterModel';
import MainSection from '../../../components/MainSection';
import { updateColorfilterItems } from '../../../store/actions/ColorfilterActions';
import ColorfilterItem from './ColorfilterItem';

interface Props {
  space: string;
}

const ColorfilterPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const colorfilterList = useSelector((state: any) => state.colorfilter.items);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');
  const [state, setState] = useState<ColorfilterModel[]>([]);
  const [moving, setMoving] = useState(false);

  const onNewFilterNameChange = (event: any) => {
    setNewFilterName(event.currentTarget.value);
  }

  const save = () => {
    saveColorfilter(props.space, { name: newFilterName, searchPref: {}, text: '', textList: [] }, authorization).then((response: any) => {
      setNewFilterName('');
      dispatch(updateColorfilterItems(response));
    });
  };

  const moveUp = (data: ColorfilterModel) => {
    setMoving(true);
    moveColorfilter(props.space, data._id || '', 'up', authorization).then((response) => {
      dispatch(updateColorfilterItems(response));
      setMoving(false);
    })
  }

  const moveDown = (data: ColorfilterModel) => {
    setMoving(true);
    moveColorfilter(props.space, data._id || '', 'down', authorization).then((response) => {
      dispatch(updateColorfilterItems(response));
      setMoving(false);
    })
  }

  return (
    <div className="colorfilter-page page-animate">
      <Topbar title="Color filters" />
      <MainSection>
        <div className="colorfilter-page__action">
          {!isPromptOpen && <Button onClick={() => setIsPromptOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> New filter
          </Button>}
          {isPromptOpen && <Input autoFocus name="name" value={newFilterName} onInput={onNewFilterNameChange} />}
          {isPromptOpen && <Button onClick={save} theme={ThemeType.primary}>
            <FontAwesomeIcon icon={faCheck} /> Create
          </Button>}{isPromptOpen && <Button onClick={() => setIsPromptOpen(false)}>
            <FontAwesomeIcon icon={faXmark} /> Cancel
          </Button>}
        </div>
        <div className="colorfilter-page__content">
          {colorfilterList.map((record: any, index: number) => (
            <ColorfilterItem
              key={record._id}
              space={props.space}
              data={record}
              first={index === 0}
              last={index === colorfilterList.length - 1}
              disabled={moving}
              moveDown={() => moveDown(record)}
              moveUp={() => moveUp(record)}
            />))}
        </div>
      </MainSection>
    </div>
  );
};

export default ColorfilterPage;
