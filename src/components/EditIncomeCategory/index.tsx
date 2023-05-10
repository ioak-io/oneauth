import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'basicui';
import {
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveIncomeCategory } from './service';
import EditIncomeCategoryCommand from '../../events/EditIncomeCategoryCommand';
import { updateIncomeCategoryItem } from '../../store/actions/IncomeCategoryActions';

interface Props {
  space: string;
}

const EMPTY_CATEGORY = { _id: undefined, name: '', kakeibo: '' };

const EditIncomeCategory = (props: Props) => {
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
    EditIncomeCategoryCommand.subscribe((message) => {
      if (message.open) {
        setState(
          message.record ? { ...message.record } : { ...EMPTY_CATEGORY }
        );
      }
      setIsOpen(message.open);
    });
  }, []);

  const handleClose = () => {
    EditIncomeCategoryCommand.next({ open: false });
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updatekakeibo = (kakeibo: string) => {
    setState({ ...state, kakeibo });
  };

  const save = () => {
    saveIncomeCategory(props.space, state, authorization).then(
      (response: any) => {
        dispatch(updateIncomeCategoryItem(response));
      }
    );
    EditIncomeCategoryCommand.next({ open: false });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader heading={state._id ? 'Edit income category' : 'New income category'} onClose={handleClose} />
        <ModalBody>
          <div className="edit-category">
            {isOpen && (
              <div className="edit-category__form">
                <Input
                  name="name"
                  value={state.name}
                  onInput={handleChange}
                  label="Category name"
                  autofocus
                />
              </div>
              // </OakForm>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="edit-category-footer">
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

export default EditIncomeCategory;
