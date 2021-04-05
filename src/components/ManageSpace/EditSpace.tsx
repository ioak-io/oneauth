import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { updateSpace } from '../../actions/SpaceActions';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage } from '../../events/MessageService';
import OakInput from '../../oakui/wc/OakInput';
import OakButton from '../../oakui/wc/OakButton';
import { Cancel, DoubleArrow } from '@material-ui/icons';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';

interface Props {
  space: any;
  toggleVisibilityHandler: Function;
}

const EditSpace = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const [spaceData, setSpaceData] = useState({
    days: '',
    hours: '',
    minutes: '',
    name: '',
  });

  useEffect(() => {
    setSpaceData(props.space);
  }, [props.space]);

  // useEffect(() => {
  //   const expiry = convertor(props.space.sessionExpiry);
  //   setView({
  //     ...view,
  //     day: `${expiry.day}`,
  //     hour: `${expiry.hour}`,
  //     minutes: `${expiry.minutes}`,
  //     name: props.space.name,
  //   });
  // }, [props.space.sessionExpiry]);

  // const convertor = data => {
  //   const day = Math.floor(data / (60 * 24));
  //   const hour = Math.floor((data - day * 1440) / 60);
  //   const minutes = data % 60;
  //   return { day, hour, minutes };
  // };

  const handleChange = (detail: any) => {
    setSpaceData({
      ...spaceData,
      [detail.name]: detail.value,
    });
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

  const editSpace = () => {
    // if (
    //   validateEmptyText(spaceData.name, 'Space name cannot be empty') &&
    //   validateEmptyText(
    //     spaceData.days || spaceData.hours || spaceData.minutes,
    //     'Session Expiry is not provided'
    //   )
    // ) {
    dispatch(updateSpace(authorization, spaceData));
    // }
  };

  return (
    <>
      <div slot="modal-body">
        <OakInput
          value={spaceData.name}
          name="name"
          placeholder="Space Name"
          size="medium"
          type="text"
          errorStyle="outline"
          minLength={1}
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <div className="session-expiry">
          <OakInput
            value={spaceData.days}
            name="days"
            type="number"
            minLength={1}
            placeholder="Expiry in days"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
          <OakInput
            value={spaceData.hours}
            name="hours"
            type="number"
            minLength={1}
            placeholder="Expiry in hours"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
          <OakInput
            value={spaceData}
            name="minutes"
            type="number"
            minLength={1}
            placeholder="Expiry in minutes"
            handleChange={(e) => handleChange(e)}
            gutterBottom
          />
        </div>
      </div>
      <div slot="footer">
        <OakFormActionsContainer align="left">
          <OakButton
            handleClick={props.toggleVisibilityHandler}
            theme="default"
            variant="appear"
            align="left"
          >
            <Cancel fontVariant="round" />
            Cancel
          </OakButton>
          <OakButton
            theme="primary"
            handleClick={editSpace}
            variant="regular"
            align="right"
          >
            <DoubleArrow />
            Update
          </OakButton>
        </OakFormActionsContainer>
      </div>
    </>
  );
};

export default EditSpace;
