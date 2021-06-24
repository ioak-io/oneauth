import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';

import './AppItem.scss';

interface Props {
  app: any;
}

const AppItem = (props: Props) => {
  const history = useHistory();

  const goToViewPage = () => history.push(`/manageapp/${props.app._id}`);

  return (
    <div className="app-item">
      <OakClickArea handleClick={goToViewPage}>
        <div className="app-item__left">
          <div className="app-item__left__name">{props.app.name}</div>
          <div className="app-item__left__description">
            {props.app.description}
          </div>
        </div>
      </OakClickArea>
      <div className="app-item__right">
        <OakButton
          handleClick={goToViewPage}
          theme="danger"
          shape="icon"
          variant="drama"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </OakButton>
      </div>
    </div>
  );
};

export default AppItem;
