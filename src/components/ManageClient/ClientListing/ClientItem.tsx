import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../oakui/wc/Button';
import OakClickArea from '../../../oakui/wc/OakClickArea';

import './ClientItem.scss';

interface Props {
  client: any;
}

const ClientItem = (props: Props) => {
  const history = useNavigate();

  const goToViewPage = () => history(`/manageclient/${props.client._id}`);

  return (
    <div className="client-item">
      <OakClickArea onClick={goToViewPage}>
        <div className="client-item__left">
          <div className="client-item__left__name">{props.client.name}</div>
          <div className="client-item__left__description">
            {props.client.description}
          </div>
        </div>
      </OakClickArea>
      <div className="client-item__right">
        <Button
          onClick={goToViewPage}
          theme={ThemeType.danger}
          shape="icon"
          
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </div>
  );
};

export default ClientItem;
