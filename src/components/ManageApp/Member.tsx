import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoles } from '../../actions/OaRoleActions';
import './member.scss';
import { deleteAppSpace } from '../../actions/AppSpaceAction';

interface Props {
  member: any;
  domainId: string;
  domainType?: string;
  owner: string;
}

const Member = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const [confirmPromptOpen, setConfirmPromptOpen] = useState(false);

  const remove = () => {
    if (
      props.member.email === props.owner ||
      props.member._id === props.owner
    ) {
      return;
    }
    if (props.domainType) {
      dispatch(
        deleteRoles(
          authorization,
          props.domainType,
          props.member._id,
          props.domainId
        )
      );
    } else {
      dispatch(
        deleteAppSpace(authorization, props.member.spaceId, props.domainId)
      );
    }
  };

  return (
    <div className="member" id={props.member._id}>
      {props.domainType && (
        <>
          <div className="title typography-6">{props.member.email}</div>
          <div className="typography-6">{`${props.member.lastName}, ${props.member.firstName}`}</div>
        </>
      )}
      {!props.domainType && (
        <>
          <div className="title typography-6">{props.member.spaceId}</div>
          <div className="typography-6">{props.member.name}</div>
        </>
      )}
      <div className="action">
        {!confirmPromptOpen && (
          <div
            className="action-item delete"
            onClick={() => setConfirmPromptOpen(!confirmPromptOpen)}
          >
            X
          </div>
        )}
        {confirmPromptOpen && (
          <>
            <div
              className="action-item cancel"
              onClick={() => setConfirmPromptOpen(!confirmPromptOpen)}
            >
              Cancel
            </div>
            <div className="action-item confirm" onClick={remove}>
              Confirm
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Member;
