import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakTypography from '../../oakui/wc/OakTypography';
import { deleteRoles } from '../../actions/OaRoleActions';
import './member.scss';

interface Props {
  member: any;
  domainId: string;
  domainType: string;
  owner: string;
}

const Member = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const [confirmPromptOpen, setConfirmPromptOpen] = useState(false);

  const remove = () => {
    if (
      props.member.email === props.owner ||
      props.member._id === props.owner
    ) {
      return;
    }
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
      <>
        <OakTypography>{props.member.email}</OakTypography>
        <OakTypography>{`${props.member.lastName}, ${props.member.firstName}`}</OakTypography>
      </>
      <div className="action">
        {!confirmPromptOpen &&
          props.member.email !== props.owner &&
          props.member._id !== props.owner && (
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
