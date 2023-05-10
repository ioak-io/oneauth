import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import {
  faCheck,
  faChevronRight,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Select, Modal, ModalBody, ModalFooter, ModalHeader } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import {
  getMetadataDefinition,
  saveMetadataDefinition,
  getMetadataDefinitionScope,
  saveMetadataDefinitionScope,
} from './service';
import MetadataDefinitionItems from './MetadataDefinitionItems';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import MainSection from '../../../components/MainSection';
import { updateMetadataDefinitionItems } from '../../../store/actions/MetadataDefinitionActions';

interface Props {
  space: string;
}

const THIS_YEAR = new Date().getFullYear();

const EMPTY_ACCOUNT: MetadataDefinitionModel = {
  name: '',
  group: '',
  type: 'short-text',
  reference: '',
};

const MetadataDefinitionPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<MetadataDefinitionModel[]>([]);

  useEffect(() => {
    setState([...metadataDefinitionList]);
  }, [metadataDefinitionList]);

  const handleChange = (event: any, record: MetadataDefinitionModel, index: number) => {
    const _state = [...state];
    _state[index] = { ..._state[index], [event.currentTarget.name]: event.currentTarget.value };
    setState(_state);
  };

  const addMetadataDefinition = () => {
    setState([...state, { ...EMPTY_ACCOUNT, reference: uuidv4() }]);
  };

  const save = () => {
    saveMetadataDefinition(props.space, state, authorization).then((response: any) => {
      dispatch(updateMetadataDefinitionItems(response));
    });
  };

  const goBack = () => {
    navigate(-1)
  };

  const handleDelete = (record: MetadataDefinitionModel) => {
    setState(state.filter((item) => item.reference !== record.reference));
  };

  return (
    <div className="metadata-definition-page page-animate">
      <Topbar title="Metadata - Custom note attributes" />
      <MainSection>
        <div className="metadata-definition-page__action">
          <Button onClick={addMetadataDefinition}>
            <FontAwesomeIcon icon={faPlus} /> New Attribute
          </Button>
        </div>
        <MetadataDefinitionItems
          data={state}
          formId={formId}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleAddMetadataDefinition={addMetadataDefinition}
        />
        <div className="footer">
          <div />
          <div className="footer-right">
            <Button
              onClick={save}
            >
              <FontAwesomeIcon icon={faCheck} />
              Save
            </Button>
            <Button onClick={goBack}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </div>
      </MainSection>
    </div>
  );
};

export default MetadataDefinitionPage;
