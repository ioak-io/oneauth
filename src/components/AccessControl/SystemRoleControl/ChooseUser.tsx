/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import OakButton from '../../../oakui/wc/OakButton';
import './ChooseUser.scss';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import {
  addSystemRoleForRealmForMultipleUsers,
  addSystemRoleForClientForMultipleUsers,
} from './service';

interface Props {
  realm?: number;
  clientId?: string;
  systemUserMap: any;
  systemRoleReverseMap: any;
  handleClose: any;
  handleUpdate: any;
}

const ChooseUser = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [choosenRecords, setChoosenRecords] = useState<any[]>([]);

  useEffect(() => {
    console.log('props.systemUserMap', props.systemUserMap);
  }, [props.systemUserMap]);

  const handleSelection = (detail: any) => {
    if (detail.value) {
      setChoosenRecords([...choosenRecords, detail.name]);
    } else {
      setChoosenRecords(choosenRecords.filter((item) => item !== detail.name));
    }
  };

  const handleSave = () => {
    console.log(props.realm, props.clientId);
    if (props.realm) {
      addSystemRoleForRealmForMultipleUsers(
        props.realm,
        choosenRecords,
        props.systemRoleReverseMap['system-user']?._id
      ).then((data: any) => props.handleUpdate());
    } else if (props.clientId) {
      addSystemRoleForClientForMultipleUsers(
        props.clientId,
        choosenRecords,
        props.systemRoleReverseMap['system-user']?._id
      ).then((data: any) => props.handleUpdate());
    }
    // mapGridcontrolByClient(props.clientId, choosenRecords).then(() => {
    //   props.handleUpdate();
    // });
  };

  return (
    <div className="choose-user">
      <div className="choose-user__header">
        <div className="control-grid__action">
          {choosenRecords.length > 0 && (
            <>
              <OakButton
                handleClick={handleSave}
                theme="primary"
                variant="regular"
              >
                Link choosen realms
              </OakButton>
              <OakButton
                handleClick={() => setChoosenRecords([])}
                theme="info"
                variant="regular"
              >
                Clear
              </OakButton>
            </>
          )}
          <OakButton
            handleClick={props.handleClose}
            theme="info"
            variant="regular"
          >
            Cancel
          </OakButton>
        </div>
      </div>
      <div className="choose-user__main">
        <table className={tableCompose({ color: 'container' })}>
          <thead>
            <tr>
              <th> </th>
              <th>Given name</th>
              <th>Family name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(props.systemUserMap)?.map((item: any) => (
              <tr
                key={item._id}
                className={
                  choosenRecords.includes(item._id)
                    ? 'choose-user__main__record choose-user__main__record--active'
                    : 'choose-user__main__record'
                }
              >
                <td>
                  <div className="context-action">
                    <OakCheckbox
                      value={choosenRecords.includes(item._id)}
                      name={item._id}
                      handleChange={handleSelection}
                    />
                  </div>
                </td>
                <td
                  onClick={() =>
                    handleSelection({
                      name: item._id,
                      value: !choosenRecords.includes(item._id),
                    })
                  }
                >
                  {item.given_name}
                </td>
                <td
                  onClick={() =>
                    handleSelection({
                      name: item._id,
                      value: !choosenRecords.includes(item._id),
                    })
                  }
                >
                  {item.family_name}
                </td>
                <td
                  onClick={() =>
                    handleSelection({
                      name: item._id,
                      value: !choosenRecords.includes(item._id),
                    })
                  }
                >
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChooseUser;
