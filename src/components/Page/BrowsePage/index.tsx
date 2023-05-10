import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes, faListUl } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
// import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { searchNote } from './service';
import NoteModel from '../../../model/NoteModel';
import SearchResults from '../../../components/BrowseNotes/SearchResults';
import { isEmptyOrSpaces } from '../../../components/Utils';
import GraphSearchResultsView from '../../../components/GraphSearchResultsView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import SearchInput from '../../../components/BrowseNotes/SearchInput';
import { getSessionValue, getSessionValueAsJson, setSessionValue, setSessionValueAsJson } from '../../../utils/SessionUtils';
import { SearchConfigType } from 'src/components/BrowseNotes/SearchInput/SearchConfig';

interface Props {
  location: any;
  space: string;
}

const BrowsePage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [view, setView] = useState('list');

  const [results, setResults] = useState<NoteModel[]>([]);
  const [searchConfig, setSearchConfig] = useState<SearchConfigType>({
    searchPref: {}, text: '', textList: []
  });

  useEffect(() => {
    const _searchConfig = getSessionValueAsJson('oneauth-searchconfig-browse');
    if (authorization.isAuth) {
      handleSearch(_searchConfig);
    }
  }, [authorization]);

  const handleChange = (deltaSearchConfig: any) => {
    setSearchConfig({ ...searchConfig, ...deltaSearchConfig });
  }

  const handleReset = () => {
    handleSearch({
      searchPref: {}, text: '', textList: []
    })
  }

  const handleSearch = (_searchConfig?: SearchConfigType) => {
    let _searchConfigCurrent: SearchConfigType = searchConfig;
    if (_searchConfig) {
      _searchConfigCurrent = _searchConfig;
      setSearchConfig(_searchConfig);
    }
    setSessionValueAsJson('oneauth-searchconfig-browse', _searchConfigCurrent);
    searchNote(props.space, _searchConfigCurrent, authorization).then(
      (response: NoteModel[]) => {
        setResults(response);
      }
    );
  };

  const openGraphMode = () => {
    setView('graph');
  };

  const openListMode = () => {
    setView('list');
  };

  return (
    <div className="page-animate">
      <Topbar title="Browse" space={props.space}>
        <div className="topbar-actions">
          <button
            className={`button ${view === 'graph' ? 'active' : ''}`}
            onClick={openGraphMode}
          >
            <FontAwesomeIcon icon={faCircleNodes} />
            <span className="menu-highlight-line" />
          </button>
          <button
            className={`button ${view === 'list' ? 'active' : ''}`}
            onClick={openListMode}
          >
            <FontAwesomeIcon icon={faListUl} />
            <span className="menu-highlight-line" />
          </button>
        </div>
      </Topbar>
      <MainSection>
        <SearchInput space={props.space} onSearch={handleSearch} onReset={handleReset} searchConfig={searchConfig} onChange={handleChange} />
        {view === 'list' && (
          <SearchResults
            space={props.space}
            noteList={results}
            handleChange={() => { }}
          />
        )}
        {view === 'graph' && (
          <GraphSearchResultsView space={props.space} noteNodes={results} />
        )}
      </MainSection>
    </div>
  );
};

export default BrowsePage;
