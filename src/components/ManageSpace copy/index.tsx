import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakButton from '../../oakui/wc/OakButton';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { createSpace } from '../../actions/SpaceActions';
import SpaceItem from './SpaceItem';
import OakModal from '../../oakui/wc/OakModal';
import OakInput from '../../oakui/wc/OakInput';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';
import OakForm from '../../oakui/wc/OakForm';
import { Cancel, Close, DoubleArrow } from '@material-ui/icons';
import OakSelect from '../../oakui/wc/OakSelect';
import OakClickArea from '../../oakui/wc/OakClickArea';

const domain = 'space';

interface Props {
  logout: Function;
}
const ManageSpace = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authorization);
  const space = useSelector((state) => state.space);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    days: '',
    hours: '',
    minutes: '',
  });
  const [searchCriteria, setSearchCriteria] = useState({ text: '' });
  const [view, setView] = useState<Array<any> | undefined>(undefined);

  useEffect(() => {
    sendMessage('navbar', true);
  }, []);

  useEffect(() => {}, [auth]);

  useEffect(() => {
    setView(search(space.spaces, searchCriteria.text));
  }, [space.spaces, searchCriteria]);

  useEffect(() => {
    if (!dialogOpen) {
      setData({
        ...data,
        name: '',
        password: '',
        repeatPassword: '',
        days: '',
        hours: '',
        minutes: '',
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

  useEffect(() => {
    setData({ ...data, email: auth.email });
  }, [auth]);

  const search = (spaceList: any, criteria: any) => {
    if (isEmptyOrSpaces(criteria)) {
      return spaceList;
    }
    return spaceList.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(criteria.toLowerCase()) !== -1
    );
  };

  const validateEmptyText = (text: any, message: any) => {
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
      (auth.type !== 'oneauth' ||
        validateEmptyText(data.password, 'Password is not provided')) &&
      validateEmptyText(
        data.days || data.hours || data.minutes,
        'Session Expiry is not provided'
      )
    ) {
      if (data.password !== data.repeatPassword) {
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Password does not match',
          duration: 5000,
        });
      } else {
        const payload: any = {
          name: data.name,
          days: data.days,
          hours: data.hours,
          minutes: data.minutes,
          userId: auth.userId,
        };
        if (auth.type === 'oneauth') {
          payload.password = data.password;
        }
        dispatch(createSpace(auth, payload));
      }
    }
  };

  const handleChange = (detail: any) => {
    setData({
      ...data,
      [detail.name]: detail.value,
    });
  };

  const handleSearchCriteriaChange = (detail: any) => {
    setSearchCriteria({
      ...searchCriteria,
      [detail.name]: detail.value,
    });
  };

  return (
    <>
      <div className="manage-space">
        <div className="space-container">
          <div className="top-actions">
            <div className="search-bar">
              <OakInput
                name="text"
                value={searchCriteria.text}
                placeholder="Type to search"
                fill="float"
                handleInput={handleSearchCriteriaChange}
              />
            </div>
            <div className="create-action">
              <OakButton
                theme="primary"
                handleClick={() => setDialogOpen(!dialogOpen)}
                variant="regular"
              >
                New space
              </OakButton>
            </div>
          </div>
          <div className="space-list">
            {view?.map((item) => (
              <OakClickArea elevation={10} key={item._id}>
                <div key={item._id}>
                  <SpaceItem id={item._id} space={item} />
                </div>
              </OakClickArea>
            ))}
          </div>
        </div>
      </div>
      <OakForm formGroupName="manageSpaceModal" handleSubmit={addSpace}>
        <OakModal
          heading="New space"
          showModal={dialogOpen}
          handleClose={() => setDialogOpen(!dialogOpen)}
        >
          <div slot="body">
            <OakInput
              formGroupName="manageSpaceModal"
              value={data.name}
              name="name"
              placeholder="Space name"
              minLength={1}
              handleChange={(e) => handleChange(e)}
              gutterBottom
            />
            {auth.type === 'oneauth' && (
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.email}
                name="email"
                placeholder="Administrator Email"
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
            )}
            {auth.type === 'google' && (
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.email}
                name="email"
                placeholder="Administrator (Google)"
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
            )}
            {auth.type === 'facebook' && (
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.email}
                name="email"
                placeholder="Administrator (Facebook)"
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
            )}
            {auth.type === 'oneauth' && (
              <>
                <OakInput
                  formGroupName="manageSpaceModal"
                  value={data.password}
                  name="password"
                  placeholder="Administrator Password"
                  type="password"
                  minLength={1}
                  handleChange={(e) => handleChange(e)}
                  gutterBottom
                />
                <OakInput
                  value={data.repeatPassword}
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  type="password"
                  minLength={1}
                  handleChange={(e) => handleChange(e)}
                  gutterBottom
                />
              </>
            )}
            <div className="session-expiry">
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.days}
                name="days"
                type="number"
                placeholder="Expiry in days"
                min={1}
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.hours}
                name="hours"
                type="number"
                placeholder="Expiry in hours"
                min={1}
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
              <OakInput
                formGroupName="manageSpaceModal"
                value={data.minutes}
                name="minutes"
                type="number"
                placeholder="Expiry in minutes"
                min={1}
                handleChange={(e) => handleChange(e)}
                gutterBottom
              />
            </div>
          </div>
          <div slot="footer">
            <OakFormActionsContainer align="left">
              <OakButton
                formGroupName="manageSpaceModal"
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
                formGroupName="manageSpaceModal"
                handleClick={addSpace}
                theme="primary"
                variant="disappear"
                align="right"
                type="submit"
              >
                <DoubleArrow fontSize="small" />
                Create
              </OakButton>
            </OakFormActionsContainer>
          </div>
        </OakModal>
      </OakForm>
    </>
  );
};

export default ManageSpace;
