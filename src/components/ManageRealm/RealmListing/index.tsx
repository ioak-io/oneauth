import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import RealmItem from './RealmItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import OakButton from '../../../oakui/wc/OakButton';
import CreateRealm from './CreateRealm';

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
              <OakInput
                name="searchCriteria"
                value={searchCriteria}
                handleInput={handleSearchCriteriaChange}
                placeholder="Type to search"
              />
            </div>
            <div className="realm-listing__toolbar__right">
              <OakButton
                variant="regular"
                handleClick={() => setShowCreate(true)}
              >
                New realm
              </OakButton>
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
