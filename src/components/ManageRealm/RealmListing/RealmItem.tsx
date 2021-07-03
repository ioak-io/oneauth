import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';

import './RealmItem.scss';

interface Props {
  realm: any;
}

const RealmItem = (props: Props) => {
  const history = useHistory();

  const goToViewPage = () => history.push(`/managerealm/${props.realm._id}`);

  return (
    <div className="realm-item">
      <OakClickArea handleClick={goToViewPage}>
        <div className="realm-item__left">
          <div className="realm-item__left__name">
            {`${props.realm.name} (${props.realm.realm})`}
          </div>
          <div className="realm-item__left__description">
            {props.realm.description}
          </div>
        </div>
      </OakClickArea>
      <div className="realm-item__right">
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

export default RealmItem;
