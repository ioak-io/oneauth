import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OakAutoComplete from '../../oakui/OakAutoComplete';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import { updateSpace } from '../../actions/SpaceActions';
import {
  updateRoles,
  fetchRoles,
  deleteRoles,
} from '../../actions/OaRoleActions';
import { Authorization } from '../Types/GeneralTypes';
import OakPrompt from '../../oakui/OakPrompt';

interface Props {
  authorization: Authorization;
  space: any;
  id: string;
  spaceUsers: any;
  existingAdmins?: any;
}

const EditSpace = (props: Props) => {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [user, setUser] = useState<undefined | any[]>([{}]);
  const [administrators, setAdministrators] = useState({
    type: '',
    userId: '',
    domainId: '',
  });
  const [spaceData, setSpaceData] = useState({
    id: '',
    name: '',
    spaceId: '',
    email: '',
    password: '',
  });
  const [data, setData] = useState({
    autoCompleteDropdownData: [{}],
  });

  useEffect(() => {
    setSpaceData(props.space);
  }, [props.space]);

  useEffect(() => {
    setAdministrators({
      type: '',
      userId: '',
      domainId: props.space.id,
    });
  }, []);

  useEffect(() => {
    setUser(props.spaceUsers.data);
  }, [props.spaceUsers.data]);

  useEffect(() => {
    dispatch(fetchRoles(props.authorization));
  }, []);

  useEffect(() => {
    let list: any[] = [];
    user?.map(item => {
      list.push({ key: item._id, value: item.email });
    });

    const adminList: any[] = [];
    if (props.existingAdmins) {
      props.existingAdmins.map(item => adminList.push({ id: item._id }));
    }
    list = list.filter(val => {
      return !adminList.some(item => {
        return val.key === item.id;
      });
    });
    setData({ autoCompleteDropdownData: list });
  }, [user]);

  const handleAutoCompleteChange = (value: string) => {
    console.log(value, props.space);
    const administrator = {
      type: 'space',
      userId: value,
      domainId: spaceData.id,
    };
    dispatch(updateRoles(props.authorization, administrator));
  };

  const handleChange = event => {
    setSpaceData({
      ...spaceData,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDeleteRole = userId => {
    setAdministrators({
      ...administrators,
      userId,
    });
    setDeleteDialogOpen(true);
  };

  const handleUpdateSpace = () => {
    dispatch(updateSpace(props.authorization, spaceData));
  };

  return (
    <div>
      <div className="modal-body">
        {props.existingAdmins && (
          <div>
            <div className="autocomplete-test space-bottom-2">
              <OakAutoComplete
                label="Users to Add"
                handleChange={handleAutoCompleteChange}
                objects={data.autoCompleteDropdownData}
              />
            </div>
            <div className="typography-5 space-top-2 ">
              Existing Administartors
            </div>
            <div
              className="space-display space-top-2 space-bottom-4"
              key={props.id}
            >
              <div className="card">
                <div className="label">Admin Email</div>
                <div className="label">Admin First Name</div>
                <div className="label">Admin Last Name</div>
              </div>
              {props.existingAdmins.map(item => (
                <div className="card" key={item._id}>
                  <div className="title typography-6">{item.email}</div>
                  <div className="typography-6">{item.firstName}</div>
                  <div className="typography-6">{item.lastName}</div>
                  <div className="item-delete">
                    <i
                      data-test="article-delete"
                      onClick={() => confirmDeleteRole(item._id)}
                      className="material-icons"
                    >
                      delete
                    </i>
                  </div>
                </div>
              ))}
            </div>
            {deleteDialogOpen}
            <OakPrompt
              action={() =>
                dispatch(
                  deleteRoles(
                    props.authorization,
                    'space',
                    administrators.userId,
                    administrators.domainId
                  )
                )
              }
              visible={deleteDialogOpen}
              toggleVisibility={() => setDeleteDialogOpen(!deleteDialogOpen)}
            />
          </div>
        )}

        {!props.existingAdmins && (
          <div>
            <OakText
              label="Space Name"
              data={spaceData}
              id="name"
              handleChange={e => handleChange(e)}
            />
          </div>
        )}
      </div>
      <div className="modal-footer">
        <OakButton
          action={() => setEditDialogOpen(!editDialogOpen)}
          theme="default"
          variant="animate in"
          align="left"
        >
          <i className="material-icons">close</i>Cancel
        </OakButton>
        <OakButton
          theme="primary"
          action={handleUpdateSpace}
          variant="animate none"
          align="right"
        >
          <i className="material-icons">double_arrow</i>Update
        </OakButton>
      </div>
    </div>
  );
};

export default EditSpace;
