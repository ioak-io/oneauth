import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { createApp } from '../../actions/AppActions';
import AppItem from './AppItem';
import OakText from '../../oakui/OakText';
import OakModal from '../../oakui/OakModal';

const domain = 'app';

interface Props {
  logout: Function;
}
const ManageApp = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authorization);
  const app = useSelector(state => state.app.data);
  const [data, setData] = useState({
    name: '',
    redirect: '',
  });
  const [searchCriteria, setSearchCriteria] = useState({ text: '' });
  const [view, setView] = useState<Array<any> | undefined>(undefined);

  useEffect(() => {
    setView(search(app.data, searchCriteria.text));
  }, [app.data, searchCriteria]);

  useEffect(() => {
    if (!dialogOpen) {
      setData({
        ...data,
        name: '',
        redirect: '',
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

  const search = (appList, criteria) => {
    if (isEmptyOrSpaces(criteria)) {
      return appList;
    }
    return appList.filter(
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

  const addApp = () => {
    if (
      validateEmptyText(data.name, 'App name cannot be empty') &&
      validateEmptyText(data.redirect, 'Redirect url is not provided')
    ) {
      dispatch(
        createApp(auth, {
          name: data.name,
          redirect: data.redirect,
        })
      );
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
        <div className="oaapp-container">
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
                New App
              </OakButton>
            </div>
          </div>
          <div className="app-list">
            {view?.map(item => (
              <div key={item._id}>
                <AppItem id={item._id} app={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <OakModal
        small
        label="New App"
        visible={dialogOpen}
        toggleVisibility={() => setDialogOpen(!dialogOpen)}
      >
        <div className="modal-body two-column">
          <div className="typography-5">Name</div>
          <OakText data={data} id="name" handleChange={e => handleChange(e)} />
          <div className="typography-5">Redirect url</div>
          <OakText
            data={data}
            id="redirect"
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
            action={addApp}
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

export default ManageApp;
