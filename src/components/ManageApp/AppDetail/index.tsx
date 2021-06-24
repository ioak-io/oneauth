import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditApp from './EditApp';
import AccessControl from '../../AccessControl';

const AppDetail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const app = useSelector((state: any) =>
    state.app.apps?.find((item: any) => item._id === id)
  );

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="app-detail">
      <OakTab
        tabs={['Detail', 'System roles', 'Roles']}
        handleChange={handleChangeTab}
        variant="pills"
        color="info"
        nobaseline
        fill
        rounded
      >
        {app && (
          <div className="app-detail__container">
            {activeTab === 0 && <EditApp app={app} />}
            {activeTab === 1 && (
              <AccessControl domainId={app._id} domainType="app" />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default AppDetail;
