import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'basicui';
import { isEmptyOrSpaces } from '../../Utils';
import { fetchSpace } from '../../Auth/AuthService';
import SpaceItem from './SpaceItem';
import './style.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  asset: string;
}

const OneAuth = (props: Props) => {
  const [searchParams] = useSearchParams();
  const authorization = useSelector((state: any) => state.authorization);
  const [view, setView] = useState<Array<any> | undefined>(undefined);
  const [searchCriteria, setSearchCriteria] = useState({ text: '' });
  const [loading, setLoading] = useState(false);
  const [queryParam, setQueryParam] = useState<any>();

  useEffect(() => {
    if (searchParams.has("space")) {
      window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${queryParam.space}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}&asset=${props.asset}&from=${searchParams.get("from")}`;
    }
    setQueryParam(queryParam);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchSpace().then((response) => {
      setView(search(response, searchCriteria.text));
      setLoading(false);
    });
  }, [searchCriteria]);

  const search = (existingSpace: any, criteria: string) => {
    if (isEmptyOrSpaces(criteria)) {
      return existingSpace;
    }
    return existingSpace.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  const handleSearchCriteria = (event: any) => {
    setSearchCriteria({
      ...searchCriteria,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    if (authorization.isAuth) {
      navigate(`/${props.asset}/article`);
    }
  }, [authorization]);

  const goBack = () => {
    navigate(-1)
  };

  const getHeadingLinks = () => {
    const links: any[] = [];
    if (props.history.length > 2) {
      links.push({
        label: 'Go back',
        icon: 'reply',
        action: () => goBack(),
      });
    }
    return links;
  };

  return (
    <div>
      <div className="view-asset-item">
        <div className="page-header">
          Login via Oneauth
          <br />
          You will be redirected to oneauth for signing in to your space
          {getHeadingLinks()?.map((item: any) => (
            <>{item.name}</>
          ))}
        </div>

        {!loading && view && view.length > 0 && (
          <Input
            label="Type company name to filter"
            onInput={handleSearchCriteria}
            name="text"
            value={searchCriteria.text}
          />
        )}

        {!loading &&
          view &&
          view.length === 0 &&
          'No space found. Check with Oneauth administrator.'}

        <div className="list-spaces">
          <div className="list-spaces--content">
            {view?.map((space) => (
              <SpaceItem
                history={props.history}
                space={space}
                key={space._id}
                asset={props.asset}
                from={queryParam && queryParam.from ? queryParam.from : null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneAuth;
