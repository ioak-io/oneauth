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

import './SystemRoles.scss';

import OakCheckbox from '../../oakui/wc/OakCheckbox';
import OakCheckboxGroup from '../../oakui/wc/OakCheckboxGroup';
import { newId } from '../../events/MessageService';

interface Props {
  clientId: string;
  userId: string;
  roles: any[];
  onInput: any;
}

const SystemRoles = (props: Props) => {
  const onInput = (detail: any) => {
    const _roles = props.roles.filter((item) => item !== detail.name);
    if (detail.value) {
      _roles.push(detail.name);
    }
    props.onInput(_roles);
  };

  // const save = () => {
  //   const _originalRoleNames: string[] = [];
  //   roles.forEach((item) => {
  //     _originalRoleNames.push(item.name);
  //   });
  //   _originalRoleNames.forEach((item) => {
  //     if (!roleNames.includes(item)) {
  //       dispatch(
  //         deleteRoles(authorization, 'client', props.userId, props.clientId, item)
  //       );
  //     }
  //   });

  //   roleNames.forEach((item) => {
  //     if (!_originalRoleNames.includes(item)) {
  //       dispatch(
  //         updateRoles(authorization, {
  //           type: 'client',
  //           userId: props.userId,
  //           domainId: props.clientId,
  //           name: item,
  //         })
  //       );
  //     }
  //   });
  // };

  const formId = newId();

  return (
    <div className="client-permission-system">
      <div className="client-permission-system__title">System roles</div>
      <div className="client-permission-system__content">
        <OakCheckboxGroup
          checkboxGroupName={formId}
          name="role"
          onInput={onInput}
        >
          <OakCheckbox
            name="MEMBER"
            value={props.roles.includes('MEMBER')}
            checkboxGroupName={formId}
          >
            Member
          </OakCheckbox>
          <OakCheckbox
            name="ADMIN"
            value={props.roles.includes('ADMIN')}
            checkboxGroupName={formId}
          >
            Administrator
          </OakCheckbox>
        </OakCheckboxGroup>
      </div>
    </div>
  );
};

export default SystemRoles;
