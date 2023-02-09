import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import Button from '../../../oakui/wc/Button';
import './style.scss';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import {
  addSystemRoleForRealm,
  deleteSystemRoleForRealm,
  addSystemRoleForClient,
  deleteSystemRoleForClient,
} from './service';

interface Props {
  data: any[];
  realm?: number;
  clientId?: string;
  systemRoleMap: any;
  systemRoleReverseMap: any;
  systemUserMap: any;
  handleClose: any;
  handleUpdate: any;
}

const UserGrid = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [datagrid, setDatagrid] = useState<any[]>([]);

  useEffect(() => {
    if (props.data && props.systemUserMap) {
      const _datagrid: any = {};
      props.data.forEach((item: any) => {
        if (_datagrid[item.user_id]) {
          _datagrid[item.user_id].roleId = [
            ..._datagrid[item.user_id].roleId,
            item.role_id,
          ];
        } else {
          _datagrid[item.user_id] = {
            user: props.systemUserMap[item.user_id],
            roleId: [item.role_id],
          };
        }
      });
      console.log(Object.values(_datagrid));
      setDatagrid(Object.values(_datagrid));
    }
  }, [props.data, props.systemUserMap]);

  const toggleRole = (detail: any, roleName: string) => {
    const addFunction: any = props.realm
      ? addSystemRoleForRealm
      : addSystemRoleForClient;
    const deleteFunction: any = props.realm
      ? deleteSystemRoleForRealm
      : deleteSystemRoleForClient;

    if (detail.value) {
      addFunction(
        props.realm ? props.realm : props.clientId,
        detail.name,
        props.systemRoleReverseMap[roleName]?._id
      ).then((data: any) => {
        props.handleUpdate();
      });
    } else {
      deleteFunction(
        props.realm ? props.realm : props.clientId,
        detail.name,
        props.systemRoleReverseMap[roleName]?._id
      ).then((data: any) => {
        props.handleUpdate();
      });
    }
  };

  return (
    <div>
      <div className="control-grid__action">
        <Button onClick={props.handleClose}>Add user</Button>
      </div>

      <table className={tableCompose({ color: 'container' })}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Administrator</th>
            <th>Member</th>
          </tr>
        </thead>
        <tbody>
          {datagrid?.map((item) => (
            <tr key={item.user?._id}>
              {/* <td>{props.realmMap[item.realm]?.name}</td>
              <td>{props.clientMap[item.client_id]?.name}</td> */}
              <td>{item.user?.given_name}</td>
              <td>{item.user?.family_name}</td>
              <td>{item.user?.email}</td>
              <td>
                <OakCheckbox
                  value={item.roleId?.includes(
                    props.systemRoleReverseMap['system-admin']?._id
                  )}
                  name={item.user?._id}
                  onInput={(detail: any) => {
                    toggleRole(detail, 'system-admin');
                  }}
                />
              </td>
              <td>
                <OakCheckbox
                  value={item.roleId?.includes(
                    props.systemRoleReverseMap['system-user']?._id
                  )}
                  name={item.user?._id}
                  onInput={(detail: any) => {
                    toggleRole(detail, 'system-user');
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserGrid;
