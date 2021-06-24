import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';

import './SpaceItem.scss';

interface Props {
  space: any;
}

const SpaceItem = (props: Props) => {
  const history = useHistory();

  const goToViewPage = () => history.push(`/managespace/${props.space._id}`);

  return (
    <div className="space-item">
      <OakClickArea handleClick={goToViewPage}>
        <div className="space-item__left">
          <div className="space-item__left__name">{props.space.name}</div>
          <div className="space-item__left__description">
            {props.space.description}
          </div>
        </div>
      </OakClickArea>
      <div className="space-item__right">
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

export default SpaceItem;
