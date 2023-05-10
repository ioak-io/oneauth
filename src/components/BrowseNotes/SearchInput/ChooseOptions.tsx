/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ChooseOptions.scss';
import { SearchOptionType } from './SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../../../components/Utils';

interface Props {
  text: string;
  options: SearchOptionType[];
  searchPref: any;
  handleChange: any;
  searchConfig: any;
}

const ChooseOptions = (props: Props) => {
  const existingLabels = useSelector((state: any) => state.label?.items);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition?.items);
  const metadataValueList = useSelector((state: any) => state.metadataValue?.items);
  const [exclusiveSearch, setExclusiveSearch] = useState<string | null>(null);
  const [chosenValues, setChosenValues] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (props.searchPref) {
      const items = Object.keys(props.searchPref);
      const searchPrefChosen: string[] = [];
      items.forEach(item => {
        if (props.searchPref[item]) {
          searchPrefChosen.push(item);
        }
      });

      let _exclusiveSearch = null;
      let _options: string[] = [];
      let _chosenValues: string[] = [];

      if (searchPrefChosen.length === 1) {
        if (searchPrefChosen[0] === 'labels') {
          _exclusiveSearch = 'labels';
          _options = existingLabels;
        } else {
          metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
            if (searchPrefChosen.includes(item._id || '')) {
              _exclusiveSearch = item._id;
              _options = metadataValueList[item._id || ''] || [];
            }
          });
        }
        _chosenValues = props.searchConfig?.textList?.filter((item: string) => _options.includes(item)) || [];
      }
      setExclusiveSearch(_exclusiveSearch);
      setOptions(_options);
      setChosenValues(_chosenValues);
    }
  }, [props.searchPref, metadataDefinitionList, metadataValueList, existingLabels]);

  useEffect(() => {
    // let _chosenValues: string[] = [];
    // if (exclusiveSearch === 'labels') {
    //   _chosenValues = chosenValues.filter(item => existingLabels.includes(item));
    // }
    props.handleChange(chosenValues);
  }, [chosenValues]);

  const onChoose = (event: any, item: string) => {
    event.preventDefault();
    if (chosenValues.includes(item)) {
      setChosenValues(chosenValues.filter((_item: string) => item !== _item));
    } else {
      setChosenValues([...chosenValues, item]);
    }
  }

  return (
    <div className='search-choose-options'>
      {/* <div className='search-choose-options__info'>
        Choose values
      </div> */}
      <div className='search-choose-options__options'>
        {exclusiveSearch &&
          <>
            {!isEmptyOrSpaces(props.text) && <button disabled className={`search-choose-options__options__option note-label`}
              onClick={(event: any) => onChoose(event, props.text)}>
              <FontAwesomeIcon icon={faCheck} />
              {props.text}
            </button>}
            {options.map((item: string) =>
              <button key={item} className={`search-choose-options__options__option note-label`}
                onClick={(event: any) => onChoose(event, item)}>
                {chosenValues.includes(item) && <FontAwesomeIcon icon={faCheck} />}
                {item}
              </button>
            )}
          </>
        }
        {/* {options.map((item: string) =>
          <button className={`search-choose-options__options__option ${chosenValues.includes(item) ? 'search-choose-options__options--active' : ''} note-label`}
            onClick={() => onChoose(item)}>
            {chosenValues.includes(item) && <FontAwesomeIcon icon={faCheck} />}
            {item}
          </button>)} */}
      </div>
    </div>
  );
};

export default ChooseOptions;
