/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import { ButtonVariantType, IconButton, Input, ThemeType } from 'basicui';
import SearchPref from './SearchPref';
import { SearchOptionType } from './SearchOptionType';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import ChooseOptions from './ChooseOptions';
import { SearchConfigType } from './SearchConfig';

interface Props {
  space: string;
  onSearch?: any;
  onChange?: any;
  onReset?: any;
  searchConfig: SearchConfigType;
}

const SearchInput = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>([]);

  useEffect(() => {
    const _searchByOptions: SearchOptionType[] = [
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'content',
        label: 'Content'
      },
      {
        name: 'labels',
        label: 'Label'
      }
    ];
    const _searchPref: any = _getSearchPrefBase();

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      _searchByOptions.push({
        name: item._id || '',
        label: `${item.group} | ${item.name}`
      })
    })

    setSearchByOptions(_searchByOptions);
    handleSearchPrefChange({ ..._searchPref, ...props.searchConfig.searchPref });
  }, [metadataDefinitionList]);

  const handleTextChange = (event: any) => {
    event.preventDefault();
    props.onChange({ text: event.currentTarget.value });
  }

  const handleTextListChange = (_options: any) => {
    props.onChange({ textList: _options });
  }

  const handleSearchPrefChange = (_searchPref: any) => {
    props.onChange({ searchPref: _searchPref });
  }

  const onSearch = (event: any) => {
    event.preventDefault();
    if (props.onSearch) {
      props.onSearch();
    }
  }

  const _getSearchPrefBase = () => {

    const _searchPref: any = {
      name: false,
      content: true,
      labels: false
    }

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      _searchPref[item._id || ''] = false;
    })

    return _searchPref;
  }

  const onReset = (event: any) => {
    event.preventDefault();
    if (props.onReset) { props.onReset(); }
  }

  return (
    <div className="search-input">
      <SearchPref searchPref={props.searchConfig.searchPref} options={searchByOptions} handleChange={handleSearchPrefChange} />
      <div className="search-input__input">
        <form className="main browse-page-form" onSubmit={onSearch}>
          <Input name="text"
            value={props.searchConfig.text}
            onInput={handleTextChange}
            placeholder="Type to search"
            autoFocus />
          {props.onSearch && <IconButton onClick={onSearch} circle theme={ThemeType.primary} variant={ButtonVariantType.transparent}>
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>}
          {props.onSearch && <IconButton onClick={onReset} circle theme={ThemeType.default} variant={ButtonVariantType.transparent}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>}
        </form>
      </div>
      <ChooseOptions searchConfig={props.searchConfig} text={props.searchConfig.text} searchPref={props.searchConfig.searchPref} options={searchByOptions} handleChange={handleTextListChange} />
    </div>
  );
};

export default SearchInput;
