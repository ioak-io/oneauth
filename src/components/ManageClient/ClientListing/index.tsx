import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { isEmptyOrSpaces } from '../../Utils';
import './style.scss';
import ClientItem from './ClientItem';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import CreateClient from './CreateClient';
import { Button, Input } from 'basicui';

const ClientListing = () => {
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const client = useSelector((state: any) => state.client);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  useEffect(() => {
    console.log('**********', client);
    if (client) {
      setView(
        search(
          client.clients.filter((item: any) => item.editRights),
          searchCriteria
        )
      );
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
                New client
              </Button>
            </div>
          </div>
          <div className="client-listing__list">
            {view?.map((item) => (
              <ClientItem client={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
      {showCreate && <CreateClient handleClose={() => setShowCreate(false)} />}
    </>
  );
};

export default ClientListing;
