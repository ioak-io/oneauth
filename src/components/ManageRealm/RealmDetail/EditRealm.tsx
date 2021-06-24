import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Close, Https, Info } from '@material-ui/icons';
import './EditRealm.scss';
import { updateRealm } from '../../../actions/RealmActions';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakForm from '../../../oakui/wc/OakForm';
import OakSection from '../../../oakui/wc/OakSection';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';

interface Props {
  realm: any;
}

const EditRealm = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);
  const [realmData, setRealmData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    name: '',
    description: '',
  });

  useEffect(() => {
    setRealmData(props.realm);
  }, [props.realm]);

  // useEffect(() => {
  //   const expiry = convertor(props.realm.sessionExpiry);
  //   setView({
  //     ...view,
  //     day: `${expiry.day}`,
  //     hour: `${expiry.hour}`,
  //     minutes: `${expiry.minutes}`,
  //     name: props.realm.name,
  //   });
  // }, [props.realm.sessionExpiry]);

  // const convertor = data => {
  //   const day = Math.floor(data / (60 * 24));
  //   const hour = Math.floor((data - day * 1440) / 60);
  //   const minutes = data % 60;
  //   return { day, hour, minutes };
  // };

  const handleInput = (detail: any) => {
    setRealmData({
      ...realmData,
      [detail.name]: detail.value,
    });
  };

  const editRealm = () => {
    dispatch(updateRealm(realmData));
  };

  const handleReset = () => {};

  return (
    <OakForm
      formGroupName={formId}
      handleSubmit={editRealm}
      handleReset={handleReset}
    >
      <div className="edit-realm">
        <OakSection
          fillColor="container"
          rounded
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Info />
              Overview
            </div>
          </OakTypography>
          <div className="title-gutter-bottom" />
          <div className="edit-realm__overview">
            <OakInput
              formGroupName={formId}
              value={realmData.name}
              name="name"
              label="Realm name"
              type="text"
              minLength={5}
              handleInput={(e: any) => handleInput(e)}
              gutterBottom
            />
            <OakInput
              formGroupName={formId}
              value={realmData.description}
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
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
          rounded
        >
          <OakTypography variant="h6">
            <div className="title-section">
              <Https />
              Security
            </div>
          </OakTypography>
          <div className="edit-realm__security">
            <div className="edit-realm__security__jwt">
              <OakInput
                formGroupName={formId}
                value={realmData.days}
                name="days"
                type="number"
                minLength={1}
                label="Expiry in days"
                handleInput={(e: any) => handleInput(e)}
                gutterBottom
              />
              <OakInput
                formGroupName={formId}
                value={realmData.hours}
                name="hours"
                type="number"
                minLength={1}
                label="Expiry in hours"
                handleInput={(e: any) => handleInput(e)}
                gutterBottom
              />
              <OakInput
                formGroupName={formId}
                value={realmData.minutes}
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
              elevation={4}
            >
              <Check />
              Update
            </OakButton>
            <OakButton
              formGroupName={formId}
              handleClick={handleReset}
              theme="default"
              variant="regular"
              elevation={4}
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

export default EditRealm;
