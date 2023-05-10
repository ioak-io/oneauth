/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './Header.scss';
import NoteModel from '../../../model/NoteModel';
import { Input, Link, Select, SelectPropsConverter } from 'basicui';

interface Props {
  noteList: NoteModel[];
  viewBy: string;
  show: string[];
  onChange: any;
}

const Header = (props: Props) => {

  const handleChange = (event: any, type: 'show' | 'viewBy') => {
    props.onChange({
      viewBy: type === 'viewBy' ? event.currentTarget.value : props.viewBy,
      show: type === 'show' ? event.currentTarget.value : props.show,
    })
  }

  return (
    <div className="search-results-header">
      <div className="search-results-header__left">
        {props.noteList.length} matching notes
      </div>
      <div className="search-results-header__right">
        <Select
          label='Group by'
          value={[props.viewBy]}
          onInput={(event: any) => handleChange(event, 'viewBy')}
          options={SelectPropsConverter.optionsFromSimpleList(['Label', 'Created On', 'Type'])} />
        <Select
          label='View'
          value={props.show}
          multiple
          onInput={(event: any) => handleChange(event, 'show')}
          options={SelectPropsConverter.optionsFromSimpleList(['Type', 'Labels', 'Keywords', 'Summary', 'Created on'])} />
      </div>
    </div>
  );
};

export default Header;
