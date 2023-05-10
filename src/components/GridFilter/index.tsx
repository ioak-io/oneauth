import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCheck,
  faChevronRight,
  faCog,
  faCogs,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from 'basicui';

import './style.scss';
import { newId } from '../../events/MessageService';
import CategorySelection from './CategorySelection';
import KakeiboSelection from './KakeiboSelection';
import ExpenseFilterModel from '../../model/ExpenseFilterModel';
import TagSelection from './TagSelection';

interface Props {
  emptyFilter: any;
  applyFilter: any;
  closeFilter: any;
  saveFilter: any;
  manageFilter: any;
  filterFromState: any;
  categories?: any[];
}

const GridFilter = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [formId, setFormId] = useState(newId());

  const [state, setState] = useState<ExpenseFilterModel>({
    ...props.emptyFilter,
  });

  useEffect(() => {
    setState({ ...props.filterFromState });
  }, [props.filterFromState]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
      _id: undefined,
      name: '',
    });
  };

  const handleCategoryChange = (categoryIdList: string[]) => {
    setState({ ...state, categoryIdList, _id: undefined, name: '' });
  };

  const handleKakeiboChange = (kakeiboList: string[]) => {
    setState({ ...state, kakeiboList, _id: undefined, name: '' });
  };

  const handleTagChange = (tagIdList: string[]) => {
    setState({ ...state, tagIdList, _id: undefined, name: '' });
  };

  const applyFilter = () => {
    props.applyFilter({ ...state });
    props.closeFilter();
  };

  const resetFilter = () => {
    props.applyFilter({ ...props.emptyFilter });
    setState({ ...props.emptyFilter });
    props.closeFilter();
  };

  const saveFilter = () => {
    props.saveFilter({ ...state });
  };

  const manageFilter = () => {
    props.manageFilter();
  };

  return (
    <div className="grid-filter">
      {/* <div className="grid-filter__topbar">Filter criteria</div> */}
      <div className="grid-filter__name">
        <div>{state._id ? state.name : 'New filter'}</div>
        <button className="button" onClick={props.closeFilter}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="grid-filter__main">
        <Input
          name="description"
          value={state.description || ''}
          onInput={handleChange}
          label="Search text"
          placeholder="search in description"
        />
        <div className="form-two-column">
          <Input
            name="moreThan"
            value={state.moreThan || 0}
            type="number"
            onInput={handleChange}
            label="Amount more than"
            placeholder="amount above"
          />
          <Input
            name="lessThan"
            value={state.lessThan || 0}
            type="number"
            onInput={handleChange}
            label="Amount less than"
            placeholder="amount upto"
          />
          <Input
            name="from"
            value={state.from || ''}
            type="date"
            onInput={handleChange}
            placeholder="From"
            label="From"
          />
          <Input
            name="to"
            value={state.to || ''}
            type="date"
            onInput={handleChange}
            placeholder="To"
            label="To"
          />
          <Input
            name="days"
            value={state.days || 0}
            type="number"
            onInput={handleChange}
            label="Past N days"
            placeholder="days in relation to today"
          />
          <Input
            name="months"
            value={state.months || 0}
            type="number"
            onInput={handleChange}
            label="Past N months"
            placeholder="calendar months"
          />
          <Input
            name="monthNumber"
            value={state.monthNumber || 0}
            type="number"
            onInput={handleChange}
            label="Nth month"
            placeholder="single month data"
            tooltip="Tip: 6 indicates January month this year, if current month is June"
          />
          <Input
            name="yearNumber"
            value={state.yearNumber || 0}
            type="number"
            onInput={handleChange}
            label="Nth year"
            placeholder="single year data"
            tooltip="Tip: 3 indicates year 2020, if current year is 2022"
          />
        </div>
        {props.categories && <CategorySelection
          handleChange={handleCategoryChange}
          categoryIdList={state.categoryIdList}
          categories={props.categories}
        />}
        {state.kakeiboList && (
          <KakeiboSelection
            handleChange={handleKakeiboChange}
            kakeiboList={state.kakeiboList}
          />
        )}
        <TagSelection
          handleChange={handleTagChange}
          tagIdList={state.tagIdList}
        />
      </div>
      <div className="grid-filter__action">
        <Button onClick={applyFilter}>
          <FontAwesomeIcon icon={faCheck} /> Apply
        </Button>
        <Button onClick={saveFilter}>
          <FontAwesomeIcon icon={faBookmark} /> Save
        </Button>
        <Button onClick={resetFilter}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Button onClick={manageFilter}>
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </div>
    </div>
  );
};

export default GridFilter;
