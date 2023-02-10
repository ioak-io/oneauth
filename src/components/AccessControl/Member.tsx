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

import './Member.scss';

import { newId } from '../../events/MessageService';
import { updateRoles, deleteRoles } from '../../store/actions/OaRoleActions';
import { Button, ThemeType, Checkbox, IconButton, Radio } from 'basicui';

interface Props {
  domainId: string;
  domainType: string;
  userId: string;
  roles: any[];
  rolesMaster: string[];
}

const Member = (props: Props) => {
  const { id, userId }: any = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [confirmPromptOpen, setConfirmPromptOpen] = useState(false);
  const user = useSelector((state: any) =>
    state.oaUsers?.data?.find((item: any) => item._id === props.userId)
  );

  useEffect(() => {
    const _roleNames: string[] = [];
    props.roles.forEach((item) => {
      _roleNames.push(item.name);
    });
    setRoleNames(_roleNames);
  }, [props.roles]);

  const onInput = (event: any) => {
    const _roleNames = roleNames.filter((item) => item !== event.currentTarget.name);
    if (event.currentTarget.value) {
      if (event.currentTarget.value) {
        _roleNames.push(event.currentTarget.name);
      }
    }
    setRoleNames(_roleNames);
  };

  const save = () => {
    const _originalRoleNames: string[] = [];
    props.roles.forEach((item) => {
      _originalRoleNames.push(item.name);
    });
    _originalRoleNames.forEach((item) => {
      if (!roleNames.includes(item)) {
        dispatch(
          deleteRoles(
            authorization,
            props.domainType,
            props.userId,
            props.domainId,
            item
          )
        );
      }
    });

    roleNames.forEach((item) => {
      if (!_originalRoleNames.includes(item)) {
        dispatch(
          updateRoles(authorization, {
            type: props.domainType,
            userId: props.userId,
            domainId: props.domainId,
            name: item,
          })
        );
      }
    });

    setShowEdit(false);
  };

  const formId = newId();

  return (
    <>
      {showEdit && (
        <div className="member-edit">
          <div className="member-view__left">
            {props.rolesMaster.map((item) => (
              <Checkbox
                id={item}
                name={item}
                value={roleNames.includes(item)}
                checked={roleNames.includes(item)}
                onInput={onInput}
              >
                {item}
              </Checkbox>
            ))}
          </div>
          <div className="member-view__right">
            <Button onClick={save} theme={ThemeType.primary} shape="icon">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <IconButton
              onClick={() => setShowEdit(false)}
              theme={ThemeType.default}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </div>
        </div>
      )}
      {!showEdit && (
        <div className="member-view">
          <div onClick={() => setShowEdit(true)}>
            <div className="member-view__left">
              <div className="member-view__left__name">{`${user.given_name} ${user.family_name}`}</div>
              <div className="member-view__left__description">
                {props.roles?.map((item) => (
                  <div key={item._id}>{item.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="member-view__right">
            <IconButton
              onClick={() => { }}
              theme={ThemeType.danger}

            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Member;
