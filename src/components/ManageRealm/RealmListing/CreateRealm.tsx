import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './CreateRealm.scss';
import RealmItem from './RealmItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import OakButton from '../../../oakui/wc/OakButton';
import { createRealm } from '../../../actions/RealmActions';

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

  const handleChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const save = () => {
    dispatch(createRealm(state));
  };

  return (
    <div className="create-realm">
      <div className="create-realm__form">
        <OakInput
          name="name"
          value={state.name}
          handleInput={handleChange}
          placeholder="Realm name"
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
      <div className="create-realm__toolbar">
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

export default CreateRealm;
