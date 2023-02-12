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
import { newId } from '../../../events/MessageService';
import { updateClient } from '../../../store/actions/ClientActions';
import { Button, Input, ThemeType } from 'basicui';

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

  const handleReset = () => { };

  return (
    <form onSubmit={editClient}
      onReset={handleReset}
    >
      <div className="edit-client">
        <div>
          <h6>
            <div className="title-section">
              <Info />
              Overview
            </div>
          </h6>
          <div className="title-gutter-bottom" />
          <div className="edit-client__overview">
            <Input
              value={clientData.name}
              name="name"
              label="Client name"
              type="text"
              onInput={onInput}
            />
            <Input

              value={clientData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              onInput={onInput}
              
            />
            <Input

              value={clientData.redirect}
              name="redirect"
              label="Redirect URL"
              type="text"
              minLength={1}
              onInput={onInput}
              
            />
            <Input
              disabled
              fill

              value={clientData.client_id}
              name="client_id"
              label="Client ID (to be used in your client)"
              type="text"
              minLength={1}
              onInput={onInput}
              
            />
            <Input
              disabled
              fill

              value={clientData.realm}
              name="realm"
              label="Client specific realm"
              type="text"
              minLength={1}
              onInput={onInput}
              
            />
          </div>
        </div>
        <div>
          <h6>
            <div className="title-section">
              <Https />
              Security
            </div>
          </h6>
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
    </form>
  );
};

export default EditClient;
