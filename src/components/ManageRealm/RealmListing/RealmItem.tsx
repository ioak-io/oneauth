import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../oakui/wc/Button';
import OakClickArea from '../../../oakui/wc/OakClickArea';

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
      <OakClickArea onClick={goToViewPage}>
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

export default RealmItem;
