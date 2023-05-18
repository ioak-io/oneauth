/* eslint-disable no-prototype-builtins */

import { isEmptyAttributes } from '../../components/Utils';

/* eslint-disable import/prefer-default-export */
export const mergeItems = (base: any[], amend: any[]) => {
  const _items: any[] = [...base];
  const _itemsMap: any = {};
  _items.forEach((item: any, index: number) => {
    _itemsMap[item._id] = index;
  });
  amend.forEach((item: any) => {
    if (_itemsMap.hasOwnProperty(item._id)) {
      _items[_itemsMap[item._id]] = item;
    }
  });
  amend.forEach((item: any) => {
    if (!_itemsMap.hasOwnProperty(item._id)) {
      _items.unshift(item);
    }
  });
  return _items;
};

export const mergeItem = (base: any[], amend: any) => {
  if (isEmptyAttributes(amend)) {
    return base;
  }
  const _items = [...base];
  const index = _items.findIndex((item: any) => item._id === amend._id);
  if (index >= 0) {
    _items[index] = amend;
  } else {
    _items.push(amend);
  }
  return _items;
};
