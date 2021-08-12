import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { getGridcontrolByRealm } from './RealmService';
import RealmGrid from './RealmGrid';
import ChooseClient from './ChooseClient';
import { getGridcontrolByClient } from './ClientService';
import ClientGrid from './ClientGrid';
import ChooseRealm from './ChooseRealm';

interface Props {
  realm?: number;
  clientId?: string;
}

const Gridcontrol = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const realms = useSelector((state: any) => state.realm.realms);
  const clients = useSelector((state: any) => state.client.clients);
  const [gridcontrol, setGridcontrol] = useState<any[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [realmMap, setRealmMap] = useState<any>({});
  const [clientMap, setClientMap] = useState<any>({});

  useEffect(() => {
    if (props.clientId && authorization?.isAuth) {
      getGridcontrolByClient(props.clientId).then((data: any) => {
        setGridcontrol(data);
      });
    }
  }, [props.clientId, authorization]);

  useEffect(() => {
    if (props.realm && authorization?.isAuth) {
      getGridcontrolByRealm(props.realm).then((data: any) => {
        setGridcontrol(data);
      });
    }
  }, [props.realm, authorization]);

  useEffect(() => {
    if (realms) {
      const _realmMap: any = {};
      realms.forEach((item: any) => {
        _realmMap[item.realm] = item;
      });
      setRealmMap(_realmMap);
    }
  }, [realms]);

  useEffect(() => {
    if (clients) {
      const _clientMap: any = {};
      clients.forEach((item: any) => {
        _clientMap[item.client_id] = item;
      });
      setClientMap(_clientMap);
    }
  }, [clients]);

  const handleUpdate = () => {
    if (props.realm) {
      handleRealmUpdate(props.realm);
    } else if (props.clientId) {
      handleClientUpdate(props.clientId);
    }
  };

  const handleRealmUpdate = (realm: number) => {
    getGridcontrolByRealm(realm).then((data: any) => {
      setGridcontrol(data);
    });
    setShowAddSection(false);
  };

  const handleClientUpdate = (clientId: string) => {
    getGridcontrolByClient(clientId).then((data: any) => {
      setGridcontrol(data);
    });
    setShowAddSection(false);
  };

  return (
    <div className="control-grid">
      {props.realm && !showAddSection && (
        <RealmGrid
          realm={props.realm}
          data={gridcontrol}
          clientMap={clientMap}
          realmMap={realmMap}
          handleClose={() => setShowAddSection(true)}
          handleUpdate={handleUpdate}
        />
      )}
      {props.realm && showAddSection && (
        <ChooseClient
          data={gridcontrol}
          clients={clients}
          realm={props.realm}
          handleClose={() => setShowAddSection(false)}
          handleUpdate={handleUpdate}
        />
      )}
      {props.clientId && !showAddSection && (
        <ClientGrid
          clientId={props.clientId}
          data={gridcontrol}
          clientMap={clientMap}
          realmMap={realmMap}
          handleClose={() => setShowAddSection(true)}
          handleUpdate={handleUpdate}
        />
      )}
      {props.clientId && showAddSection && (
        <ChooseRealm
          data={gridcontrol}
          realms={realms}
          clientId={props.clientId}
          handleClose={() => setShowAddSection(false)}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Gridcontrol;
