import React from 'react';
import './style.scss';

interface Props {
  realm: any;
  history: any;
}

const RealmItem = (props: Props) => {
  const goToRealmPage = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${props.realm.realmId}/login?type=signin&clientId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };
  return (
    <div className="realm-list-item" onClick={goToRealmPage}>
      <div className="realm-list-item--link">
        <div className="typography-6">{props.realm.name}</div>
      </div>
      <div className="typography-4">{props.realm.description}</div>
    </div>
  );
};

export default RealmItem;
