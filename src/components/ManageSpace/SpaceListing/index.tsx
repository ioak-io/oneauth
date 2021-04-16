import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';

const SpaceListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const space = useSelector((state) => state.space);
  const [searchCriteria, setSearchCriteria] = useState('');
  const history = useHistory();

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

  const handleClick = (spaceItem: any) => {
    history.push(`/managespace/${spaceItem._id}`);
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
          <OakClickArea
            elevation={10}
            key={item._id}
            handleClick={() => handleClick(item)}
          >
            <div className="space-listing__list__item">
              <div>{item.name}</div>
              <div>{item.description}</div>
            </div>
          </OakClickArea>
        ))}
      </div>
    </div>
  );
};

export default SpaceListing;
