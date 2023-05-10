import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {Button, Input, Textarea} from 'basicui';
import './EditCompany.scss';
import { newId } from '../../../events/MessageService';
import CompanyModel from '../../../model/CompanyModel';
import { saveCompany } from '../EditCompanyPage/service';
import Topbar from '../../../components/Topbar';

interface Props {
  space: string;
  location: any;
}

const EMPTY_COMPANY: CompanyModel = {
  _id: undefined,
  name: '',
  description: '',
  reference: null,
  numberFormat: 'en-US',
  currency: 'USD',
};

const EditCompany = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const [queryParam, setQueryParam] = useState<any>({});
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<CompanyModel>({ ...EMPTY_COMPANY });

  useEffect(() => {
    if (company) {
      setState({ ...company });
    }
  }, [company]);

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    saveCompany(state, authorization).then((response: any) => {
      console.log('company details updated');
    });
  };

  return (
    <div>
      <Topbar title="Company details" />
      <div className="main-section">
        <div className="edit-company page-width content-section">
          {company && (
            <form id={formId} onSubmit={save}>
              <div className="form">
                <div className="form-two-column">
                  <Input
                    name="name"
                    value={state.name}
                    onInput={handleChange}
                    label="Company name"
                    autofocus
                    required
                  />
                  <Input
                    name="reference"
                    value={state.reference || ''}
                    onInput={handleChange}
                    label="Company ID"
                    disabled
                    tooltip={
                      !state.reference ? 'Auto generated after creation' : ''
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
          {!company && (
            <div>Company details cannot be loaded at the moment</div>
          )}
        </div>
      </div>
      <div className='footer'>
        <div/>
        <div className="footer-right"><Button onClick={save}>Save</Button></div>
        </div>
    </div>
  );
};

export default EditCompany;
