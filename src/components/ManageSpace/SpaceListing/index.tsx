import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import SpaceItem from './SpaceItem';

const SpaceListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const space = useSelector((state: any) => state.space);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    setView(search(space.spaces, searchCriteria));
  }, [space.spaces, searchCriteria]);

  const handleSearchCriteriaChange = (detail: any) => {
    setSearchCriteria(detail.value);
  };

  const search = (spaceList: any, criteria: any) => {
    if (isEmptyOrSpaces(criteria)) {
      return spaceList;
    }
    return spaceList.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  return (
    <div className="space-listing">
      <OakInput
        name="searchCriteria"
        value={searchCriteria}
        handleInput={handleSearchCriteriaChange}
        placeholder="Type to search"
      />
      <div className="space-listing__list">
        {view?.map((item) => (
          <SpaceItem space={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default SpaceListing;
