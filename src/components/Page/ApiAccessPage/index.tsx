import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, ButtonVariantType, IconButton, Input, Textarea, ThemeType } from 'basicui';
import './style.scss';
import { newId } from '../../../events/MessageService';
import RealmModel from '../../../model/RealmModel';
import { saveRealm } from '../EditRealmPage/service';
import Topbar from '../../../components/Topbar';
import { deleteApiToken, generateApiToken, getApiToken } from './service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  space: string;
  location: any;
}

const ApiAccessPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (authorization.isAuth && props.space) {
      getApiToken(props.space, authorization).then((response: any) => {
        setData(response || []);
      })
    }
  }, [authorization, props.space]);

  const onGenerateToken = () => {
    generateApiToken(props.space, authorization).then((response: any) => {
      setData([...data, response]);
    });
  };

  const onDeleteToken = (token: string) => {
    deleteApiToken(props.space, token, authorization).then((response: any) => {
      console.log(response);
      setData(data.filter((item: any) => item.token !== token));
    });
  };

  return (
    <div>
      <Topbar title="API Access Token" />
      <div className="main-section">
        <div className="api-access-page page-width content-section">
          <div className="list-header">
            <Button onClick={onGenerateToken}>Generate new API token</Button>
          </div>
          <div>
            <table className="basicui-table">
              <thead>
                <th>
                  Token
                </th>
                <th>
                  Issue date
                </th>
                <th />
              </thead>
              <tbody>
                {data.map((item: any) =>
                  <tr key={item._id}>
                    <td>{item.token}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <IconButton onClick={() => onDeleteToken(item.token)} circle theme={ThemeType.danger} variant={ButtonVariantType.transparent}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </IconButton>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiAccessPage;
