import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { createSpace } from '../../actions/SpaceActions';
import SpaceItem from './SpaceItem';
import OakText from '../../oakui/OakText';
import OakModal from '../../oakui/OakModal';

const domain = 'space';

interface Props {
  logout: Function;
}
const ManageSpace = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authorization);
  const space = useSelector(state => state.space);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    if (!dialogOpen) {
      setData({
        ...data,
        name: '',
        password: '',
        repeatPassword: '',
      });
    }
  }, [dialogOpen]);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === domain && message.signal) {
        sendMessage('notification', true, {
          type: 'success',
          message: `${domain} ${message.data.action}`,
          duration: 5000,
        });
        if (message.data.action === 'created') {
          setDialogOpen(false);
        }
      }
    });
    return () => eventBus.unsubscribe();
  });

  useEffect(() => {
    setData({ ...data, email: auth.email });
  }, [auth]);

  const validateEmptyText = (text, message) => {
    if (isEmptyOrSpaces(text)) {
      sendMessage('notification', true, {
        type: 'failure',
        message,
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  const addSpace = () => {
    if (
      validateEmptyText(data.name, 'Space name cannot be empty') &&
      validateEmptyText(data.password, 'Password is not provided')
    ) {
      if (data.password !== data.repeatPassword) {
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Password does not match',
          duration: 5000,
        });
      } else {
        dispatch(
          createSpace(auth, {
            name: data.name,
            email: data.email,
            password: data.password,
          })
        );
      }
    }
  };

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const view = space.data.map(item => (
    <div key={item._id}>
      <SpaceItem id={item._id} space={item} />
      <br />
    </div>
  ));

  return (
    <>
      <div className="app-page">
        <div className="header-image">
          <Navigation {...props} logout={props.logout} />
        </div>
        <div className="app-container">
          <div className="top-actions">
            <OakButton
              theme="primary"
              action={() => setDialogOpen(!dialogOpen)}
              variant="animate in"
              icon="add"
            >
              Create
            </OakButton>
          </div>
          <div className="space-list">{view}</div>
        </div>
      </div>

      <OakModal
        small
        label="New space"
        visible={dialogOpen}
        toggleVisibility={() => setDialogOpen(!dialogOpen)}
      >
        <div className="modal-body">
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
          <OakText
            label="Repeat Password"
            data={data}
            id="repeatPassword"
            type="password"
            handleChange={e => handleChange(e)}
          />
        </div>
        <div className="modal-footer">
          <OakButton
            action={() => setDialogOpen(!dialogOpen)}
            theme="default"
            variant="animate in"
            align="left"
          >
            <i className="material-icons">close</i>Cancel
          </OakButton>
          <OakButton
            action={addSpace}
            theme="primary"
            variant="animate out"
            align="right"
          >
            <i className="material-icons">double_arrow</i>Create
          </OakButton>
        </div>
      </OakModal>
    </>
  );
};

export default ManageSpace;
