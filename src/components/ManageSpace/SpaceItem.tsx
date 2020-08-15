import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import './style.scss';
import OakPrompt from '../../oakui/OakPrompt';
import { deleteSpace } from '../../actions/SpaceActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import EditAdministrators from './EditAdministrators';
import OakModal from '../../oakui/OakModal';
import EditSpace from './EditSpace';
import { fetchRoles } from '../../actions/OaRoleActions';
import OakIcon from '../../oakui/OakIcon';

const spaceDomain = 'space';
const roleDomain = 'role';

interface Props {
  space: any;
  id: string;
}
const SpaceItem = (props: Props) => {
  const dispatch = useDispatch();
  const oaRoles = useSelector(state => state.oaRoles);
  const authorization = useSelector(state => state.authorization);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countOfAdmins, setCountofAdmins] = useState<undefined | number>(0);
  const permittedSpace = useSelector(state => state.permittedSpace);
  const [countOfApps, setCountOfApps] = useState<undefined | number>(0);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === spaceDomain && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${spaceDomain} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'updated') {
          setEditDialogOpen(false);
        }
        if (message.data.action === 'deleted') {
          setDeleteDialogOpen(false);
        }
      }
      if (message.name === roleDomain && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${roleDomain} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'updated') {
          // setAdminDialogOpen(false);
          setEditDialogOpen(false);
        }
        if (message.data.action === 'deleted') {
          // setAdminDialogOpen(false);
        }
      }
    });
    return () => eventBus.unsubscribe();
  });

  useEffect(() => {
    dispatch(fetchRoles(authorization));
  }, [authorization]);

  useEffect(() => {
    const existingAdmins = oaRoles.data.data?.filter(
      item => item.domainId === props.space._id
    );

    setCountofAdmins(existingAdmins?.length);
  }, [oaRoles.data.data]);

  useEffect(() => {
    console.log(permittedSpace);
    console.log(props.space.spaceId);
    const connectedApp = permittedSpace.data?.filter(
      item => item.spaceId === props.space.spaceId
    );
    console.log(connectedApp);
    setCountOfApps(connectedApp.length);
  }, [permittedSpace.data]);

  const editSpace = () => {
    setEditDialogOpen(true);
  };

  const editAdmin = () => {
    setAdminDialogOpen(true);
  };

  const confirmDeleteSpace = () => {
    setDeleteDialogOpen(true);
  };

  const actionElements = [
    {
      label: 'Details',
      action: editSpace,
      icon: 'edit',
    },
    {
      label: 'Administrators',
      action: editAdmin,
      icon: 'people_alt',
    },
    {
      label: 'Roles',
      action: editAdmin,
      icon: 'vpn_key',
    },
    {
      label: 'Delete Space',
      action: confirmDeleteSpace,
      icon: 'delete',
    },
  ];

  return (
    <>
      <div className="space-item" key={props.space.id}>
        <div className="content">
          <div className="title typography-8">{`${props.space.name} (${props.space.spaceId})`}</div>
          <div className="statistics typography-4">
            <div className="administrators" onClick={editAdmin}>
              {countOfAdmins} Administrator(s)
            </div>
            <div className="connected-apps">
              {countOfApps && countOfApps !== 0
                ? `${countOfApps} Connected App(s)`
                : `Connected to Open Apps`}
            </div>
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
        <EditSpace
          space={props.space}
          toggleVisibilityHandler={() => setEditDialogOpen(!editDialogOpen)}
        />
      </OakModal>
      <OakModal
        label="Space Administrators"
        visible={adminDialogOpen}
        toggleVisibility={() => setAdminDialogOpen(!adminDialogOpen)}
      >
        <EditAdministrators
          space={props.space}
          toggleVisibilityHandler={() => setAdminDialogOpen(!adminDialogOpen)}
        />
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
