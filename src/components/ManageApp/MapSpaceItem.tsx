import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './mapspace.scss';
import { deletePermittedSpace } from '../../actions/PermittedSpaceAction';

interface Props {
  appSpaceItem: any;
  appId: string;
}

const MapSpaceItem = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const [confirmPromptOpen, setConfirmPromptOpen] = useState(false);

  const remove = () => {
    dispatch(
      deletePermittedSpace(
        authorization,
        props.appSpaceItem.spaceId,
        props.appId
      )
    );
  };

  return (
    <div className="mapspace" id={props.appSpaceItem._id}>
      <div className="title typography-6">{props.appSpaceItem.spaceId}</div>
      <div className="typography-6">{props.appSpaceItem.name}</div>
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

export default MapSpaceItem;
