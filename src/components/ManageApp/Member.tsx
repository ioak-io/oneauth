import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoles } from '../../actions/OaRoleActions';
import './member.scss';

interface Props {
  member: any;
  domainId: string;
  domainType: string;
}

const Member = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const [confirmPromptOpen, setConfirmPromptOpen] = useState(false);

  const remove = () => {
    dispatch(
      deleteRoles(
        authorization,
        props.domainType,
        props.member._id,
        props.domainId
      )
    );
  };

  return (
    <div className="member" id={props.member._id}>
      <div className="title typography-6">{props.member.email}</div>
      <div className="typography-6">{`${props.member.lastName}, ${props.member.firstName}`}</div>
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
