/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  NOTE_ITEMS_FETCH_AND_SET,
  NOTE_ITEMS_UPDATE,
  NOTE_ITEMS_APPEND,
  NOTE_ITEMS_DELETE,
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
  map: {},
  labelLinks: []
};

const buildDataMap = (data: any[]) => {
  const dataMap: any = {};
  data.forEach(item => {
    dataMap[item.reference] = item;
  });
  return dataMap;
}

const buildlabelLinks = (data: any[]) => {
  const _labelLinks: any[] = [];
  data.forEach((item: any) => {
    item.labels?.forEach((_label: string) => {
      _labelLinks.push({
        name: _label,
        noteRef: item.reference
      })
    }) 
  })
  return _labelLinks;
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case NOTE_ITEMS_FETCH_AND_SET:
      console.log('NOTE_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      const data = [...action.payload];

      return {
        ...state,
        items: sortBy(data, (item) => item.name.toLowerCase()),
        map: buildDataMap(data),
        labelLinks: buildlabelLinks(data)
      };
    case NOTE_ITEMS_UPDATE:
      console.log('NOTE_ITEMS_UPDATE reducer');
      console.log(action);

      const _items: any = [...state.items];
      const index = _items.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (index > -1) {
        _items[index] = action.payload;
      }

      return {
        ...state,
        items: sortBy([..._items], (item) => item.name.toLowerCase()),
        map: buildDataMap(_items),
        labelLinks: buildlabelLinks(_items)
      };
    case NOTE_ITEMS_APPEND:
      console.log('NOTE_ITEMS_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy([...state.items, action.payload], (item) =>
          item.name.toLowerCase()
        ),
        map: buildDataMap([...state.items, action.payload]),
        labelLinks: buildlabelLinks([...state.items, action.payload])
      };
    case NOTE_ITEMS_DELETE:
      console.log('NOTE_ITEMS_DELETE reducer');
      console.log(action);
      const _data = state.items.filter((item: any) => !action.payload.includes(item.reference));
      return {
        ...state,
        items: sortBy(
          _data,
          (item: any) => item.name.toLowerCase()
        ),
        map: buildDataMap(_data),
        labelLinks: buildDataMap(_data)
      };
    default:
      return state;
  }
}
