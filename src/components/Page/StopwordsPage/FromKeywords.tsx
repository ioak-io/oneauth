/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './FromKeywords.scss';
import StopwordModel from '../../../model/StopwordModel';
import { Button, ButtonVariantType, IconButton, Input, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronUp, faMinus, faPenAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStopword, getKeywords, toggleStopword } from './service';
import KeywordItem from './KeywordItem';
import { isEmptyOrSpaces } from '../../../components/Utils';

interface Props {
  space: string;
  stopwords: StopwordModel[];
  onChange: any;
  onGoBack: any;
}

const FromKeywords = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [keywordsOriginal, setKeywordsOriginal] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordsView, setKeywordsView] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (authorization.isAuth) {
      getKeywords(props.space, authorization).then((response: any) => {
        setKeywordsOriginal(response);
      });
    }
  }, [authorization]);

  useEffect(() => {
    const stopwordTextList: string[] = [];
    props.stopwords.forEach((item => {
      stopwordTextList.push(item.text);
    }));
    setKeywords(keywordsOriginal.filter(item => !stopwordTextList.includes(item)));
  }, [props.stopwords, keywordsOriginal]);

  useEffect(() => {
    setKeywordsView(keywords.filter(item => item.toLowerCase().includes(searchText.toLowerCase())));
  }, [keywords, searchText]);


  const onSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  }

  return (
    <>
      <h5>Add stopwords from keywords</h5>
      <div className='from-keywords'>
        <div className='from-keywords__header'>
          <div className='from-keywords__header__left'>
            <Input autoFocus name="searchText" placeholder="Type to search" value={searchText} onInput={onSearchTextChange} />
          </div>
          <div className='from-keywords__header__right'>
            <Button theme={ThemeType.default} onClick={props.onGoBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Back
            </Button>
          </div>
        </div>
        <div className='from-keywords__content'>
          {<div className="from-keywords__content__info">{keywords.length} total</div>}
          {!isEmptyOrSpaces(searchText) && <div className="from-keywords__content__info">{keywordsView.length} matches</div>}
          {keywordsView.map((keyword) =>
            <KeywordItem keyword={keyword} key={keyword} space={props.space} onChange={props.onChange} />
          )}
        </div>
      </div>
    </>
  );
};

export default FromKeywords;
