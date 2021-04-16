import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Cancel,
  Check,
  Close,
  Details,
  DoubleArrow,
  Https,
  Info,
} from '@material-ui/icons';
import './EditSpace.scss';
import { updateSpace } from '../../../actions/SpaceActions';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakForm from '../../../oakui/wc/OakForm';
import OakSection from '../../../oakui/wc/OakSection';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakSpacing from '../../../oakui/wc/OakSpacing';

interface Props {
  space: any;
}

const EditSpace = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state) => state.authorization);
  const [spaceData, setSpaceData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    name: '',
    description: '',
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

  const handleInput = (detail: any) => {
    setSpaceData({
      ...spaceData,
      [detail.name]: detail.value,
    });
  };

  const editSpace = () => {
    dispatch(updateSpace(authorization, spaceData));
  };

  const handleReset = () => {};

  return (
    <OakForm
      formGroupName={formId}
      handleSubmit={editSpace}
      handleReset={handleReset}
    >
      <div className="edit-space">
        <OakSection
          fillColor="container"
          rounded
          paddingHorizontal={2}
          paddingVertical={3}
          elevation={4}
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Info />
              Overview
            </div>
          </OakTypography>
          <div className="title-gutter-bottom" />
          <div className="edit-space__overview">
            <OakInput
              formGroupName={formId}
              fill="surface"
              value={spaceData.name}
              name="name"
              label="Space name"
              type="text"
              minLength={5}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              fill="surface"
              value={spaceData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
          </div>
        </OakSection>
        <OakSection
          fillColor="container"
          paddingHorizontal={2}
          paddingVertical={3}
          elevation={4}
          rounded
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Https />
              Security
            </div>
          </OakTypography>
          <div className="edit-space__security">
            <div className="edit-space__security__jwt">
              <OakInput
                formGroupName={formId}
                fill="surface"
                value={spaceData.days}
                name="days"
                type="number"
                minLength={1}
                label="Expiry in days"
                handleInput={(e: any) => handleInput(e)}
                gutterBottom
              />
              <OakInput
                formGroupName={formId}
                fill="surface"
                value={spaceData.hours}
                name="hours"
                type="number"
                minLength={1}
                label="Expiry in hours"
                handleInput={(e: any) => handleInput(e)}
                gutterBottom
              />
              <OakInput
                formGroupName={formId}
                fill="surface"
                value={spaceData.minutes}
                name="minutes"
                type="number"
                minLength={1}
                label="Expiry in minutes"
                handleInput={(e: any) => handleInput(e)}
                gutterBottom
              />
            </div>
          </div>
        </OakSection>
        <div className="app-action-bar">
          <div />
          <div>
            <OakButton
              formGroupName={formId}
              theme="primary"
              variant="regular"
              type="submit"
            >
              <Check />
              Update
            </OakButton>
            <OakButton
              formGroupName={formId}
              handleClick={handleReset}
              theme="default"
              variant="appear"
            >
              <Close />
              Reset
            </OakButton>
          </div>
        </div>
      </div>
    </OakForm>
  );
};

export default EditSpace;
