import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import './style.scss';
import OakPrompt from '../../oakui/OakPrompt';
import { deleteSpace } from '../../actions/SpaceActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import EditAdministrators from './EditAdministrators';
import OakModal from '../../oakui/OakModal';

const domain = ['space', 'role'];

interface Props {
  space: any;
  id: string;
}
const SpaceItem = (props: Props) => {
  const dispatch = useDispatch();
  const oaRoles = useSelector(state => state.oaRoles);
  const oaUsers = useSelector(state => state.oaUsers);
  const authorization = useSelector(state => state.authorization);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [users, setUsers] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [items, setItems] = useState<undefined | any[]>([{}]);
  const [existigAdmins, setExistingAdmins] = useState<undefined | any[]>([{}]);
  const [dataItem, setDataItem] = useState({
    id: undefined,
    name: '',
    spaceId: '',
    email: '',
  });

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === domain[0] && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${domain[0]} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'updated') {
          setEditDialogOpen(false);
        }
        if (message.data.action === 'deleted') {
          setDeleteDialogOpen(false);
        }
      }
      if (message.name === domain[1] && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${domain[1]} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'updated') {
          setAdminDialogOpen(false);
        }
        if (message.data.action === 'deleted') {
          setAdminDialogOpen(false);
        }
      }
    });
    return () => eventBus.unsubscribe();
  });

  useEffect(() => {
    setUsers(oaUsers);
    setExistingAdmins(oaRoles.data.data);
  }, [oaUsers, oaRoles.data.data]);

  useEffect(() => {
    setDataItem(props.space);
  }, [props.space]);

  const editSpace = space => {
    setEditDialogOpen(true);
    setDataItem({
      ...dataItem,
      id: space._id,
      name: space.name,
      spaceId: space.spaceId,
      email: space.email,
    });
  };

  const editAdmin = () => {
    setDataItem({
      ...dataItem,
      id: props.space._id,
    });
    console.log(existigAdmins);
    setAdminDialogOpen(true);
    const userRole = existigAdmins?.filter(
      item => item.domainId === props.space._id
    );
    console.log(userRole);
    const userData = diff(userRole, oaUsers.data);
    console.log(userData);
    setItems(userData);
  };

  const diff = (arr, arr2) => {
    const ret: any[] = [];
    arr2.map(item1 => {
      arr.map(item => {
        if (item1._id.indexOf(item.userId) > -1) {
          ret.push(item1);
        }
      });
    });
    return ret;
  };

  const confirmDeleteSpace = () => {
    console.log(props.space.spaceId);
    setDataItem({
      ...dataItem,
      spaceId: props.space.spaceId,
    });
    setDeleteDialogOpen(true);
  };

  const updateSpace = space => (
    <EditAdministrators id={space._id} space={space} oaUsers={users} />
  );

  const updateAdmin = (space, items) => (
    <EditAdministrators
      id={space._id}
      space={space}
      oaUsers={users}
      existingAdmins={items}
    />
  );
  const actionElements = [
    {
      label: 'Edit Space',
      action: () => {
        editSpace(props.space);
      },
      icon: 'library_add_check',
    },
    {
      label: 'Delete Space',
      action: confirmDeleteSpace,
      icon: 'apps',
    },
    {
      label: 'Update Admin',
      action: editAdmin,
      icon: 'people_alt',
    },
  ];

  return (
    <>
      <div className="space-item" key={props.space.id}>
        <div className="content">
          <div className="title typography-8">{`${props.space.name} (${props.space.spaceId})`}</div>
          <div className="statistics typography-4">
            <div className="administrators" onClick={editAdmin}>
              3 Administrators
            </div>
            <div>2 Connected Apps</div>
          </div>
        </div>
        <div className="action space-top-0">
          <OakPopoverMenu elements={actionElements} theme="primary" right>
            <div slot="label" className="action-item">
              <i className="material-icons">more_horiz</i>
            </div>
          </OakPopoverMenu>
        </div>
      </div>

      <OakModal
        label="Edit space"
        visible={editDialogOpen}
        toggleVisibility={() => setEditDialogOpen(!editDialogOpen)}
      >
        {updateSpace(dataItem)}
      </OakModal>
      <OakModal
        label="Space Administrators"
        visible={adminDialogOpen}
        toggleVisibility={() => setAdminDialogOpen(!adminDialogOpen)}
      >
        {updateAdmin(dataItem, items)}
      </OakModal>
      <OakPrompt
        action={() => dispatch(deleteSpace(authorization, props.space.spaceId))}
        visible={deleteDialogOpen}
        toggleVisibility={() => setDeleteDialogOpen(!deleteDialogOpen)}
      />
    </>
  );
};

export default SpaceItem;
