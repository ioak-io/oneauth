import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'basicui';
import EditTagCommand from '../../events/EditTagCommand';
import {
  receiveMessage,
  sendMessage,
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveTag } from './service';
import { updateTagItem } from '../../store/actions/TagActions';

interface Props {
  space: string;
}

const EMPTY_CATEGORY = { _id: undefined, name: '', kakeibo: '' };

const EditTag = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formId, setFormId] = useState(newId());
  const [stepNumber, setStepNumber] = useState(1);
  const [state, setState] = useState({ ...EMPTY_CATEGORY });
  const [anotherDay, setAnotherDay] = useState(false);
  const [todayDate, setTodayDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [yesterdayDate, setYesterdayDate] = useState(
    format(addDays(new Date(), 1), 'yyyy-MM-dd')
  );

  useEffect(() => {
    EditTagCommand.subscribe((message) => {
      if (message.open) {
        setState(
          message.record ? { ...message.record } : { ...EMPTY_CATEGORY }
        );
      }
      setIsOpen(message.open);
    });
  }, []);

  const handleClose = () => {
    EditTagCommand.next({ open: false });
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updatekakeibo = (kakeibo: string) => {
    setState({ ...state, kakeibo });
  };

  const save = () => {
    saveTag(props.space, state, authorization).then((response: any) => {
      dispatch(updateTagItem(response));
    });
    EditTagCommand.next({ open: false });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader heading={state._id ? 'Edit tag' : 'New tag'} onClose={handleClose} />
        <ModalBody>
          <div className="edit-tag">
            {isOpen && (
              <div className="edit-tag__form">
                <Input
                  name="name"
                  value={state.name}
                  onInput={handleChange}
                  label="Tag name"
                  autofocus
                />
              </div>
              // </OakForm>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="edit-tag-footer">
            <Button
              onClick={save}
            >
              <FontAwesomeIcon icon={faChevronRight} />
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditTag;
