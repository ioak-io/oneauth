import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCross,
  faPencilAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import './style.scss';

import { newId } from '../../events/MessageService';
import { updateRoles, deleteRoles } from '../../store/actions/OaRoleActions';
import SystemRoles from './SystemRoles';
import {Button} from 'basicui';

interface Props {
  history: any;
  location: any;
}

const ClientPermission = (props: Props) => {
  const { id, userId }: any = useParams();
  const [oaRolesNew, setOaRolesNew] = useState<any[]>([]);
  const [oaRolesNameNew, setOaRolesNameNew] = useState<any[]>([]);
  const oaRoles = useSelector((state: any) => state.oaRoles);
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const user = useSelector((state: any) =>
    state.oaUsers?.data?.find((item: any) => item._id === userId)
  );

  useEffect(() => {
    if (oaRoles?.data?.data) {
      const _roleNames: string[] = [];
      oaRoles?.data?.data
        ?.filter((item: any) => item.userId === userId && item.domainId === id)
        .forEach((item: any) => _roleNames.push(item.name));
      setOaRolesNameNew(_roleNames);
    }
  }, [oaRoles.data.data]);

  // useEffect(() => {
  //   const _roleNames: string[] = [];
  //   props.roles.forEach((item) => {
  //     _roleNames.push(item.name);
  //   });
  //   setRoleNames(_roleNames);
  // }, [props.roles]);

  // const onInput = (detail: any) => {
  //   const _roleNames = roleNames.filter((item) => item !== detail.name);
  //   if (detail.value) {
  //     if (detail.value) {
  //       _roleNames.push(detail.name);
  //     }
  //   }
  //   setRoleNames(_roleNames);
  // };

  // const save = () => {
  //   const _originalRoleNames: string[] = [];
  //   props.roles.forEach((item) => {
  //     _originalRoleNames.push(item.name);
  //   });
  //   _originalRoleNames.forEach((item) => {
  //     if (!roleNames.includes(item)) {
  //       dispatch(
  //         deleteRoles(
  //           authorization,
  //           props.domainType,
  //           props.userId,
  //           props.domainId,
  //           item
  //         )
  //       );
  //     }
  //   });

  //   roleNames.forEach((item) => {
  //     if (!_originalRoleNames.includes(item)) {
  //       dispatch(
  //         updateRoles(authorization, {
  //           type: props.domainType,
  //           userId: props.userId,
  //           domainId: props.domainId,
  //           name: item,
  //         })
  //       );
  //     }
  //   });

  //   setShowEdit(false);
  // };

  const handleSystemRolesChange = (_rolesNameNew: string[]) => {
    setOaRolesNameNew(_rolesNameNew);
  };

  const save = () => {
    const _originalRoleNames: string[] = [];
    oaRoles?.data?.data
      ?.filter((item: any) => item.userId === userId && item.domainId === id)
      .forEach((item: any) => _originalRoleNames.push(item.name));

    _originalRoleNames.forEach((item) => {
      if (!oaRolesNameNew.includes(item)) {
        dispatch(deleteRoles(authorization, 'client', userId, id, item));
      }
    });

    oaRolesNameNew.forEach((item) => {
      if (!_originalRoleNames.includes(item)) {
        dispatch(
          updateRoles(authorization, {
            type: 'client',
            userId,
            domainId: id,
            name: item,
          })
        );
      }
    });
  };

  const formId = newId();

  return (
    <div className="client-permission">
      <div
      >
        <SystemRoles
          clientId={id}
          userId={userId}
          roles={oaRolesNameNew}
          onInput={handleSystemRolesChange}
        />
      </div>
      <div
      >
        <div className="client-permission__section-title">Client roles</div>
      </div>
      <Button onClick={save}>Save</Button>
    </div>
  );
};

export default ClientPermission;
