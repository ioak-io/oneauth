import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, ThemeType } from 'basicui';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import './ClientItem.scss';

interface Props {
  client: any;
}

const ClientItem = (props: Props) => {
  const history = useNavigate();

  const goToViewPage = () => history(`/manageclient/${props.client._id}`);

  return (
    <div className="client-item">
      <div onClick={goToViewPage}>
        <div className="client-item__left">
          <div className="client-item__left__name">{props.client.name}</div>
          <div className="client-item__left__description">
            {props.client.description}
          </div>
        </div>
      </div>
      <div className="client-item__right">
        <IconButton
          circle
          onClick={goToViewPage}
          theme={ThemeType.danger}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </div>
    </div>
  );
};

export default ClientItem;
