import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditRealm from './EditRealm';
import AccessControl from '../../AccessControl';

const RealmDetail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const realm = useSelector((state: any) =>
    state.realm.realms?.find((item: any) => item._id === id)
  );

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="realm-detail">
      <OakTab
        tabs={['Detail', 'System roles', 'Users', 'User groups']}
        handleChange={handleChangeTab}
        variant="pills"
        color="info"
        nobaseline
        fill
        rounded
      >
        {realm && (
          <div className="realm-detail__container">
            {activeTab === 0 && <EditRealm realm={realm} />}
            {activeTab === 1 && (
              <AccessControl domainId={realm._id} domainType="realm" />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default RealmDetail;
