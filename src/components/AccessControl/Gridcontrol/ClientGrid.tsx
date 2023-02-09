import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faUnlink,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import {
  deleteGridcontrolByClient,
  approveGridcontrolByClient,
} from './ClientService';
import { Button } from 'basicui';
import ThemeType from 'basicui/components/types/ThemeType';

interface Props {
  data: any[];
  clientId: string;
  realmMap: any;
  clientMap: any;
  handleClose: any;
  handleUpdate: any;
}

const ClientGrid = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const unmapRealm = (realm: number) => {
    deleteGridcontrolByClient(props.clientId, realm).then(() => {
      props.handleUpdate();
    });
  };

  const approveRealm = (realm: number) => {
    approveGridcontrolByClient(props.clientId, realm).then(() => {
      props.handleUpdate();
    });
  };

  return (
    <div>
      <div className="control-grid__action">
        <Button onClick={props.handleClose}>Map Client</Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Realm</th>
            <th>Client</th>
            <th>Status</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item) => (
            <tr key={item._id}>
              <td>{props.realmMap[item.realm]?.name}</td>
              <td>{props.clientMap[item.client_id]?.name}</td>
              <td>
                {item.approved_by_client && item.approved_by_realm
                  ? 'Active'
                  : 'Pending approval'}
              </td>
              <td>
                <div className="context-action">
                  {item.approved_by_client && item.approved_by_realm && (
                    <Button
                      onClick={() => { }}
                      theme={ThemeType.primary}
                    >
                      <FontAwesomeIcon icon={faUserFriends} />
                    </Button>
                  )}
                  {!item.approved_by_client && (
                    <>
                      <Button
                        onClick={() => approveRealm(item.realm)}
                        theme={ThemeType.success}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        onClick={() => unmapRealm(item.realm)}
                        theme={ThemeType.danger}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </>
                  )}
                  {item.approved_by_client && (
                    <Button
                      onClick={() => unmapRealm(item.realm)}
                      theme={ThemeType.default}
                    >
                      <FontAwesomeIcon icon={faUnlink} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

export default ClientGrid;
