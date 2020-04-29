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
  const [searchCriteria, setSearchCriteria] = useState({ text: '' });
  const [view, setView] = useState<Array<any> | undefined>(undefined);

  useEffect(() => {
    setView(search(space.data, searchCriteria.text));
  }, [space.data, searchCriteria]);

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

  const search = (spaceList, criteria) => {
    if (isEmptyOrSpaces(criteria)) {
      return spaceList;
    }
    return spaceList.filter(
      item => item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

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

  const handleSearchCriteriaChange = event => {
    setSearchCriteria({
      ...searchCriteria,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="app-page">
        <div className="header-image">
          <Navigation {...props} logout={props.logout} />
        </div>
        <div className="space-container">
          <div className="top-actions">
            <div className="search-bar">
              <OakText
                placeholder="Type to search"
                handleChange={handleSearchCriteriaChange}
                id="text"
                data={searchCriteria}
              />
            </div>
            <div className="create-action">
              <OakButton
                theme="primary"
                action={() => setDialogOpen(!dialogOpen)}
                variant="animate none"
                icon="blur_on"
              >
                New space
              </OakButton>
            </div>
          </div>
          <div className="space-list">
            {view?.map(item => (
              <div key={item._id}>
                <SpaceItem id={item._id} space={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <OakModal
        small
        label="New space"
        visible={dialogOpen}
        toggleVisibility={() => setDialogOpen(!dialogOpen)}
      >
        <div className="modal-body two-column">
          <div className="typography-5">Name</div>
          <OakText data={data} id="name" handleChange={e => handleChange(e)} />
          <div className="typography-5">Administrator Email</div>
          <OakText
            data={data}
            id="email"
            disabled
            handleChange={e => handleChange(e)}
          />
          <div className="typography-5">Administrator Password</div>
          <OakText
            data={data}
            id="password"
            type="password"
            handleChange={e => handleChange(e)}
          />
          <div className="typography-5">Repeat Password</div>
          <OakText
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
