import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import {
  faCheck,
  faChevronRight,
  faPlus,
  faSkullCrossbones,
  faTimes,
  faTrash,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Select, Modal, ModalBody, ModalFooter, ModalHeader, ThemeType, IconButton, ButtonVariantType } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import {
  getStopwords,
  resetStopwords,
  toggleStopword,
} from './service';
import StopwordsModel from '../../../model/StopwordModel';
import MainSection from '../../../components/MainSection';
import Stopword from './Stopword';
import { isEmptyOrSpaces } from '../../../components/Utils';
import FromKeywords from './FromKeywords';

interface Props {
  space: string;
}

const StopwordsPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newStopword, setNewStopword] = useState('');
  const [data, setData] = useState<StopwordsModel[]>([]);
  const [view, setView] = useState<StopwordsModel[]>([]);
  const [viewDisabledCount, setViewDisabledCount] = useState(0);
  const [dataDisabledCount, setDataDisabledCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [fromKeyword, setFromKeyword] = useState(false);
  const [restoreFactoryPrompt, setRestoreFactoryPrompt] = useState(false);

  useEffect(() => {
    if (authorization.isAuth) {
      getStopwords(props.space, authorization).then((response: any) => {
        setData(response);
      });
    }
  }, [authorization]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText) || searchText.length === 0) {
      setView(data.slice(0, 1000));
    } else {
      setView(
        data.filter(item => item.text.search(new RegExp(searchText, "i")) !== -1)
      )
    }
  }, [data, searchText]);

  useEffect(() => {
    setViewDisabledCount(view.filter(item => !item.enabled).length);
  }, [view]);

  useEffect(() => {
    setDataDisabledCount(data.filter(item => !item.enabled).length);
  }, [data]);

  const onNewStopwordChange = (event: any) => {
    setNewStopword(event.currentTarget.value);
  }

  const onSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  }

  const save = () => {
    toggleStopword(props.space, { text: newStopword }, authorization).then((response: any) => {
      setNewStopword('');
      setData(response);
    });
  };

  const onResetStopwords = () => {
    resetStopwords(props.space, authorization).then((response: any) => {
      setData(response);
      setRestoreFactoryPrompt(false);
    })
  }

  const onChange = (_data: StopwordsModel[]) => {
    setData(_data);
  }

  return (
    <>
      <div className="stopwords-page page-animate">
        <Topbar title="Stopwords">
          <Button theme={ThemeType.danger} variant={ButtonVariantType.fill} onClick={() => setRestoreFactoryPrompt(true)}>
            <FontAwesomeIcon icon={faSkullCrossbones} />
            Restore factory defaults
          </Button>
        </Topbar>
        {!fromKeyword && <MainSection>
          <h5>Stopwords</h5>
          <div className="stopwords-page__action">
            <div>
              <Input autoFocus name="searchText" placeholder="Type to search" value={searchText} onInput={onSearchTextChange} />
            </div>
            <div className="stopwords-page__action__right">
              {!isPromptOpen && <Button onClick={() => setIsPromptOpen(true)}>
                <FontAwesomeIcon icon={faPlus} /> Stopword
              </Button>}
              {!isPromptOpen && <Button onClick={() => setFromKeyword(true)}>
                <FontAwesomeIcon icon={faPlus} /> From Keyword
              </Button>}
              {isPromptOpen && <Input autoFocus name="name" value={newStopword} onInput={onNewStopwordChange} />}
              {isPromptOpen && <Button onClick={save} theme={ThemeType.primary}>
                <FontAwesomeIcon icon={faCheck} /> Create
              </Button>}{isPromptOpen && <Button onClick={() => setIsPromptOpen(false)}>
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </Button>}
            </div>
          </div>
          <div className="stopwords-page__content">
            {<div className="stopwords-page__content__info">{data.length} total ({dataDisabledCount} disabled) </div>}
            {(!isEmptyOrSpaces(searchText)) && <div className="stopwords-page__content__info">{view.length} matches ({viewDisabledCount} disabled) </div>}
            {isEmptyOrSpaces(searchText) && view.length !== data.length && <div className="stopwords-page__content__info">Showing first 1000 stopwords.</div>}
            {view.map((record: any, index: number) => (
              <Stopword space={props.space} data={record} key={record._id} onChange={onChange} />
            ))}
          </div>
        </MainSection>}
        {fromKeyword &&
          <MainSection>
            <FromKeywords stopwords={data} space={props.space} onChange={onChange} onGoBack={() => setFromKeyword(false)} />
          </MainSection>}
      </div>

      <Modal isOpen={restoreFactoryPrompt} onClose={() => setRestoreFactoryPrompt(false)}>
        <ModalBody>
          This will delete all your stopword preferences and restore to the original state. Are you sure to execute this action?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onResetStopwords} theme={ThemeType.danger}>
            Yes, Proceed
          </Button>
          <Button onClick={() => setRestoreFactoryPrompt(false)} theme={ThemeType.default}>
            No, Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default StopwordsPage;
