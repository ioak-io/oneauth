import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakButton from '../../../oakui/wc/OakButton';
import ListExpense from './ListExpense';
import './style.scss';
import Summary from './Summary';
import AddExpense from '../../AddExpense';
import { ExpenseFilterState } from '../../../simplestates/ExpenseFilterState';
import { fetchAndSetExpenseItems } from '../../../store/actions/ExpenseActions';
import Topbar from '../../../components/Topbar';
import AddFilterExpense from '../../../components/AddFilterExpense';
import ManageFilterExpense from '../../../components/ManageFilterExpense';
import EditCategory from '../../../components/EditCategory';
import ExpenseFilterModel from '../../../model/ExpenseFilterModel';
import AddFilterExpenseCommand from '../../../events/AddFilterExpenseCommand';
import ManageFilterExpenseCommand from '../../../events/ManageFilterExpenseCommand';
import GridFilter from '../../../components/GridFilter';

interface Props {
  history: any;
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

const ExpensePage = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const expenseFilterState: any = useSelector(
    (state: any) => state.expense.filter
  );

  const [filterExpanded, setFilterExpanded] = useState(false);

  const toggleFilter = () => {
    setFilterExpanded(!filterExpanded);
  };

  const applyFilter = (searchCriteria: any) => {
    // setSearchCriteria(searchCriteria);
    // ExpenseFilterState.next(searchCriteria);
    dispatch(
      fetchAndSetExpenseItems(props.space, authorization, {
        ...searchCriteria,
      })
    );
  };

  const saveFilter = (_state: any) => {
    AddFilterExpenseCommand.next({ open: true, payload: { ..._state } });
  };

  const manageFilter = () => {
    ManageFilterExpenseCommand.next(true);
  };

  return (
    <>
      <AddExpense space={props.space} />
      <EditCategory space={props.space} />
      <AddFilterExpense space={props.space} />
      <ManageFilterExpense space={props.space} />
      <div className="expense-page page-animate">
        <Topbar title="Expenses">
          <div className="expense-page__topbar__right">
            <button className="button" onClick={toggleFilter}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </Topbar>
        <div className="expense-page__main">
          <div className="expense-page__main__summary">
            <Summary space={props.space} />
          </div>
          <div className="expense-page__main__list">
            <ListExpense space={props.space} />
          </div>
        </div>
      </div>
      <div
        className={`expense-page__filter ${
          filterExpanded ? 'expense-page__filter--active' : ''
        }`}
      >
        <GridFilter
          applyFilter={applyFilter}
          closeFilter={toggleFilter}
          emptyFilter={EMPTY_FILTER}
          saveFilter={saveFilter}
          manageFilter={manageFilter}
          filterFromState={expenseFilterState}
          categories={categories}
        />
      </div>
    </>
  );
};

export default ExpensePage;
