import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addDays, format } from 'date-fns';
import {
  faBuilding,
  faCheck,
  faCog,
  faDatabase,
  faPlus,
  faShieldAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import Topbar from '../../../components/Topbar';
import SideNavLink from '../../../components/SideNavLink';
import EditCompany from './EditCompany';
import Permissions from './Permissions';
import BackupAndRestore from './BackupAndRestore';

interface Props {
  space: string;
  location: any;
}

const SettingsPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="settings-page">
      <Topbar title="Settings" />
      <div className="settings-page-container main-section">
        {/* <div className="settings-page__main"> */}
        {searchParams.get('link') === 'general' && (
          <EditCompany space={props.space} location={props.location} />
        )}
        {searchParams.get('link') === 'permissions' && (
          <Permissions space={props.space} location={props.location} />
        )}
        {searchParams.get('link') === 'backup' && (
          <BackupAndRestore space={props.space} location={props.location} />
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SettingsPage;
