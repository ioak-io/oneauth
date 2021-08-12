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
import './EditClient.scss';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakForm from '../../../oakui/wc/OakForm';
import OakSection from '../../../oakui/wc/OakSection';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakSpacing from '../../../oakui/wc/OakSpacing';
import { updateClient } from '../../../actions/ClientActions';

interface Props {
  client: any;
}

const EditClient = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);
  const [clientData, setClientData] = useState({
    _id: '',
    name: '',
    clientId: '',
    clientrealmId: '',
    description: '',
    redirect: '',
    jwtpassword: '',
    protected: false,
  });

  useEffect(() => {
    setClientData(props.client);
  }, [props.client]);

  // useEffect(() => {
  //   const expiry = convertor(props.client.sessionExpiry);
  //   setView({
  //     ...view,
  //     day: `${expiry.day}`,
  //     hour: `${expiry.hour}`,
  //     minutes: `${expiry.minutes}`,
  //     name: props.client.name,
  //   });
  // }, [props.client.sessionExpiry]);

  // const convertor = data => {
  //   const day = Math.floor(data / (60 * 24));
  //   const hour = Math.floor((data - day * 1440) / 60);
  //   const minutes = data % 60;
  //   return { day, hour, minutes };
  // };

  const handleInput = (detail: any) => {
    setClientData({
      ...clientData,
      [detail.name]: detail.value,
    });
  };

  const editClient = () => {
    dispatch(updateClient(clientData));
  };

  const handleReset = () => {};

  return (
    <OakForm
      formGroupName={formId}
      handleSubmit={editClient}
      handleReset={handleReset}
    >
      <div className="edit-client">
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
          <div className="edit-client__overview">
            <OakInput
              formGroupName={formId}
              value={clientData.name}
              name="name"
              label="Client name"
              type="text"
              minLength={5}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              value={clientData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              value={clientData.redirect}
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
              value={clientData.clientId}
              name="clientId"
              label="Client ID (to be used in your client)"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              disabled
              fill
              formGroupName={formId}
              value={clientData.clientrealmId}
              name="clientrealmId"
              label="Client specific realm"
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
          <div className="edit-realm__security">
            <OakInput
              formGroupName={formId}
              value={clientData.jwtpassword}
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

export default EditClient;
