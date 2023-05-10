import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNodes, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
import NoteModel from '../../../model/NoteModel';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import ColorfilterModel from 'src/model/ColorfilterModel';
import { saveColorfilter } from '../ColorfilterPage/service';
import SearchInput from '../../../components/BrowseNotes/SearchInput';
import { getSessionValueAsJson } from '../../../utils/SessionUtils';
import { SearchConfigType } from 'src/components/BrowseNotes/SearchInput/SearchConfig';
import { searchNote } from '../BrowsePage/service';
import MockSearchResults from './MockSearchResults';
import { updateColorfilterItems } from '../../../store/actions/ColorfilterActions';

interface Props {
  location: any;
  space: string;
}

const EditColorFilterPage = (props: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const colorfilterList = useSelector((state: any) => state.colorfilter.items);
  const [mockResults, setMockResults] = useState<NoteModel[]>([]);
  const [showResults, setShowResults] = useState(false);


  const [state, setState] = useState<any>({
    name: '',
    searchPref: {},
    text: '',
    textList: []
  });

  useEffect(() => {
    const _state = colorfilterList.find((item: ColorfilterModel) => item._id === params.id);
    if (_state) {
      setState({ ..._state });
    }
  }, [colorfilterList]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = (event: any) => {
    event.preventDefault();
    saveColorfilter(props.space, state, authorization).then((response) => {
      // dispatch(appendNoteItem(response.note));
      // navigate(`/${props.space}/note/${response.note.reference}`);
      dispatch(updateColorfilterItems(response));
    })
  }

  const handleSearchInputChange = (_data: any) => {
    setState({ ...state, ..._data });
  }

  const handleReset = () => {
    setState({ ...state, text: '', textList: [], searchPref: {} });
    handleSearch({
      searchPref: {}, text: '', textList: []
    })
  }

  const handleSearch = (_searchConfig?: SearchConfigType) => {
    let _searchConfigCurrent: SearchConfigType = state;
    if (_searchConfig) {
      _searchConfigCurrent = _searchConfig;
    }
    searchNote(props.space, _searchConfigCurrent, authorization).then(
      (response: NoteModel[]) => {
        setShowResults(true);
        setMockResults(response);
      }
    );
  };

  return (
    <div className="edit-colorfilter-page page-animate">
      <Topbar title="Edit color filter" space={props.space} />
      <MainSection>
        <div className='edit-colorfilter-page-form'>
          <div className='edit-colorfilter-page-form__header'>
            <Input name="name" value={state.name} onInput={handleChange} label='Filter name' />
            <Input type="color" name="color" value={state.color} onInput={handleChange} label='Color' />
          </div>
          <SearchInput space={props.space} searchConfig={state}
            onChange={handleSearchInputChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
          {showResults && <MockSearchResults mockResults={mockResults} />}
        </div>
        <div className="footer">
          <div />
          <div className="footer-right">
            <Button onClick={save}>
              <FontAwesomeIcon icon={faPlus} /> Save
            </Button>
          </div>
        </div>
      </MainSection>
    </div>
  );
};

export default EditColorFilterPage;
