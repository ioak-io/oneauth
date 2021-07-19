import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import OakInput from '../../../oakui/wc/OakInput';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import ClientItem from './ClientItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';

const ClientListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const client = useSelector((state: any) => state.client);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  useEffect(() => {
    console.log('**********', client);
    if (client) {
      setView(search(client.clients, searchCriteria));
    }
  }, [client.clients, searchCriteria]);

  const handleSearchCriteriaChange = (detail: any) => {
    setSearchCriteria(detail.value);
  };

  const search = (clientList: any, criteria: any) => {
    if (isEmptyOrSpaces(criteria)) {
      return clientList;
    }
    return clientList.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  return (
    <div className="client-listing">
      <OakInput
        name="searchCriteria"
        value={searchCriteria}
        handleInput={handleSearchCriteriaChange}
        placeholder="Type to search"
      />
      <div className="client-listing__list">
        {view?.map((item) => (
          <ClientItem client={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ClientListing;
