/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import './FilterGroup.scss';
import FilterGroupItem from './FilterGroupItem';

interface Props {
  space: string;
  data: any[];
  handleUpdate: any;
}

const FilterGroup = (props: Props) => {
  const navigate = useNavigate();

  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const companyList = useSelector((state: any) => state.company.items);

  const addNew = () => {
    props.handleUpdate({
      criteria: '',
      color: '#999',
    });
  };

  return (
    <div className="filter-group">
      <div className="filter-group__list">
        {props.data.map((item: any) => (
          <FilterGroupItem
            key={item._id}
            space={props.space}
            data={item}
            handleUpdate={props.handleUpdate}
          />
        ))}
      </div>
      <div className="filter-group__new">
        <button className="button" onClick={addNew}>
          New group
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;
