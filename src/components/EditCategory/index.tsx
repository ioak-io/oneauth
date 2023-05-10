import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Select, Input, Button } from 'basicui';
import EditCategoryCommand from '../../events/EditCategoryCommand';
import {
  receiveMessage,
  sendMessage,
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveCategory } from './service';
import { updateCategoryItem } from '../../store/actions/CategoryActions';

interface Props {
  space: string;
}

const EMPTY_CATEGORY = { _id: undefined, name: '', kakeibo: '' };

const EditCategory = (props: Props) => {
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
    EditCategoryCommand.subscribe((message) => {
      if (message.open) {
        setState(
          message.record ? { ...message.record } : { ...EMPTY_CATEGORY }
        );
      }
      setIsOpen(message.open);
    });
  }, []);

  const handleClose = () => {
    EditCategoryCommand.next({ open: false });
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const updatekakeibo = (kakeibo: string) => {
    setState({ ...state, kakeibo });
  };

  const save = () => {
    saveCategory(props.space, state, authorization).then((response: any) => {
      dispatch(updateCategoryItem(response));
    });
    EditCategoryCommand.next({ open: false });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader onClose={handleClose}
          heading={state._id ? 'Edit category' : 'New category'} />
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
                <div>
                  <div className="edit-category__form__chips">
                    <button
                      className={`edit-category__form__chips__chip ${state.kakeibo === 'Needs'
                          ? 'edit-category__form__chips__chip--selected'
                          : ''
                        }`}
                      onClick={() => updatekakeibo('Needs')}
                    >
                      Needs
                    </button>
                    <button
                      className={`edit-category__form__chips__chip ${state.kakeibo === 'Wants'
                          ? 'edit-category__form__chips__chip--selected'
                          : ''
                        }`}
                      onClick={() => updatekakeibo('Wants')}
                    >
                      Wants
                    </button>
                    <button
                      className={`edit-category__form__chips__chip ${state.kakeibo === 'Culture'
                          ? 'edit-category__form__chips__chip--selected'
                          : ''
                        }`}
                      onClick={() => updatekakeibo('Culture')}
                    >
                      Culture
                    </button>
                    <button
                      className={`edit-category__form__chips__chip ${state.kakeibo === 'Unexpected'
                          ? 'edit-category__form__chips__chip--selected'
                          : ''
                        }`}
                      onClick={() => updatekakeibo('Unexpected')}
                    >
                      Unexpected
                    </button>
                  </div>
                </div>
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

export default EditCategory;
