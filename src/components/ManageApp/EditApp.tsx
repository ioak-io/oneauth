import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import { updateApp } from '../../actions/AppActions';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage } from '../../events/MessageService';
import OakCheckbox from '../../oakui/OakCheckbox';

interface Props {
  app: any;
  toggleVisibilityHandler: Function;
}

const EditApp = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const [appData, setAppData] = useState({
    name: '',
    redirect: '',
    protected: '',
  });

  useEffect(() => {
    setAppData(props.app);
  }, [props.app]);

  const handleChange = event => {
    setAppData({
      ...appData,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmptyText = (text, message) => {
    if (isEmptyOrSpaces(text)) {
      sendMessage('notification', true, {
        type: 'failure',
        message,
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  const editSpace = () => {
    if (
      validateEmptyText(appData.name, 'App name cannot be empty') &&
      validateEmptyText(appData.redirect, 'Redirect url cannot be empty')
    ) {
      dispatch(updateApp(authorization, appData));
    }
  };

  return (
    <>
      <div className="modal-body two-column">
        <div className="typography-5">App Name</div>
        <OakText data={appData} id="name" handleChange={e => handleChange(e)} />
        <div className="typography-5">Redirect url</div>
        <OakText
          data={appData}
          id="redirect"
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">JWT Password</div>
        <OakText
          data={appData}
          id="jwtpassword"
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">Protected</div>
        <OakCheckbox
          data={appData}
          id="protected"
          handleChange={e => handleChange(e)}
        />
      </div>
      <div className="modal-footer">
        <OakButton
          action={props.toggleVisibilityHandler}
          theme="default"
          variant="animate in"
          align="left"
        >
          <i className="material-icons">close</i>Cancel
        </OakButton>
        <OakButton
          theme="primary"
          action={editSpace}
          variant="animate none"
          align="right"
        >
          <i className="material-icons">double_arrow</i>Update
        </OakButton>
      </div>
    </>
  );
};

export default EditApp;
