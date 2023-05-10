import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';
import { Button, Input, Select, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader } from 'basicui';
import ManageFilterExpenseCommand from '../../events/ManageFilterExpenseCommand';
import {
  newId,
} from '../../events/MessageService';

import './style.scss';

import { publishAllFilters } from './service';
import ExpenseFilterModel from '../../model/ExpenseFilterModel';
import { fetchAndSetExpenseItems } from '../../store/actions/ExpenseActions';

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

const ManageFilterExpense = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const appliedFilter = useSelector((state: any) => state.expense.filter);
  const filterExpenseList = useSelector(
    (state: any) => state.filterExpense.items
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<ExpenseFilterModel[]>([]);

  useEffect(() => {
    ManageFilterExpenseCommand.subscribe((message) => {
      setIsOpen(message);
    });
  }, []);

  useEffect(() => {
    setState(cloneDeep(filterExpenseList));
  }, [isOpen]);

  useEffect(() => {
    setState(cloneDeep(filterExpenseList));
  }, [filterExpenseList]);

  const handleClose = () => {
    setState([]);
    ManageFilterExpenseCommand.next(false);
  };

  const handleChange = (event: any, index: number) => {
    const _state = [...state];
    _state[index] = { ..._state[index], [event.currentTarget.name]: event.currentTarget.value };
    setState([..._state]);
  };

  const handleCheckboxChange = (event: any, index: number) => {
    console.log(event.target.name, event.target.checked, typeof event.target.checked);
    const _state = [...state];
    _state[index] = { ..._state[index], [event.target.name]: event.target.checked };
    setState([..._state]);
  };

  const applyFilter = (record: ExpenseFilterModel) => {
    dispatch(fetchAndSetExpenseItems(props.space, authorization, record));
  };

  const deleteFilter = (record: ExpenseFilterModel) => {
    setState([...state.filter((item) => item._id !== record._id)]);
  };

  const save = () => {
    publishAllFilters(props.space, state, authorization);
    handleClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalHeader onClose={handleClose} heading="Manage filters" />
        <ModalBody>
          <div className="manage-filter-expense">
            <table className="basicui-table">
              <thead>
                <tr>
                  <th className="manage-filter-expense__column--name">
                    Filter name
                  </th>
                  <th className="manage-filter-expense__column--selection">
                    Summary
                  </th>
                  <th className="manage-filter-expense__column--selection">
                    Dashboard
                  </th>
                  <th className="manage-filter-expense__column--selection">
                    {' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                {state?.map((record: any, index: number) => (
                  <tr key={record._id}>
                    <td className="manage-filter-expense__column--name">
                      <Input
                        name="name"
                        onInput={(event: any) =>
                          handleChange(event, index)
                        }
                        value={record.name}
                      />
                    </td>
                    <td className="manage-filter-expense__column--selection">
                      <div>
                        <Checkbox
                          id=""
                          name="showInSummary"
                          defaultChecked={record.showInSummary}
                          onInput={(event: any) =>
                            handleCheckboxChange(event, index)
                          }
                        />
                      </div>
                    </td>
                    <td className="manage-filter-expense__column--selection">
                      <div>
                        <Checkbox
                          id=""
                          name="showInDashboard"
                          defaultChecked={record.showInDashboard}
                          onInput={(event: any) =>
                            handleCheckboxChange(event, index)
                          }
                        />
                      </div>
                    </td>
                    <td className="manage-filter-expense__column--selection">
                      <div className="manage-filter-expense__action">
                        {appliedFilter._id !== record._id && (
                          <Button
                            onClick={() => applyFilter(record)}
                          >
                            Apply
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteFilter(record)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="manage-filter-expense-footer">
            <Button onClick={save} >
              <FontAwesomeIcon icon={faChevronRight} />
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ManageFilterExpense;
