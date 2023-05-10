import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input } from 'basicui';
import AddFilterExpenseCommand from '../../events/AddFilterExpenseCommand';
import {
  receiveMessage,
  sendMessage,
  newId,
} from '../../events/MessageService';

import './style.scss';

import { saveFilter } from './service';
import ExpenseFilterModel from '../../model/ExpenseFilterModel';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  space: string;
}

const EMPTY_FILTER: ExpenseFilterModel = {
  name: '',
  showInDashboard: false,
  showInSummary: false,
  from: '',
  to: '',
  description: '',
  moreThan: null,
  lessThan: null,
  days: null,
  months: null,
  monthNumber: null,
  yearNumber: null,
  categoryIdList: [],
  kakeiboList: [],
  tagIdList: [],
};

const AddFilterExpense = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const filterExpenseList = useSelector(
    (state: any) => state.filterExpense.items
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<ExpenseFilterModel>({ ...EMPTY_FILTER });
  const [existingFilter, setExistingFilter] =
    useState<ExpenseFilterModel | null>(null);

  useEffect(() => {
    AddFilterExpenseCommand.subscribe((message) => {
      setExistingFilter(null);
      if (message.open && message.payload) {
        setState({ ...EMPTY_FILTER, ...message.payload });
      }
      setIsOpen(message.open);
    });
  }, []);

  const handleClose = () => {
    AddFilterExpenseCommand.next({ open: false });
  };

  const handleChange = (event: any) => {
    setExistingFilter(null);
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    if (isEmptyOrSpaces(state.name)) {
      return;
    }
    if (existingFilter) {
      overwriteExistingFilter();
    }
    const _existingFilter = filterExpenseList.find(
      (item: ExpenseFilterModel) =>
        item.name?.toLowerCase() === state.name?.toLowerCase()
    );
    setExistingFilter(_existingFilter);
    if (!_existingFilter) {
      saveFilter(props.space, { ...state }, authorization);
      AddFilterExpenseCommand.next({ open: false });
    }
  };
  const overwriteExistingFilter = () => {
    saveFilter(
      props.space,
      {
        ...state,
        _id: existingFilter?._id,
        showInSummary: existingFilter?.showInSummary,
        showInDashboard: existingFilter?.showInDashboard,
      },
      authorization
    );
    AddFilterExpenseCommand.next({ open: false });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader onClose={handleClose} heading={existingFilter ? 'Update Filter' : 'New Filter'} />
        <ModalBody>
          <div className="add-filter-expense">
            {isOpen && (
              <form id={formId} onSubmit={save}>
                <div className="add-filter-expense__form">
                  <Input
                    name="name"
                    value={state.name || ''}
                    onInput={handleChange}
                    label="Filter name"
                    autofocus
                    required
                  />
                  {/* <div className="add-filter-expense__form__checkbox-group">
                <Checkbox
                  name="showInSummary"
                  value={!!state.showInSummary}
                  handleChange={handleChange}
                >
                  Show in summary section
                </Checkbox>
                <Checkbox
                  name="showInDashboard"
                  value={!!state.showInDashboard}
                  handleChange={handleChange}
                >
                  Show in Dashboard
                </Checkbox>
              </div> */}
                </div>
              </form>
            )}
          </div>
          {existingFilter && (
            <div className="add-filter-expense__form">
              A filter with this name already exists. Would you like to
              overwrite the filter?
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="add-filter-expense-footer">
            <Button type="submit" onClick={save}>
              <FontAwesomeIcon icon={faChevronRight} />
              {existingFilter ? 'Yes, Overwrite existing filter' : 'Save'}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddFilterExpense;
