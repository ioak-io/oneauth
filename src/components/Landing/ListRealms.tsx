import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import RealmItem from './RealmItem';

interface Props {
  history: any;
}

const ListRealms = (props: Props) => {
  const realmList = useSelector((state: any) => state.realm);
  return (
    <div className="list-realms">
      <h2>Choose a realm to proceed</h2>
      <div className="list-realms--content">
        {realmList?.realms?.map((realm) => (
          <RealmItem realm={realm} history={props.history} key={realm.id} />
        ))}
      </div>
    </div>
  );
};

export default ListRealms;
