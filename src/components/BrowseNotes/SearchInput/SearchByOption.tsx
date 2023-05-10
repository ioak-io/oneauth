/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchByOption.scss';
import { SearchOptionType } from './SearchOptionType';

interface Props {
  onClick: any;
  option: SearchOptionType;
  searchPref: any;
}

const SearchByOption = (props: Props) => {

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.searchPref) { setActive(props.searchPref[props.option.name]); }
  }, [props.searchPref, props.option]);

  return (
    <button
      onClick={props.onClick}
      className={`search-by-option ${active ? 'search-by-option--active' : ''}`}>
      {props.option.label}
    </button>
  );
};

export default SearchByOption;
