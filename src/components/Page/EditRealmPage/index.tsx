import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Select, Textarea } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import RealmModel from '../../../model/RealmModel';
import { createRealm, saveRealm } from './service';

interface Props {
  history: any;
  location: any;
}

const EMPTY_COMPANY: RealmModel = {
  name: '',
  description: '',
};

const EditRealmPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const realmList = useSelector((state: any) => state.realm.items);
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<RealmModel>({ ...EMPTY_COMPANY });

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    if (state._id) {
      saveRealm(state, authorization).then((response: any) => {
        goBack();
      });
    } else {
      createRealm(state, authorization).then((response: any) => {
        goBack();
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-realm-page">
      <Topbar title={searchParams.get('id') ? 'Edit realm' : 'New realm'}>
        right
      </Topbar>
      <div className="edit-realm-page__main main-section content-section page-width">
        <form id={formId} onSubmit={save}>
          <div className="form">
            <div className="form-two-column">
              <Input
                name="name"
                value={state.name}
                onInput={handleChange}
                label="Realm name"
              />
              <Input
                name="realm"
                value={state.realm || ''}
                onInput={handleChange}
                label="Realm ID"
                disabled
                tooltip={
                  !state.realm ? 'Auto generated after creation' : ''
                }
              />
            </div>
            <Textarea
              name="description"
              value={state.description}
              onInput={handleChange}
              label="Description"
            />
          </div>
        </form>
      </div>
      <div className="footer">
        <div />
        <div className="footer-right">
          <Button
            type="submit"
            onClick={save}
          >
            <FontAwesomeIcon icon={faCheck} />
            {searchParams.get('id') ? 'Save' : 'Save and go back'}
          </Button>
          <Button onClick={goBack}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditRealmPage;
