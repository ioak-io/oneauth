import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CreateClient.scss';
import { createClient } from '../../../store/actions/ClientActions';
import { Button, Input, ThemeType } from 'basicui';

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

  const onInput = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const save = () => {
    dispatch(createClient(state));
  };

  return (
    <div className="create-client">
      <div className="create-client__form">
        <Input
          name="name"
          value={state.name}
          onInput={onInput}
          placeholder="Client name"
        />
        <Input
          name="description"
          value={state.description}
          onInput={onInput}
          type="textarea"
          placeholder="Description"
        />
      </div>
      <div className="create-client__toolbar">
        <Button onClick={save}>
          Save
        </Button>
        <Button
          theme={ThemeType.default}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateClient;
