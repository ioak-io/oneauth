import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import './style.scss';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import EditAdministrators from './EditAdministrators';
import EditApp from './EditApp';
import { fetchRoles } from '../../actions/OaRoleActions';
import { deleteApp } from '../../actions/AppActions';
import AppDetails from './AppDetails';
import MapSpace from './MapSpace';
import OakTypography from '../../oakui/wc/OakTypography';
import {
  Cancel,
  Delete,
  Edit,
  MoreHoriz,
  PeopleAlt,
  VpnKey,
} from '@material-ui/icons';
import OakModal from '../../oakui/wc/OakModal';
import OakSection from '../../oakui/wc/OakSection';
import OakMenu from '../../oakui/wc/OakMenu';
import OakMenuItem from '../../oakui/wc/OakMenuItem';
import OakPrompt from '../../oakui/OakPrompt';

const appDomain = 'app';
const roleDomain = 'role';

interface Props {
  app: any;
}
const AppItem = (props: Props) => {
  const dispatch = useDispatch();
  const oaRoles = useSelector((state) => state.oaRoles);
  const permittedSpace = useSelector((state) => state.permittedSpace);
  const authorization = useSelector((state) => state.authorization);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [spaceMapDialogOpen, setSpaceMapDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countOfAdmins, setCountofAdmins] = useState<undefined | number>(0);
  const [countOfSpaces, setCountOfSpaces] = useState<undefined | number>(0);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe((message) => {
      if (message.name === appDomain && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${appDomain} ${message.data.action}`,
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
          setEditDialogOpen(false);
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
      (item) => item.domainId === props.app._id
    );
    setCountofAdmins(existingAdmins?.length);
  }, [oaRoles.data.data]);

  useEffect(() => {
    const connectedSpace = permittedSpace.data?.filter(
      (item) => item.appId === props.app._id
    );
    setCountOfSpaces(connectedSpace.length);
  }, [permittedSpace.data]);

  const editApp = () => {
    setEditDialogOpen(true);
  };

  const appDetails = () => {
    setDetailsDialogOpen(true);
  };
  const editAdmin = () => {
    setAdminDialogOpen(true);
  };

  const mapSpace = () => {
    setSpaceMapDialogOpen(true);
  };

  const confirmDeleteApp = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <OakSection
        paddingHorizontal={4}
        paddingVertical={1}
        rounded
        fillColor="surface"
      >
        <OakTypography variant="h6">
          <div onClick={appDetails}>{`${props.app.name}`}</div>
        </OakTypography>
        <OakTypography variant="caption">{`${props.app.redirect}`}</OakTypography>
        <OakTypography variant="caption">
          <div className="administrators" onClick={editAdmin}>
            {countOfAdmins} Administrators
          </div>
        </OakTypography>
        <OakTypography variant="caption" gutterBottom={true}>
          <div>
            {props.app.protected
              ? `${countOfSpaces} Connected Space(s)`
              : `Open App`}
          </div>
        </OakTypography>

        <OakMenu>
          {props.app.protected ? (
            <OakMenuItem handleClick={mapSpace}>
              <Edit fontSize="small" />
              Permitted Space
            </OakMenuItem>
          ) : (
            ''
          )}
          <OakMenuItem handleClick={editApp}>
            <Edit fontSize="small" />
            Details
          </OakMenuItem>
          <OakMenuItem handleClick={editAdmin}>
            <PeopleAlt fontSize="small" />
            Administrators
          </OakMenuItem>
          <OakMenuItem handleClick={editAdmin}>
            <VpnKey fontSize="small" />
            Roles
          </OakMenuItem>
          <OakMenuItem handleClick={confirmDeleteApp}>
            <Delete fontSize="small" />
            Delete App
          </OakMenuItem>
        </OakMenu>

        <OakModal
          heading="Map Space"
          showModal={spaceMapDialogOpen}
          handleClose={() => setSpaceMapDialogOpen(!spaceMapDialogOpen)}
        >
          <div slot="body">
            <MapSpace
              app={props.app}
              toggleVisibilityHandler={() =>
                setSpaceMapDialogOpen(!spaceMapDialogOpen)
              }
            />
          </div>
        </OakModal>

        <OakModal
          heading="Edit App"
          showModal={editDialogOpen}
          handleClose={() => setEditDialogOpen(!editDialogOpen)}
        >
          <div slot="body">
            <EditApp
              app={props.app}
              toggleVisibilityHandler={() => setEditDialogOpen(!editDialogOpen)}
            />
          </div>
        </OakModal>
        <OakModal
          heading="App Details"
          showModal={detailsDialogOpen}
          handleClose={() => setDetailsDialogOpen(!detailsDialogOpen)}
        >
          <div slot="body">
            <AppDetails
              app={props.app}
              toggleVisibilityHandler={() =>
                setDetailsDialogOpen(!detailsDialogOpen)
              }
            />
          </div>
        </OakModal>
        <OakModal
          heading="App Administrators"
          showModal={adminDialogOpen}
          handleClose={() => setAdminDialogOpen(!adminDialogOpen)}
        >
          <div slot="body">
            <EditAdministrators
              app={props.app}
              toggleVisibilityHandler={() =>
                setAdminDialogOpen(!adminDialogOpen)
              }
            />
          </div>
        </OakModal>
        <OakPrompt
          action={() => dispatch(deleteApp(authorization, props.app.appId))}
          visible={deleteDialogOpen}
          toggleVisibility={() => setDeleteDialogOpen(!deleteDialogOpen)}
        />
      </OakSection>
    </>
  );
};

export default AppItem;
