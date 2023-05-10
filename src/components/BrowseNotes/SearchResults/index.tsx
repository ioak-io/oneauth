/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import NoteModel from '../../../model/NoteModel';
import Header from './Header';
import NoteGroup from './NoteGroup';
import * as DateUtils from '../../Lib/DateUtils';

interface Props {
  space: string;
  noteList: NoteModel[];
  handleChange: any;
}

const SearchResults = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [viewBy, setViewBy] = useState<'Label' | 'Created On' | 'Type'>('Created On');
  const [show, setShow] = useState<string[]>(['Summary']);
  const [noteMap, setNoteMap] = useState<any>({});
  const [notegroups, setNotegroups] = useState<string[]>([]);

  useEffect(() => {
    let _noteMap: any = {};
    switch (viewBy) {
      case 'Created On':
        _noteMap = _groupByCreatedOn()
        break;

      case 'Type':
        _noteMap = _groupBy('type')
        break;

      default:
        _noteMap = _groupBy('primaryLabel');
        break;
    }
  }, [viewBy, props.noteList]);

  const _groupBy = (key: string) => {
    const _noteMap: any = {};

    props.noteList.forEach((note) => {
      const group = note[key] || '-';
      if (_noteMap[group]) {
        _noteMap[group].push(note);
      } else {
        _noteMap[group] = [note];
      }
    })
    setNotegroups(Object.keys(_noteMap).sort());
    setNoteMap(_noteMap);
  }

  const _groupByCreatedOn = () => {
    const _noteMap: any = {};

    props.noteList.forEach((note) => {
      const group = DateUtils.formatDateText(note.createdAt, DateUtils.FORMAT_MONTH_AND_YEAR) || '-';
      if (_noteMap[group]) {
        _noteMap[group].push(note);
      } else {
        _noteMap[group] = [note];
      }
    })
    setNotegroups(Object.keys(_noteMap));
    setNoteMap(_noteMap);
  }

  const handleViewChange = (data: any) => {
    setViewBy(data.viewBy);
    setShow(data.show);
  }

  return (
    <div className="search-results">
      <Header noteList={props.noteList} show={show} viewBy={viewBy} onChange={handleViewChange} />
      <div className="search-results__main">
        {notegroups.filter(item => item !== '-').map(group =>
          <NoteGroup noteList={noteMap[group]} group={group} space={props.space} key={group} show={show} />
        )}
        {noteMap['-'] && <NoteGroup noteList={noteMap['-']} group='-' space={props.space} show={show} />}
      </div>
    </div>
  );
};

export default SearchResults;
