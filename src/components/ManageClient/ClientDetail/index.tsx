import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditClient from './EditClient';
import AccessControl from '../../AccessControl';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import Gridcontrol from '../../AccessControl/Gridcontrol';
import SystemRoleControl from '../../AccessControl/SystemRoleControl';

const ClientDetail = () => {
  const history = useNavigate();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const client = useSelector((state: any) =>
    state.client.clients?.find((item: any) => item._id === id)
  );
  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="client-detail">
      <OakTab
        tabs={['Detail', 'Realms', 'Roles', 'Administrators']}
        handleChange={handleChangeTab}
        variant="pills"
        color="info"
        nobaseline
        fill
        rounded
      >
        {client && (
          <div className="client-detail__container">
            {activeTab === 0 && <EditClient client={client} />}
            {activeTab === 1 && <Gridcontrol clientId={client.client_id} />}
            {activeTab === 3 && (
              <SystemRoleControl clientId={client.client_id} />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default ClientDetail;
