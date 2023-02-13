import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Check, Close, Https, Info } from '@material-ui/icons';
import './EditRealm.scss';
import { updateRealm } from '../../../store/actions/RealmActions';
import { newId } from '../../../events/MessageService';
import SiteSettings from './SiteSettings';
import { Button, Input, ThemeType } from 'basicui';

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
    setRealmData({ ...realmData, ...props.realm });
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

  const onInput = (event: any) => {
    setRealmData({
      ...realmData,
      [event.currentTarget.name]: event.currentTarget.value,
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

  const editRealm = (event: any) => {
    event.preventDefault();
    dispatch(updateRealm({ ...realmData }));
    realmData.upload = {};
  };

  const handleReset = (event: any) => { event.preventDefault(); };

  return (
    <form
      onSubmit={editRealm}
      onReset={handleReset}
    >
      <div className="edit-realm">
        <div>
          <h6>
            <div className="title-section">
              <FontAwesomeIcon icon={faInfoCircle} />
              Overview
            </div>
          </h6>
          <div className="title-gutter-bottom" />
          <div className="edit-realm__overview">
            <Input
              value={realmData.name}
              name="name"
              label="Realm name"
              type="text"
              onInput={onInput}
            />
            <Input
              value={realmData.description}
              name="description"
              label="Description"
              type="text"
              onInput={onInput}
            />
          </div>
        </div>
        <div>
          <h6>
            <div className="title-section">
              <FontAwesomeIcon icon={faShieldAlt} />
              Security
            </div>
          </h6>
          <div className="edit-realm__security">
            <div className="edit-realm__security__jwt">
              <Input

                value={realmData.days}
                name="days"
                type="number"
                label="Expiry in days"
                onInput={onInput}
              />
              <Input

                value={realmData.hours}
                name="hours"
                type="number"
                label="Expiry in hours"
                onInput={onInput}
              />
              <Input

                value={realmData.minutes}
                name="minutes"
                type="number"
                minLength={1}
                label="Expiry in minutes"
                onInput={onInput}

              />
            </div>
          </div>
        </div>
        {realmData.site.layout && (
          <SiteSettings
            site={realmData.site}
            onChange={handleSiteChange}
            handleUploadChange={handleUploadChange}
          />
        )}
        <div className="app-action-bar">
          <div />
          <div>
            <Button
              theme={ThemeType.primary}
              type="submit"
            >
              <Check />
              Update
            </Button>
            <Button
              onClick={handleReset}
              theme={ThemeType.default}
            >
              <Close />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditRealm;
