/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchPref.scss';
import SearchByOption from './SearchByOption';
import { SearchOptionType } from './SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

interface Props {
  options: SearchOptionType[];
  searchPref: any;
  handleChange: any;
}

const SearchPref = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const onClick = (event: any, option: SearchOptionType) => {
    event.preventDefault();
    props.handleChange({
      ...props.searchPref, [option.name]: !props.searchPref[option.name]
    })
  }

  return (
    <div className='search-pref'>
      <div className='search-pref__info'>
        Search by
      </div>
      <div className='search-pref__options'>
        {props.options.map((option, index) =>
          <SearchByOption onClick={(event: any) => onClick(event, option)} option={option} key={index} searchPref={props.searchPref} />
        )}
      </div>
    </div>
  );
};

export default SearchPref;
