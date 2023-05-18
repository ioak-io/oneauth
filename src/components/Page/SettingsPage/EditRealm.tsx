import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Input, Textarea } from 'basicui';
import './EditRealm.scss';
import { newId } from '../../../events/MessageService';
import RealmModel from '../../../model/RealmModel';
import { saveRealm } from '../EditRealmPage/service';
import Topbar from '../../../components/Topbar';

interface Props {
  space: string;
  location: any;
}

const EMPTY_REALM: RealmModel = {
  name: '',
  description: ''
};

const EditRealm = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const realm = useSelector((state: any) =>
    state.realm.items.find(
      (item: any) => item.realm === parseInt(props.space, 10)
    )
  );
  const [queryParam, setQueryParam] = useState<any>({});
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<RealmModel>({ ...EMPTY_REALM });

  useEffect(() => {
    if (realm) {
      setState({ ...realm });
    }
  }, [realm]);

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    saveRealm(state, authorization).then((response: any) => {
      console.log('realm details updated');
    });
  };

  return (
    <div>
      <Topbar title="Realm details" />
      <div className="main-section">
        <div className="edit-realm page-width content-section">
          {realm && (
            <form id={formId} onSubmit={save}>
              <div className="form">
                <div className="form-two-column">
                  <Input
                    name="name"
                    value={state.name}
                    onInput={handleChange}
                    label="Realm name"
                    autofocus
                    required
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
                  required
                />
              </div>
            </form>
          )}
          {!realm && (
            <div>Realm details cannot be loaded at the moment</div>
          )}
        </div>
      </div>
      <div className='footer'>
        <div />
        <div className="footer-right"><Button onClick={save}>Save</Button></div>
      </div>
    </div>
  );
};

export default EditRealm;
