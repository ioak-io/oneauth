import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, TabDetail, TabHeader } from 'basicui';
import './style.scss';
import EditClient from './EditClient';
import AccessControl from '../../AccessControl';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import Gridcontrol from '../../AccessControl/Gridcontrol';
import SystemRoleControl from '../../AccessControl/SystemRoleControl';

const ClientDetail = () => {
  const history = useNavigate();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState("0");
  const client = useSelector((state: any) =>
    state.client.clients?.find((item: any) => item._id === id)
  );
  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  const onInputTab = (_activeTabId: string) => {
    setActiveTab(_activeTabId);
  };

  return (
    <div className="client-detail">
      <Tabs activeTabId={activeTab} onChange={onInputTab}>
        <Tab id='0'>
          <TabHeader>Detail</TabHeader>
          <TabDetail>
            <EditClient client={client} />
          </TabDetail>
        </Tab>
        <Tab id='1'>
          <TabHeader>Realms</TabHeader>
          <TabDetail>
            <Gridcontrol clientId={client.client_id} />
          </TabDetail>
        </Tab>
        <Tab id='2'>
          <TabHeader>Roles</TabHeader>
          <TabDetail>
            Roles
          </TabDetail>
        </Tab>
        <Tab id='3'>
          <TabHeader>Administrators</TabHeader>
          <TabDetail>
            <SystemRoleControl clientId={client.client_id} />
          </TabDetail>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
