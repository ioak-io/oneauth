import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, ButtonVariantType, IconButton, Input, Textarea, ThemeType } from 'basicui';
import './style.scss';
import { newId } from '../../../events/MessageService';
import RealmModel from '../../../model/RealmModel';
import { saveRealm } from '../EditRealmPage/service';
import Topbar from '../../../components/Topbar';
import { createUser, deleteUser, getUser } from './service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  space: string;
  location: any;
}

const UserListPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState<any[]>([]);
  const [showNewUserPrompt, setShowNewUserPrompt] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (authorization.isAuth && props.space) {
      getUser(props.space, authorization).then((response: any) => {
        setData(response || []);
      })
    }
  }, [authorization, props.space]);

  const onNewUser = () => {
    createUser(props.space, userName, authorization).then((response: any) => {
      setData([...data, response]);
      setShowNewUserPrompt(false);
      setUserName('');
    });
  };

  const onDeleteUser = (id: string) => {
    deleteUser(props.space, id, authorization).then((response: any) => {
      console.log(response);
      setData(data.filter((item: any) => item._id !== id));
    });
  };

  const onUserNameChange = (event: any) => {
    setUserName(event.currentTarget.value);
  }

  return (
    <div>
      <Topbar title="Users" />
      <div className="main-section">
        <div className="user-list-page page-width content-section">
          {!showNewUserPrompt && <div className="list-header">
            <Button onClick={() => setShowNewUserPrompt(true)}>Create new user</Button>
          </div>}
          {showNewUserPrompt && <div className="list-header-form">
            <Input name="name" value={userName} onInput={onUserNameChange} placeholder='User name' />
            <div>
              <Button onClick={onNewUser} theme={ThemeType.primary}>Save</Button>
              <Button onClick={() => { setShowNewUserPrompt(false) }}>Cancel</Button>
            </div>
          </div>}
          <div>
            <table className="basicui-table">
              <thead>
                <th>
                  Given name
                </th>
                <th>
                  Family name
                </th>
                <th>
                  Email
                </th>
                <th />
              </thead>
              <tbody>
                {data.map((item: any) =>
                  <tr key={item._id}>
                    <td>{item.given_name}</td>
                    <td>{item.family_name}</td>
                    <td>{item.email}</td>
                    <td>
                      <IconButton onClick={() => onDeleteUser(item._id)} circle theme={ThemeType.danger} variant={ButtonVariantType.transparent}>
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

export default UserListPage;
