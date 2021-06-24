import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import AppItem from './AppItem';

const AppListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const app = useSelector((state: any) => state.app);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    console.log('**********', app);
    if (app) {
      setView(search(app.apps, searchCriteria));
    }
  }, [app.apps, searchCriteria]);

  const handleSearchCriteriaChange = (detail: any) => {
    setSearchCriteria(detail.value);
  };

  const search = (appList: any, criteria: any) => {
    if (isEmptyOrSpaces(criteria)) {
      return appList;
    }
    return appList.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  return (
    <div className="app-listing">
      <OakInput
        name="searchCriteria"
        value={searchCriteria}
        handleInput={handleSearchCriteriaChange}
        placeholder="Type to search"
      />
      <div className="app-listing__list">
        {view?.map((item) => (
          <AppItem app={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default AppListing;
