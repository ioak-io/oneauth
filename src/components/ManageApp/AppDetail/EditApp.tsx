import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Cancel,
  Check,
  Close,
  Details,
  DoubleArrow,
  Https,
  Info,
} from '@material-ui/icons';
import './EditApp.scss';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakForm from '../../../oakui/wc/OakForm';
import OakSection from '../../../oakui/wc/OakSection';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakSpacing from '../../../oakui/wc/OakSpacing';
import { updateApp } from '../../../actions/AppActions';

interface Props {
  app: any;
}

const EditApp = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);
  const [appData, setAppData] = useState({
    _id: '',
    name: '',
    appId: '',
    appspaceId: '',
    description: '',
    redirect: '',
    jwtpassword: '',
    protected: false,
  });

  useEffect(() => {
    setAppData(props.app);
  }, [props.app]);

  // useEffect(() => {
  //   const expiry = convertor(props.app.sessionExpiry);
  //   setView({
  //     ...view,
  //     day: `${expiry.day}`,
  //     hour: `${expiry.hour}`,
  //     minutes: `${expiry.minutes}`,
  //     name: props.app.name,
  //   });
  // }, [props.app.sessionExpiry]);

  // const convertor = data => {
  //   const day = Math.floor(data / (60 * 24));
  //   const hour = Math.floor((data - day * 1440) / 60);
  //   const minutes = data % 60;
  //   return { day, hour, minutes };
  // };

  const handleInput = (detail: any) => {
    setAppData({
      ...appData,
      [detail.name]: detail.value,
    });
  };

  const editApp = () => {
    dispatch(updateApp(appData));
  };

  const handleReset = () => {};

  return (
    <OakForm
      formGroupName={formId}
      handleSubmit={editApp}
      handleReset={handleReset}
    >
      <div className="edit-app">
        <OakSection
          fillColor="container"
          rounded
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Info />
              Overview
            </div>
          </OakTypography>
          <div className="title-gutter-bottom" />
          <div className="edit-app__overview">
            <OakInput
              formGroupName={formId}
              value={appData.name}
              name="name"
              label="App name"
              type="text"
              minLength={5}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              value={appData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              value={appData.redirect}
              name="redirect"
              label="Redirect URL"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              disabled
              fill
              formGroupName={formId}
              value={appData.appId}
              name="appId"
              label="Application ID (to be used in your app)"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              disabled
              fill
              formGroupName={formId}
              value={appData.appspaceId}
              name="appspaceId"
              label="Application specific space"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
          </div>
        </OakSection>
        <OakSection
          fillColor="container"
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
          rounded
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Https />
              Security
            </div>
          </OakTypography>
          <div className="edit-space__security">
            <OakInput
              formGroupName={formId}
              value={appData.jwtpassword}
              name="jwtpassword"
              label="JWT password"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
          </div>
        </OakSection>
        <div className="app-action-bar">
          <div />
          <div>
            <OakButton
              formGroupName={formId}
              theme="primary"
              variant="regular"
              type="submit"
            >
              <Check />
              Update
            </OakButton>
            <OakButton
              formGroupName={formId}
              handleClick={handleReset}
              theme="default"
              variant="regular"
            >
              <Close />
              Reset
            </OakButton>
          </div>
        </div>
      </div>
    </OakForm>
  );
};

export default EditApp;
