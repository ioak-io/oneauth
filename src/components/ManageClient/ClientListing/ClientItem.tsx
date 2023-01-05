import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import OakButton from '../../../oakui/wc/OakButton';
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
      <OakClickArea handleClick={goToViewPage}>
        <div className="client-item__left">
          <div className="client-item__left__name">{props.client.name}</div>
          <div className="client-item__left__description">
            {props.client.description}
          </div>
        </div>
      </OakClickArea>
      <div className="client-item__right">
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

export default ClientItem;
