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
import Input from '../../../oakui/wc/Input';
import Button from '../../../oakui/wc/Button';
import OakForm from '../../../oakui/wc/OakForm';
import div from '../../../oakui/wc/div';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakSpacing from '../../../oakui/wc/OakSpacing';
import { updateClient } from '../../../store/actions/ClientActions';

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
    client_id: '',
    realm: '',
    description: '',
    redirect: '',
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

  const onInput = (detail: any) => {
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
      
      handleSubmit={editClient}
      handleReset={handleReset}
    >
      <div className="edit-client">
        <div
          fillColor="container"
          rounded
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
        >
          <h6>
            <div className="title-section">
              <Info />
              Overview
            </div>
          </div>
          <div className="title-gutter-bottom" />
          <div className="edit-client__overview">
            <Input
              
              value={clientData.name}
              name="name"
              label="Client name"
              type="text"
              minLength={5}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
            <Input
              
              value={clientData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
            <Input
              
              value={clientData.redirect}
              name="redirect"
              label="Redirect URL"
              type="text"
              minLength={1}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
            <Input
              disabled
              fill
              
              value={clientData.client_id}
              name="client_id"
              label="Client ID (to be used in your client)"
              type="text"
              minLength={1}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
            <Input
              disabled
              fill
              
              value={clientData.realm}
              name="realm"
              label="Client specific realm"
              type="text"
              minLength={1}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
          </div>
        </div>
        <div
          fillColor="container"
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
          rounded
        >
          <h6>
            <div className="title-section">
              <Https />
              Security
            </div>
          </div>
          <div className="edit-realm__security">security form elements</div>
        </div>
        <div className="app-action-bar">
          <div />
          <div>
            <Button
              
              theme={ThemeType.primary}
              
              type="submit"
            >
              <Check />
              Update
            </Button>
            <Button
              
              onClick={handleReset}
              theme={ThemeType.default}
              
            >
              <Close />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </OakForm>
  );
};

export default EditClient;
