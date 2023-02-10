import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import RealmItem from './RealmItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import CreateRealm from './CreateRealm';
import { Button, Input } from 'basicui';

const RealmListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const realm = useSelector((state: any) => state.realm);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    console.log(realm);
    setView(search(realm.realms, searchCriteria));
  }, [realm.realms, searchCriteria]);

  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  const handleSearchCriteriaChange = (detail: any) => {
    setSearchCriteria(detail.value);
  };

  const search = (realmList: any, criteria: any) => {
    if (isEmptyOrSpaces(criteria)) {
      return realmList;
    }
    return realmList.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  return (
    <>
      {!showCreate && (
        <div className="realm-listing">
          <div className="realm-listing__toolbar">
            <div className="realm-listing__toolbar__left">
              <Input
                name="searchCriteria"
                value={searchCriteria}
                onInput={handleSearchCriteriaChange}
                placeholder="Type to search"
              />
            </div>
            <div className="realm-listing__toolbar__right">
              <Button
                onClick={() => setShowCreate(true)}
              >
                New realm
              </Button>
            </div>
          </div>
          <div className="realm-listing__list">
            {view?.map((item) => (
              <RealmItem realm={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
      {showCreate && <CreateRealm handleClose={() => setShowCreate(false)} />}
    </>
  );
};

export default RealmListing;
