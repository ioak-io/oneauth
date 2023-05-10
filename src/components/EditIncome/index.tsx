import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMoneyBill,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Select, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader } from 'basicui';
import EditIncomeCommand from '../../events/EditIncomeCommand';
import {
  receiveMessage,
  sendMessage,
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveIncome } from './service';
import CategorySelection from './CategorySelection';
import { isEmptyOrSpaces } from '../Utils';
import { ONEAUTH_PREF_ADDEXPENSE_ANOTHER } from '../../constants/SessionStorageConstants';
import TagSelection from './TagSelection';
import IncomeModel from '../../model/IncomeModel';
import { updateIncomeItems } from '../../store/actions/IncomeActions';

interface Props {
  space: string;
}

const EditIncome = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emptyIncome, setEmptyIncome] = useState<any>({
    _id: undefined,
    description: '',
    billDateString: format(new Date(), 'yyyy-MM-dd'),
    amount: undefined,
    category: '',
    tagId: [],
    billId: undefined,
  });
  const authorization = useSelector((state: any) => state.authorization);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState({ ...emptyIncome });
  const [addAnother, setAddAnother] = useState(false);

  const [categoryNotChosen, setCategoryNotChosen] = useState(false);

  useEffect(() => {
    setFormId(newId());
  }, [isOpen]);

  useEffect(() => {
    EditIncomeCommand.subscribe((message) => {
      if (message.open && message.record) {
        setState({
          description: message.record.description,
          amount: message.record.amount,
          billDateString: message.record.billDate,
          _id: message.record._id,
          category: message.record.category,
          tagId: message.record.tagId,
        });
      }
      setIsOpen(message.open);
    });

    if (sessionStorage.getItem(ONEAUTH_PREF_ADDEXPENSE_ANOTHER)) {
      setAddAnother(
        sessionStorage.getItem(ONEAUTH_PREF_ADDEXPENSE_ANOTHER) === 'true'
      );
    }
  }, []);

  const handleClose = () => {
    setCategoryNotChosen(false);
    setState({ ...emptyIncome });
    EditIncomeCommand.next({ open: false, record: null });
  };

  const handleChange = (event: any) => {
    console.log(emptyIncome);
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
    if (event.currentTarget.name === 'billDateString') {
      setEmptyIncome({ ...emptyIncome, billDateString: event.currentTarget.value });
    }
  };

  const handleCategoryChange = (category: string) => {
    setState({ ...state, category });
    setCategoryNotChosen(false);
  };

  const handleRemoveTag = (tagId: string) => {
    console.log('remove', tagId);
    setState({
      ...state,
      tagId: state.tagId.filter((_tagId: any) => _tagId !== tagId),
    });
  };

  const handleAddTag = (tagId: string) => {
    if (state.tagId) {
      setState({ ...state, tagId: [...state.tagId, tagId] });
    } else {
      setState({ ...state, tagId: [tagId] });
    }
  };

  const toggleAddAnother = () => {
    sessionStorage.setItem(
      ONEAUTH_PREF_ADDEXPENSE_ANOTHER,
      (!addAnother).toString()
    );
    setAddAnother(!addAnother);
  };

  const save = () => {
    if (isEmptyOrSpaces(state.category)) {
      setCategoryNotChosen(true);
      return;
    }
    if (state.billDateString && state.amount && state.description) {
      saveIncome(
        props.space,
        { ...state, billDate: state.billDateString },
        authorization
      ).then((response: any) => {
        if (!addAnother || state._id) {
          EditIncomeCommand.next({ open: false, record: null });
        }
        setState({ ...emptyIncome });
        setCategoryNotChosen(false);
        dispatch(updateIncomeItems([response]));
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader onClose={handleClose} heading="New income" />
        <ModalBody>
          <div className="add-income">
            {isOpen && (
              <div className="form">
                <div className="form-two-column">
                  <Input
                    name="billDateString"
                    value={state.billDateString}
                    type="date"
                    onInput={handleChange}
                    label="Bill date"
                    required
                    disabled={state.billId}
                  />

                  <Input
                    name="amount"
                    value={state.amount}
                    type="number"
                    onInput={handleChange}
                    label="Amount"
                    autofocus
                  />
                </div>
                <Input
                  name="description"
                  value={state.description}
                  onInput={handleChange}
                  label="Details of the expenditure"
                  required
                />
                <CategorySelection
                  handleChange={handleCategoryChange}
                  categoryId={state.category}
                  error={categoryNotChosen}
                />
                <TagSelection
                  addTag={handleAddTag}
                  removeTag={handleRemoveTag}
                  tagId={state.tagId}
                />
              </div>
            )}
          </div>
        </ModalBody>
        <div slot="footer">
          <div className="add-income-footer">
            {!state._id && (
              <Checkbox
                id=""
                name="addAnother"
                value={addAnother}
                onInput={toggleAddAnother}
              >
                Add another
              </Checkbox>
            )}
            <Button
              onClick={save}
            >
              <FontAwesomeIcon icon={faChevronRight} /> Save
            </Button>
            <Button
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditIncome;
