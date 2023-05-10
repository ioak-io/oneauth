import {
  faFileExport,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakButton from '../../../oakui/wc/OakButton';
import ListReceipt from './ListReceipt';
import './style.scss';
import { fetchAndSetReceiptItems } from '../../../store/actions/ReceiptActions';
import Topbar from '../../../components/Topbar';
// import AddFilterReceipt from '../../../components/AddFilterReceipt';
// import ManageFilterReceipt from '../../../components/ManageFilterReceipt';
import EditCategory from '../../../components/EditCategory';
import ReceiptFilterModel from '../../../model/ReceiptFilterModel';
import GridFilter from '../../../components/GridFilter';
// import AddFilterReceiptCommand from '../../../events/AddFilterReceiptCommand';
// import ManageFilterReceiptCommand from '../../../events/ManageFilterReceiptCommand';

interface Props {
  history: any;
  space: string;
}

const EMPTY_FILTER: ReceiptFilterModel = {
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

const ReceiptPage = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const receiptFilterState: any = useSelector(
    (state: any) => state.receipt.filter
  );

  const [filterExpanded, setFilterExpanded] = useState(false);

  const toggleFilter = () => {
    setFilterExpanded(!filterExpanded);
  };

  const applyFilter = (searchCriteria: any) => {
    // setSearchCriteria(searchCriteria);
    // ReceiptFilterState.next(searchCriteria);
    dispatch(
      fetchAndSetReceiptItems(props.space, authorization, {
        ...searchCriteria,
      })
    );
  };

  const saveFilter = (_state: any) => {
    // AddFilterReceiptCommand.next({ open: true, payload: { ..._state } });
  };

  const manageFilter = () => {
    // ManageFilterReceiptCommand.next(true);
  };

  return (
    <>
      {/* <AddReceipt space={props.space} /> */}
      {/* <AddFilterReceipt space={props.space} /> */}
      {/* <ManageFilterReceipt space={props.space} /> */}
      <div className="receipt-page page-animate">
        <Topbar title="Receipts">
          <div className="receipt-page__topbar__right">
            <button className="button" onClick={toggleFilter}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </Topbar>
        <div className="receipt-page__main">
          <div className="receipt-page__main__list">
            <ListReceipt space={props.space} />
          </div>
        </div>
      </div>
      <div
        className={`receipt-page__filter ${
          filterExpanded ? 'receipt-page__filter--active' : ''
        }`}
      >
        <GridFilter
          applyFilter={applyFilter}
          closeFilter={toggleFilter}
          emptyFilter={EMPTY_FILTER}
          saveFilter={saveFilter}
          manageFilter={manageFilter}
          filterFromState={receiptFilterState}
        />
      </div>
    </>
  );
};

export default ReceiptPage;
