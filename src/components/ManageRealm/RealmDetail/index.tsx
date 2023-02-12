import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, TabDetail, TabHeader } from 'basicui';
import './style.scss';
import EditRealm from './EditRealm';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import Gridcontrol from '../../AccessControl/Gridcontrol';
import SystemRoleControl from '../../AccessControl/SystemRoleControl';

const RealmDetail = () => {
  const history = useNavigate();
  const { realmId }: any = useParams();
  const [activeTab, setActiveTab] = useState("detail");
  const realm = useSelector((state: any) =>
    state.realm?.realms?.find((item: any) => item.realm === Number(realmId))
  );
  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  const handleChange = (_activeTabId: string) => {
    setActiveTab(_activeTabId);
  }


  return (
    <div className="realm-detail">
      {realm &&
        <Tabs activeTabId={activeTab} onChange={handleChange}>
          <Tab id='detail'>
            <TabHeader>Detail</TabHeader>
            <TabDetail>
              <EditRealm realm={realm} />
            </TabDetail>
          </Tab>
          <Tab id='clients'>
            <TabHeader>Clients</TabHeader>
            <TabDetail>
              <Gridcontrol realm={realm.realm} />
            </TabDetail>
          </Tab>
          <Tab id='user-groups'>
            <TabHeader>User groups</TabHeader>
            <TabDetail>
              User groups
            </TabDetail>
          </Tab>
          <Tab id='administrators'>
            <TabHeader>Administrators</TabHeader>
            <TabDetail>
              <SystemRoleControl realm={realm.realm} />
            </TabDetail>
          </Tab>
        </Tabs>}
    </div>
  );
};

export default RealmDetail;
