import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faUnlink,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import OakButton from '../../../oakui/wc/OakButton';
import './style.scss';
import {
  deleteGridcontrolByRealm,
  approveGridcontrolByRealm,
} from './RealmService';

interface Props {
  data: any[];
  realm: number;
  realmMap: any;
  clientMap: any;
  handleClose: any;
  handleUpdate: any;
}

const RealmGrid = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const unmapClient = (clientId: string) => {
    deleteGridcontrolByRealm(props.realm, clientId).then(() => {
      props.handleUpdate();
    });
  };

  const approveClient = (clientId: string) => {
    approveGridcontrolByRealm(props.realm, clientId).then(() => {
      props.handleUpdate();
    });
  };

  return (
    <div>
      <div className="control-grid__action">
        <OakButton handleClick={props.handleClose}>Map Client</OakButton>
      </div>

      <table className={tableCompose({ color: 'container' })}>
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
                    <OakButton
                      handleClick={() => {}}
                      size="xsmall"
                      theme="primary"
                      variant="block"
                      semitransparent
                    >
                      <FontAwesomeIcon icon={faUserFriends} />
                    </OakButton>
                  )}
                  {!item.approved_by_realm && (
                    <>
                      <OakButton
                        handleClick={() => approveClient(item.client_id)}
                        size="xsmall"
                        theme="success"
                        variant="block"
                        semitransparent
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </OakButton>
                      <OakButton
                        handleClick={() => unmapClient(item.client_id)}
                        size="xsmall"
                        theme="danger"
                        variant="block"
                        semitransparent
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </OakButton>
                    </>
                  )}
                  {item.approved_by_realm && (
                    <OakButton
                      handleClick={() => unmapClient(item.client_id)}
                      size="xsmall"
                      theme="default"
                      variant="block"
                      semitransparent
                    >
                      <FontAwesomeIcon icon={faUnlink} />
                    </OakButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RealmGrid;
