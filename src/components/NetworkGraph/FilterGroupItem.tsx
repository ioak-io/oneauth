/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  faCheck,
  faGear,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilterGroupItem.scss';
// import SearchBlock from '../FilterExplorer/SearchBlock';

interface Props {
  space: string;
  data: any;
  handleUpdate: any;
}

const FilterGroupItem = (props: Props) => {

  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const companyList = useSelector((state: any) => state.company.items);
  const [state, setState] = useState<any>({});

  useEffect(() => {
    setState({ ...props.data });
  }, [props.data]);

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    props.handleUpdate({ ...state });
  };

  const handleCriteriaChange = (criteria: any) => {
    console.log(criteria);
    setState({ ...state, criteria });
  };

  return (
    <div className="filter-group-item">
      {/* <SearchBlock
        space={props.space}
        handleChange={handleCriteriaChange}
        criteria={state.criteria}
      /> */}
      search block
      <input
        className="filter-group-item__color"
        value={state.color}
        type="color"
        name="color"
        onInput={handleChange}
      />
      <button className="button" onClick={handleUpdate}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default FilterGroupItem;
