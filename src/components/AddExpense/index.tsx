import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMoneyBill,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalHeader, ModalFooter, Input, Checkbox, Select, Button } from 'basicui';
import QuickEditExpenseCommand from '../../events/QuickEditExpenseCommand';
import {
  receiveMessage,
  sendMessage,
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveExpense } from './service';
import CategorySelection from './CategorySelection';
import { isEmptyOrSpaces } from '../Utils';
import { ONEAUTH_PREF_ADDEXPENSE_ANOTHER } from '../../constants/SessionStorageConstants';
import TagSelection from './TagSelection';
import ExpenseModel from '../../model/ExpenseModel';
import { updateExpenseItems } from '../../store/actions/ExpenseActions';
import { useNavigate } from 'react-router-dom';

interface Props {
  space: string;
}

const AddExpense = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emptyExpense, setEmptyExpense] = useState<any>({
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
  const [state, setState] = useState({ ...emptyExpense });
  const [addAnother, setAddAnother] = useState(false);

  const [categoryNotChosen, setCategoryNotChosen] = useState(false);

  useEffect(() => {
    setFormId(newId());
  }, [isOpen]);

  useEffect(() => {
    QuickEditExpenseCommand.subscribe((message) => {
      if (message.open && message.record) {
        setState({
          description: message.record.description,
          amount: message.record.amount,
          billDateString: message.record.billDate,
          _id: message.record._id,
          category: message.record.category,
          billId: message.record.billId,
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
    setState({ ...emptyExpense });
    QuickEditExpenseCommand.next({ open: false, record: null });
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
    if (event.currentTarget.name === 'billDateString') {
      setEmptyExpense({ ...emptyExpense, billDateString: event.currentTarget.value });
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
      saveExpense(
        props.space,
        { ...state, billDate: state.billDateString },
        authorization
      ).then((response: any) => {
        if (!addAnother || state._id) {
          QuickEditExpenseCommand.next({ open: false, record: null });
        }
        setState({ ...emptyExpense });
        setCategoryNotChosen(false);
        dispatch(updateExpenseItems([response]));
      });
    }
  };

  const goToEditBill = () => {
    QuickEditExpenseCommand.next({ open: false, record: null });
    navigate(`/${props.space}/receipt/edit?id=${state.billId}`);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalBody>
          <div className="add-expense">
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
            {/* </OakForm> */}
          </div>
        </ModalBody>
        <ModalFooter>
          {!state._id && (
            <Checkbox
              id="addAnother"
              name="addAnother"
              checked={addAnother}
              onInput={toggleAddAnother}
              label="Add another" />
          )}
          <Button
            onClick={save}
          >
            <FontAwesomeIcon icon={faChevronRight} /> Save
          </Button>
          {state.billId && (
            <Button
              onClick={goToEditBill}
            >
              <FontAwesomeIcon icon={faMoneyBill} /> Go to bill
            </Button>
          )}
          <Button
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddExpense;
