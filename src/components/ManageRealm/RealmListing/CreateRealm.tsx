import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CreateRealm.scss';
import { createRealm } from '../../../store/actions/RealmActions';
import { Button, Input, Textarea, ThemeType } from 'basicui';

interface Props {
  handleClose: any;
}

const CreateRealm = (props: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    description: '',
    site: {
      container: true,
      borderRadius: 'large',
      signupVariant: 'bottom',
      layout: 'full',
      background: '',
    },
  });

  const onInput = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const save = () => {
    dispatch(createRealm(state));
  };

  return (
    <div className="create-realm">
      <div className="create-realm__form">
        <Input
          name="name"
          value={state.name}
          onInput={onInput}
          placeholder="Realm name"
        />
        <Textarea
          name="description"
          value={state.description}
          onInput={onInput}
          type="textarea"
          placeholder="Description"
        />
      </div>
      <div className="create-realm__toolbar">
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

export default CreateRealm;
