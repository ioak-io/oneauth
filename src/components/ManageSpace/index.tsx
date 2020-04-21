import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import OakDialog from '../../oakui/OakDialog';
import { Authorization } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import {
  sendMessage,
  receiveMessage,
  newId,
} from '../../events/MessageService';
import { createSpace } from '../../actions/SpaceActions';
import SpaceItem from './SpaceItem';
import OakText from '../../oakui/OakText';

const domain = 'space';

const id = newId();

interface Props {
  authorization: Authorization;
  label?: string;
  logout: Function;
}
// const tabDetails = [
//   { slotName: 'details', label: 'Basic details', icon: 'subject' },
//   { slotName: 'description', label: 'Description', icon: 'text_fields' },
// ];
const ManageSpace = (props: Props) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authorization);
  const space = useSelector(state => state.space);
  const spaceUsers = useSelector(state => state.adminUsers.data);
  const adminUsers = useSelector(state => state.roles);
  const [data, setData] = useState({
    id: undefined,
    name: '',
    spaceId: '',
    email: '',
    password: '',
  });
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === domain && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${domain} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'created') {
          setCreateDialogOpen(false);
        }
      }
    });
    return () => eventBus.unsubscribe();
  });

  useEffect(() => {
    if (!createDialogOpen) {
      setData({
        id: undefined,
        name: '',
        spaceId: '',
        email: auth.email,
        password: '',
      });
    }
  }, [createDialogOpen]);

  const addSpace = () => {
    const spaceData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (isEmptyOrSpaces(spaceData.name)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Space Name is missing',
        duration: 5000,
      });
      return;
    }

    if (isEmptyOrSpaces(spaceData.password)) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Password is missing',
        duration: 5000,
      });
      return;
    }

    dispatch(createSpace(props.authorization, spaceData));
  };

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const view = space.data.map(item => (
    <div key={id}>
      <SpaceItem
        id={item._id}
        space={item}
        authorization={props.authorization}
        spaceUsers={spaceUsers}
        role={adminUsers}
      />
      <br />
    </div>
  ));

  return (
    <div className="app-page">
      <div>
        <Navigation {...props} logout={props.logout} />
      </div>
      <div className="app-container">
        <div className="home">
          <div className="typography-2">Manage space</div>
          <div>
            <OakButton
              theme="primary"
              action={() => setCreateDialogOpen(!createDialogOpen)}
              variant="animate in"
              icon="add"
            >
              Create
            </OakButton>
          </div>
          <OakDialog
            visible={createDialogOpen}
            toggleVisibility={() => setCreateDialogOpen(!createDialogOpen)}
          >
            <div className="dialog-body">
              <OakText
                label="Space Name"
                data={data}
                id="name"
                handleChange={e => handleChange(e)}
              />
              <OakText
                label="Administrator Email"
                data={data}
                id="email"
                disabled
                handleChange={e => handleChange(e)}
              />
              <OakText
                label="Administrator Password"
                data={data}
                id="password"
                type="password"
                handleChange={e => handleChange(e)}
              />
            </div>
            <div className="dialog-footer">
              <OakButton
                action={() => setCreateDialogOpen(!createDialogOpen)}
                theme="default"
                variant="animate in"
                align="left"
              >
                <i className="material-icons">close</i>Cancel
              </OakButton>
              <OakButton
                action={() => addSpace()}
                theme="primary"
                variant="animate out"
                align="right"
              >
                <i className="material-icons">double_arrow</i>Create
              </OakButton>
            </div>
          </OakDialog>
          {view}

          {/* <div className="tab-test">
            <OakTab meta={tabDetails}>
              <div slot="details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                eget blandit tellus. Nam vel gravida ipsum. Ut porta scelerisque
                neque, at fringilla erat tristique quis. Nunc tellus orci,
                dictum sit amet venenatis et, ornare vel neque. Maecenas
                efficitur congue tristique. Curabitur vitae imperdiet magna.
                Quisque vehicula dui eros, non varius diam luctus a. Phasellus
                lectus sapien, elementum eget orci vitae, dictum fringilla orci.
                Vestibulum id ipsum id lectus elementum blandit. Proin sed eros
                nec lectus egestas iaculis nec eu nisi. Nullam id feugiat magna.
                Etiam lorem massa, scelerisque sed faucibus a, varius eget
                magna. Quisque sit amet dui placerat, luctus orci ut, volutpat
                leo.
              </div>
              <div slot="description">
                Morbi condimentum egestas placerat. Phasellus euismod rutrum
                orci non tristique. Nullam venenatis accumsan ornare. In
                venenatis volutpat scelerisque. Praesent eu risus ac metus
                mattis tempor. Donec luctus ante nec sapien hendrerit
                condimentum. Aliquam suscipit tincidunt justo vitae volutpat.
                Cras tincidunt lorem nec erat bibendum consectetur. Maecenas
                tempus ligula eget varius sollicitudin. Nam dictum leo non
                sapien gravida aliquam. Nullam eget accumsan urna. Morbi
                facilisis dictum dui vel maximus. Fusce enim orci, fermentum
                luctus quam in, tempor rhoncus augue.
              </div>
            </OakTab>
          </div>
          <div>
            <OakButton
              theme="primary"
              variant="animate in"
              icon="add"
              action={() => setModalVisible(true)}
            >
              Modal test
            </OakButton>
          </div>
          <OakModal
            visible={modalVisible}
            toggleVisibility={() => setModalVisible(!modalVisible)}
            label="Testing a modal dialog"
          >
            <div className="modal-body">
              Morbi condimentum egestas placerat. Phasellus euismod rutrum orci
              non tristique. Nullam venenatis accumsan ornare. In venenatis
              volutpat scelerisque. Praesent eu risus ac metus mattis tempor.
              Donec luctus ante nec sapien hendrerit condimentum. Aliquam
              suscipit tincidunt justo vitae volutpat. Cras tincidunt lorem nec
              erat bibendum consectetur. Maecenas tempus ligula eget varius
              sollicitudin. Nam dictum leo non sapien gravida aliquam. Nullam
              eget accumsan urna. Morbi facilisis dictum dui vel maximus. Fusce
              enim orci, fermentum luctus quam in, tempor rhoncus augue.
            </div>
          </OakModal> */}
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;
