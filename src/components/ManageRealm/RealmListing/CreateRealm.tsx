import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../oakui/wc/Input';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './CreateRealm.scss';
import RealmItem from './RealmItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import Button from '../../../oakui/wc/Button';
import { createRealm } from '../../../store/actions/RealmActions';

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
          gutterBottom
        />
        <Input
          name="description"
          value={state.description}
          onInput={onInput}
          type="textarea"
          placeholder="Description"
          gutterBottom
        />
      </div>
      <div className="create-realm__toolbar">
        <Button  onClick={save}>
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
