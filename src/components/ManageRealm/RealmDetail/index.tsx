import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditRealm from './EditRealm';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import Gridcontrol from '../../AccessControl/Gridcontrol';
import SystemRoleControl from '../../AccessControl/SystemRoleControl';

const RealmDetail = () => {
  const history = useNavigate();
  const { realmId }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const realm = useSelector((state: any) =>
    state.realm.realms?.find((item: any) => item.realm === Number(realmId))
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
    <div className="realm-detail">
      <OakTab
        tabs={['Detail', 'Clients', 'User groups', 'Administrators']}
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
            {activeTab === 1 && <Gridcontrol realm={realm.realm} />}
            {/* {activeTab === 2 && <Gridcontrol realm={realm.realm} />} */}
            {activeTab === 3 && <SystemRoleControl realm={realm.realm} />}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default RealmDetail;
