import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, ButtonVariantType, IconButton, Input, Textarea, ThemeType } from 'basicui';
import './style.scss';
import { newId } from '../../../events/MessageService';
import RealmModel from '../../../model/RealmModel';
import { saveRealm } from '../EditRealmPage/service';
import Topbar from '../../../components/Topbar';
import { createRole, deleteRole, getRole } from './service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  space: string;
  location: any;
}

const RolePage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState<any[]>([]);
  const [showNewRolePrompt, setShowNewRolePrompt] = useState(false);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    if (authorization.isAuth && props.space) {
      getRole(props.space, authorization).then((response: any) => {
        setData(response || []);
      })
    }
  }, [authorization, props.space]);

  const onNewRole = () => {
    createRole(props.space, roleName, authorization).then((response: any) => {
      setData([...data, response]);
      setShowNewRolePrompt(false);
      setRoleName('');
    });
  };

  const onDeleteRole = (id: string) => {
    deleteRole(props.space, id, authorization).then((response: any) => {
      console.log(response);
      setData(data.filter((item: any) => item._id !== id));
    });
  };

  const onRoleNameChange = (event: any) => {
    setRoleName(event.currentTarget.value);
  }

  return (
    <div>
      <Topbar title="Roles" />
      <div className="main-section">
        <div className="role-page page-width content-section">
          {!showNewRolePrompt && <div className="list-header">
            <Button onClick={() => setShowNewRolePrompt(true)}>Create new role</Button>
          </div>}
          {showNewRolePrompt && <div className="list-header-form">
            <Input name="name" value={roleName} onInput={onRoleNameChange} placeholder='Role name' />
            <div>
              <Button onClick={onNewRole} theme={ThemeType.primary}>Save</Button>
              <Button onClick={() => { setShowNewRolePrompt(false) }}>Cancel</Button>
            </div>
          </div>}
          <div>
            <table className="basicui-table">
              <thead>
                <th>
                  Role
                </th>
                <th />
              </thead>
              <tbody>
                {data.map((item: any) =>
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>
                      <IconButton onClick={() => onDeleteRole(item._id)} circle theme={ThemeType.danger} variant={ButtonVariantType.transparent}>
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

export default RolePage;
