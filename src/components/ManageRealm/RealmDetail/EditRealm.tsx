import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Check, Close, Https, Info } from '@material-ui/icons';
import './EditRealm.scss';
import { updateRealm } from '../../../store/actions/RealmActions';
import Input from '../../../oakui/wc/Input';
import Button from '../../../oakui/wc/Button';
import OakForm from '../../../oakui/wc/OakForm';
import div from '../../../oakui/wc/div';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import SiteSettings from './SiteSettings';

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
    site: {} as any,
    upload: {} as any,
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

  const onInput = (detail: any) => {
    setRealmData({
      ...realmData,
      [detail.name]: detail.value,
    });
  };

  const handleSiteChange = (site: any) => {
    console.log(realmData, site);
    setRealmData({
      ...realmData,
      site,
    });
  };

  const handleUploadChange = (name: string, value: any) => {
    setRealmData({
      ...realmData,
      upload: realmData.upload
        ? { ...realmData.upload, [name]: value }
        : { [name]: value },
    });
  };

  const editRealm = () => {
    dispatch(updateRealm({ ...realmData }));
    realmData.upload = {};
  };

  const handleReset = () => {};

  return (
    <OakForm
      
      handleSubmit={editRealm}
      handleReset={handleReset}
    >
      <div className="edit-realm">
        <div
          fillColor="container"
          rounded
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
        >
          <h6>
            <div className="title-section">
              <FontAwesomeIcon icon={faInfoCircle} />
              Overview
            </div>
          </div>
          <div className="title-gutter-bottom" />
          <div className="edit-realm__overview">
            <Input
              
              value={realmData.name}
              name="name"
              label="Realm name"
              type="text"
              minLength={5}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
            <Input
              
              value={realmData.description}
              name="description"
              label="Description"
              type="text"
              minLength={1}
              onInput={(e: any) => onInput(e)}
              gutterBottom
            />
          </div>
        </div>
        <div
          fillColor="container"
          paddingHorizontal={3}
          paddingVertical={3}
          elevation={1}
          rounded
        >
          <h6>
            <div className="title-section">
              <FontAwesomeIcon icon={faShieldAlt} />
              Security
            </div>
          </div>
          <div className="edit-realm__security">
            <div className="edit-realm__security__jwt">
              <Input
                
                value={realmData.days}
                name="days"
                type="number"
                minLength={1}
                label="Expiry in days"
                onInput={(e: any) => onInput(e)}
                gutterBottom
              />
              <Input
                
                value={realmData.hours}
                name="hours"
                type="number"
                minLength={1}
                label="Expiry in hours"
                onInput={(e: any) => onInput(e)}
                gutterBottom
              />
              <Input
                
                value={realmData.minutes}
                name="minutes"
                type="number"
                minLength={1}
                label="Expiry in minutes"
                onInput={(e: any) => onInput(e)}
                gutterBottom
              />
            </div>
          </div>
        </div>
        {realmData.site.layout && (
          <SiteSettings
            site={realmData.site}
            onInput={handleSiteChange}
            handleUploadChange={handleUploadChange}
          />
        )}
        <div className="app-action-bar">
          <div />
          <div>
            <Button
              
              theme={ThemeType.primary}
              
              type="submit"
              elevation={4}
            >
              <Check />
              Update
            </Button>
            <Button
              
              onClick={handleReset}
              theme={ThemeType.default}
              
              elevation={4}
            >
              <Close />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </OakForm>
  );
};

export default EditRealm;
