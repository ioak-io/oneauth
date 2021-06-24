import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditClient from './EditClient';
import AccessControl from '../../AccessControl';

const ClientDetail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const client = useSelector((state: any) =>
    state.client.clients?.find((item: any) => item._id === id)
  );

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="client-detail">
      <OakTab
        tabs={['Detail', 'System roles', 'Roles']}
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
            {activeTab === 1 && (
              <AccessControl domainId={client._id} domainType="client" />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default ClientDetail;
