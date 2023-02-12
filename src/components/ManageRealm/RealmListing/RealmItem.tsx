import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, IconButton, ThemeType } from 'basicui';

import './RealmItem.scss';

interface Props {
  realm: any;
}

const RealmItem = (props: Props) => {
  const history = useNavigate();

  const goToViewPage = () => {
    history(`/managerealm/${props.realm.realm}`);
  };

  return (
    <div className="realm-item">
      <div onClick={goToViewPage}>
        <div className="realm-item__left">
          <div className="realm-item__left__name">
            {`${props.realm.name} (${props.realm.realm})`}
          </div>
          <div className="realm-item__left__description">
            {props.realm.description}
          </div>
        </div>
      </div>
      <div className="realm-item__right">
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

export default RealmItem;
