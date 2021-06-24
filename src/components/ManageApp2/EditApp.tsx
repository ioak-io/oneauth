import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakInput from '../../oakui/wc/OakInput';
import OakButton from '../../oakui/wc/OakButton';
import { updateApp } from '../../actions/AppActions';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage } from '../../events/MessageService';
import OakCheckbox from '../../oakui/wc/OakCheckbox';
import { Cancel, DoubleArrow } from '@material-ui/icons';
import OakTypography from '../../oakui/wc/OakTypography';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';

interface Props {
  app: any;
  toggleVisibilityHandler: Function;
}

const EditApp = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const [appData, setAppData] = useState({
    name: '',
    redirect: '',
    protected: false,
    jwtPassword: '',
  });

  useEffect(() => {
    setAppData(props.app);
  }, [props.app]);

  const handleChange = (detail: any) => {
    setAppData({
      ...appData,
      [detail.name]: detail.value,
    });
  };

  // const handleChangeCheckbox = (detail) => {
  //   setAppData({
  //     ...appData,
  //     [detail.name]: detail.checked,
  //   });
  // };

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
      <div slot="body">
        <OakInput
          value={appData.name}
          name="name"
          placeholder="Application Name"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakInput
          value={appData.redirect}
          name="redirect"
          placeholder="Redirect URL"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakInput
          value={appData.jwtpassword}
          name="jwtpassword"
          placeholder="JWT Password"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakCheckbox
          name="protected"
          value={appData.protected}
          size="small"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        >
          <OakTypography variant="caption">protected</OakTypography>
        </OakCheckbox>
      </div>
      <div slot="footer">
        <OakFormActionsContainer align="left">
          <OakButton
            handleClick={props.toggleVisibilityHandler}
            theme="default"
            variant="appear"
            align="left"
            type="button"
          >
            <Cancel />
            Cancel
          </OakButton>
          <OakButton
            theme="primary"
            handleClick={editSpace}
            variant="regular"
            align="right"
          >
            <DoubleArrow />
            Update
          </OakButton>
        </OakFormActionsContainer>
      </div>
    </>
  );
};

export default EditApp;
