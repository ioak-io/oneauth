import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakButton from '../../oakui/wc/OakButton';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { createApp } from '../../actions/AppActions';
import AppItem from './AppItem';
import OakInput from '../../oakui/wc/OakInput';
import OakModal from '../../oakui/wc/OakModal';
import OakCheckbox from '../../oakui/wc/OakCheckbox';
import { BlurOn, Cancel, DoubleArrow } from '@material-ui/icons';
import OakTypography from '../../oakui/wc/OakTypography';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';

const domain = 'app';

interface Props {
  logout: Function;
}
const ManageApp = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authorization);
  const app = useSelector((state) => state.app.data);
  const [data, setData] = useState({
    name: '',
    redirect: '',
    jwtpassword: '',
    protected: false,
  });
  const [searchCriteria, setSearchCriteria] = useState({ text: '' });
  const [view, setView] = useState<Array<any> | undefined>(undefined);

  useEffect(() => {
    sendMessage('navbar', true);
  }, []);

  useEffect(() => {
    setView(search(app.data, searchCriteria.text));
  }, [app.data, searchCriteria]);

  useEffect(() => {
    if (!dialogOpen) {
      setData({
        ...data,
        name: '',
        redirect: '',
        jwtpassword: '',
        protected: false,
      });
    }
  }, [dialogOpen]);

  useEffect(() => {
    const eventBus = receiveMessage().subscribe((message) => {
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
      (item) => item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
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
      validateEmptyText(data.name, 'App name can not be empty') &&
      validateEmptyText(data.redirect, 'Redirect url is not provided') &&
      validateEmptyText(data.jwtpassword, 'JWT Password can not be empty')
    ) {
      dispatch(
        createApp(auth, {
          name: data.name,
          redirect: data.redirect,
          jwtpassword: data.jwtpassword,
          protected: data.protected,
        })
      );
    }
  };

  const handleChange = (detail) => {
    setData({
      ...data,
      [detail.name]: detail.value,
    });
  };

  const handleChangeCheckbox = (detail) => {
    setData({
      ...data,
      [detail.name]: detail.checked,
    });
  };

  const handleSearchCriteriaChange = (detail) => {
    setSearchCriteria({
      ...searchCriteria,
      [detail.name]: detail.value,
    });
  };

  return (
    <>
      <div className="app-page manage-app">
        <div className="oaapp-container smooth-page">
          <div className="top-actions">
            <div className="search-bar">
              <OakInput
                placeholder="Type to search"
                handleInput={handleSearchCriteriaChange}
                name="text"
                value={searchCriteria.text}
              />
            </div>
            <div className="create-action">
              <OakButton
                theme="primary"
                handleClick={() => setDialogOpen(!dialogOpen)}
                variant="regular"
              >
                New App
              </OakButton>
            </div>
          </div>
          <div className="oaapp-list">
            {view?.map((item) => (
              <AppItem app={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
      <OakModal
        heading="New App"
        showModal={dialogOpen}
        handleClose={() => setDialogOpen(!dialogOpen)}
      >
        <div slot="body">
          <OakInput
            value={data.name}
            name="name"
            placeholder="Application Name"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
          <OakInput
            value={data.redirect}
            name="redirect"
            placeholder="Redirect url"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
          <OakInput
            value={data.jwtpassword}
            name="jwtpassword"
            placeholder="JWT Password"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
          <OakCheckbox
            name="protected"
            value={data.protected}
            size="small"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          >
            <OakTypography variant="caption">protected</OakTypography>
          </OakCheckbox>
        </div>
        <div slot="footer">
          <OakFormActionsContainer align="left">
            <OakButton
              handleClick={() => setDialogOpen(!dialogOpen)}
              theme="default"
              variant="appear"
              align="left"
              type="button"
            >
              <Cancel fontSize="small" />
              Cancel
            </OakButton>
            <OakButton
              handleClick={addApp}
              theme="primary"
              variant="disappear"
              align="right"
            >
              <DoubleArrow fontSize="small" />
              Create
            </OakButton>
          </OakFormActionsContainer>
        </div>
      </OakModal>
    </>
  );
};

export default ManageApp;
