import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemUsers } from '../../UserService';
import ChooseUser from './ChooseUser';
import {
  getSystemRoles,
  getUsersWithSystemRoleForRealm,
  getUsersWithSystemRoleForClient,
} from './service';
import './style.scss';
import UserGrid from './UserGrid';

interface Props {
  realm?: number;
  clientId?: string;
}

const SystemRoleControl = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [systemUserMap, setSystemUserMap] = useState<any[]>([]);
  const [systemRoles, setSystemRoles] = useState<any[]>([]);
  const [usersWithSystemRole, setUsersWithSystemRole] = useState<any[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [systemRoleMap, setSystemRoleMap] = useState<any>({});
  const [systemRoleReverseMap, setSystemRoleReverseMap] = useState<any>({});

  useEffect(() => {
    getSystemUsers().then((data: any) => {
      const _systemUserMap: any = {};
      data?.forEach((item: any) => {
        _systemUserMap[item._id] = item;
      });
      setSystemUserMap(_systemUserMap);
    });
  }, [authorization]);

  useEffect(() => {
    if (props.realm && authorization?.isAuth) {
      getSystemRoles().then((data: any) => {
        setSystemRoles(data);
      });
      fetchUsersWithSystemRoleForRealm();
    }
  }, [props.realm, authorization]);

  useEffect(() => {
    if (props.clientId && authorization?.isAuth) {
      getSystemRoles().then((data: any) => {
        setSystemRoles(data);
      });
      fetchUsersWithSystemRoleForClient();
    }
  }, [props.clientId, authorization]);

  const fetchUsersWithSystemRoleForRealm = () => {
    if (props.realm) {
      getUsersWithSystemRoleForRealm(props.realm).then((data: any) => {
        setUsersWithSystemRole(data);
      });
    }
  };

  const fetchUsersWithSystemRoleForClient = () => {
    if (props.clientId) {
      getUsersWithSystemRoleForClient(props.clientId).then((data: any) => {
        setUsersWithSystemRole(data);
      });
    }
  };

  useEffect(() => {
    if (systemRoles) {
      const _systemRoleMap: any = {};
      const _systemRoleReverseMap: any = {};
      systemRoles.forEach((item: any) => {
        _systemRoleMap[item._id] = item;
        _systemRoleReverseMap[item.name] = item;
      });
      setSystemRoleMap(_systemRoleMap);
      setSystemRoleReverseMap(_systemRoleReverseMap);
    }
  }, [systemRoles]);

  const handleUpdate = () => {
    console.log('*********');
    // handleRealmUpdate(props.realm);
    props.realm
      ? fetchUsersWithSystemRoleForRealm()
      : fetchUsersWithSystemRoleForClient();
    setShowAddSection(false);
  };

  return (
    <div className="control-grid">
      {!showAddSection && (
        <UserGrid
          realm={props.realm}
          clientId={props.clientId}
          data={usersWithSystemRole}
          systemRoleMap={systemRoleMap}
          systemRoleReverseMap={systemRoleReverseMap}
          systemUserMap={systemUserMap}
          handleClose={() => setShowAddSection(true)}
          handleUpdate={handleUpdate}
        />
      )}
      {showAddSection && (
        <ChooseUser
          systemUserMap={systemUserMap}
          systemRoleReverseMap={systemRoleReverseMap}
          realm={props.realm}
          clientId={props.clientId}
          handleClose={() => setShowAddSection(false)}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default SystemRoleControl;
