/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
} from '@fortawesome/free-solid-svg-icons';

import './SearchResultItem.scss';
import NoteModel from '../../../model/NoteModel';
import NotetagModel from '../../../model/NotetagModel';
import { Link, ThemeType } from 'basicui';

interface Props {
  space: string;
  note: NoteModel;
  tagsMap: any;
  handleChange: any;
}

const SearchResultItem = (props: Props) => {
  return (
    <div className="search-result-item">
      <Link href={`/#/${props.space}/note/${props.note.reference}`} theme={ThemeType.primary}>
        <h4>{props.note.name}</h4>
      </Link>
      <div>{props.note.content.substr(0, 500)}</div>
      <div className="search-result-item__tag">
        {props.tagsMap[props.note.reference]?.map((item: NotetagModel) => (
          <button
            key={item._id}
            className="button search-result-item__tag__item bg-light-400 dark:bg-dark-200 hover:bg-light-500 hover:dark:bg-dark-100"
            onClick={() => props.handleChange(`tag:${item.name}`)}
          >
            <FontAwesomeIcon icon={faTag} />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultItem;
