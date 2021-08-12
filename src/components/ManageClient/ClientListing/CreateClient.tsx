import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './CreateClient.scss';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import OakButton from '../../../oakui/wc/OakButton';
import { createClient } from '../../../actions/ClientActions';

interface Props {
  handleClose: any;
}

const CreateClient = (props: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    description: '',
    redirect: '',
  });

  const handleChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const save = () => {
    dispatch(createClient(state));
  };

  return (
    <div className="create-client">
      <div className="create-client__form">
        <OakInput
          name="name"
          value={state.name}
          handleInput={handleChange}
          placeholder="Client name"
          gutterBottom
        />
        <OakInput
          name="description"
          value={state.description}
          handleInput={handleChange}
          type="textarea"
          placeholder="Description"
          gutterBottom
        />
      </div>
      <div className="create-client__toolbar">
        <OakButton variant="regular" handleClick={save}>
          Save
        </OakButton>
        <OakButton
          variant="regular"
          theme="default"
          handleClick={props.handleClose}
        >
          Cancel
        </OakButton>
      </div>
    </div>
  );
};

export default CreateClient;
