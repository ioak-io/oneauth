import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakButton from '../../../oakui/wc/OakButton';
import ListIncome from './ListIncome';
import './style.scss';
import { fetchAndSetIncomeItems } from '../../../store/actions/IncomeActions';
import Topbar from '../../../components/Topbar';
// import AddFilterIncome from '../../../components/AddFilterIncome';
// import ManageFilterIncome from '../../../components/ManageFilterIncome';
import EditCategory from '../../../components/EditCategory';
import IncomeFilterModel from '../../../model/IncomeFilterModel';
import GridFilter from '../../../components/GridFilter';
import EditIncome from '../../../components/EditIncome';
// import AddFilterIncomeCommand from '../../../events/AddFilterIncomeCommand';
// import ManageFilterIncomeCommand from '../../../events/ManageFilterIncomeCommand';

interface Props {
  history: any;
  space: string;
}

const EMPTY_FILTER: IncomeFilterModel = {
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
  tagIdList: [],
};

const IncomePage = (props: Props) => {
  const categories = useSelector((state: any) => state.incomeCategory.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const incomeFilterState: any = useSelector(
    (state: any) => state.income.filter
  );

  const [filterExpanded, setFilterExpanded] = useState(false);

  const toggleFilter = () => {
    setFilterExpanded(!filterExpanded);
  };

  const applyFilter = (searchCriteria: any) => {
    // setSearchCriteria(searchCriteria);
    // IncomeFilterState.next(searchCriteria);
    dispatch(
      fetchAndSetIncomeItems(props.space, authorization, {
        ...searchCriteria,
      })
    );
  };

  const saveFilter = (_state: any) => {
    // AddFilterIncomeCommand.next({ open: true, payload: { ..._state } });
  };

  const manageFilter = () => {
    // ManageFilterIncomeCommand.next(true);
  };

  return (
    <>
      {/* <AddIncome space={props.space} /> */}
      {/* <AddFilterIncome space={props.space} /> */}
      {/* <ManageFilterIncome space={props.space} /> */}

      <EditIncome space={props.space} />
      <div className="income-page page-animate">
        <Topbar title="Incomes">
          <div className="income-page__topbar__right">
            <button className="button" onClick={toggleFilter}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </Topbar>
        <div className="income-page__main">
          <div className="income-page__main__list">
            <ListIncome space={props.space} />
          </div>
        </div>
      </div>
      <div
        className={`income-page__filter ${
          filterExpanded ? 'income-page__filter--active' : ''
        }`}
      >
        <GridFilter
          applyFilter={applyFilter}
          closeFilter={toggleFilter}
          emptyFilter={EMPTY_FILTER}
          saveFilter={saveFilter}
          manageFilter={manageFilter}
          filterFromState={incomeFilterState}
          categories={categories}
        />
      </div>
    </>
  );
};

export default IncomePage;
