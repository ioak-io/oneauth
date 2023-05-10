import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Select, Textarea } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import CompanyModel from '../../../model/CompanyModel';
import { saveCompany } from './service';

interface Props {
  history: any;
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

const EditCompanyPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<CompanyModel>({ ...EMPTY_COMPANY });

  const handleChange = (event: any) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = () => {
    saveCompany(state, authorization).then((response: any) => {
      goBack();
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="edit-company-page">
      <Topbar title={searchParams.get('id') ? 'Edit company' : 'New company'}>
        right
      </Topbar>
      <div className="edit-company-page__main main-section content-section page-width">
        <form id={formId} onSubmit={save}>
          <div className="form">
            <div className="form-two-column">
              <Input
                name="name"
                value={state.name}
                onInput={handleChange}
                label="Company name"
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

export default EditCompanyPage;
