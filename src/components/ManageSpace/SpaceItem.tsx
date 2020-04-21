import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OakDialog from '../../oakui/OakDialog';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import './style.scss';
import OakPrompt from '../../oakui/OakPrompt';
import { deleteSpace } from '../../actions/SpaceActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import SpaceView from './SpaceView';
import { Authorization } from '../Types/GeneralTypes';
import OakModal from '../../oakui/OakModal';

const domain = ['space', 'role'];

interface Props {
  authorization: Authorization;
  space: any;
  id: string;
  spaceUsers: any;
  role: any;
}
const SpaceItem = (props: Props) => {
  const auth = props.authorization;
  const dispatch = useDispatch();
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
    setUsers(props.spaceUsers);
    setExistingAdmins(props.role.data.data);
  }, [props.spaceUsers, props.role.data.data]);

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

  const editAdmin = id => {
    setDataItem({
      ...dataItem,
      id,
    });
    console.log(existigAdmins);
    setAdminDialogOpen(true);
    const userRole = existigAdmins?.filter(item => item.domainId === id);
    console.log(userRole);
    const userData = diff(userRole, props.spaceUsers.data);
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

  const confirmDeleteSpace = spaceId => {
    console.log(spaceId);
    setDataItem({
      ...dataItem,
      spaceId,
    });
    setDeleteDialogOpen(true);
  };

  const updateSpace = space => (
    <SpaceView
      id={space._id}
      space={space}
      authorization={auth}
      spaceUsers={users}
    />
  );

  const updateAdmin = (space, items) => (
    <SpaceView
      id={space._id}
      space={space}
      authorization={auth}
      spaceUsers={users}
      existingAdmins={items}
    />
  );
  return (
    <div className="space-display space-top-2" key={props.space.id}>
      <div className="card">
        <div className="title typography-4">{props.space.spaceId}</div>
        <div className="typography-4">{props.space.name}</div>
        <div className="popover-test space-top-0">
          <OakPopoverMenu
            label="Manage"
            id={props.space._id}
            theme="primary"
            elements={[
              {
                label: 'Edit Space',
                action: () => {
                  editSpace(props.space);
                },
                icon: 'library_add_check',
              },
              {
                label: 'Delete Space',
                action: () => confirmDeleteSpace(props.space.spaceId),
                icon: 'apps',
              },
              {
                label: 'Update Admin',
                action: () => editAdmin(props.space._id),
                icon: 'people_alt',
              },
            ]}
            iconLeft="playlist_add"
            labelVariant="on"
            right
            mobilize
          />
        </div>
        <OakModal
          visible={editDialogOpen}
          toggleVisibility={() => setEditDialogOpen(!editDialogOpen)}
        >
          {updateSpace(dataItem)}
        </OakModal>
        <OakDialog
          visible={adminDialogOpen}
          toggleVisibility={() => setAdminDialogOpen(!adminDialogOpen)}
        >
          {updateAdmin(dataItem, items)}
        </OakDialog>
        {deleteDialogOpen}
        <OakPrompt
          action={() =>
            dispatch(deleteSpace(props.authorization, dataItem.spaceId))
          }
          visible={deleteDialogOpen}
          toggleVisibility={() => setDeleteDialogOpen(!deleteDialogOpen)}
        />
      </div>
    </div>
  );
};

export default SpaceItem;
