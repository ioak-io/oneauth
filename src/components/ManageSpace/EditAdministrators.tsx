import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakAutoComplete from '../../oakui/OakAutoComplete';
import {
  updateRoles,
  fetchRoles,
  deleteRoles,
} from '../../actions/OaRoleActions';
import OakPrompt from '../../oakui/OakPrompt';

interface Props {
  space: any;
}

const EditAdministrators = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const oaUsers = useSelector(state => state.oaUsers);
  const oaRoles = useSelector(state => state.oaRoles);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [items, setItems] = useState<undefined | any[]>([{}]);
  const [administrators, setAdministrators] = useState({
    type: '',
    userId: '',
    domainId: '',
  });
  const [data, setData] = useState({
    autoCompleteDropdownData: [{}],
  });

  useEffect(() => {
    dispatch(fetchRoles(authorization));
  }, [authorization]);

  useEffect(() => {
    const oaRole = oaRoles.data.data?.filter(
      item => item.domainId === props.space._id
    );
    const oaUser = diff(oaRole, oaUsers.data);
    setItems(oaUser);
  }, [oaRoles.data.data]);

  const diff = (arr, arr2) => {
    const ret: any[] = [];
    arr2.map(item1 => {
      arr.map(item => {
        if (item1._id.indexOf(item.userId) > -1) {
          ret.push(item1);
        }
      });
    });
    return ret;
  };

  useEffect(() => {
    let list: any[] = [];
    oaUsers.data?.map(item => {
      list.push({ key: item._id, value: item.email });
    });

    const adminList: any[] = [];
    if (items) {
      items.map(item => adminList.push({ id: item._id }));
    }
    list = list.filter(val => {
      return !adminList.some(item => {
        return val.key === item.id;
      });
    });
    setData({ autoCompleteDropdownData: list });
  }, [oaUsers.data, items]);

  const handleAutoCompleteChange = (value: string) => {
    dispatch(
      updateRoles(authorization, {
        type: 'space',
        userId: value,
        domainId: props.space._id,
      })
    );
  };

  const confirmDeleteRole = userId => {
    setAdministrators({
      ...administrators,
      userId,
      domainId: props.space._id,
    });
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="modal-body">
        <div className="autocomplete-users space-bottom-2">
          <OakAutoComplete
            label="Users to Add"
            handleChange={handleAutoCompleteChange}
            objects={data.autoCompleteDropdownData}
          />
        </div>
        <div className="typography-6 space-top-2 ">Existing Administartors</div>
        <div
          className="space-display space-top-2 space-bottom-4"
          key={oaUsers._id}
        >
          <div className="card">
            <div className="label">Admin Email</div>
            <div className="label">Admin First Name</div>
            <div className="label">Admin Last Name</div>
          </div>
          {items?.map(item => (
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
      </div>
      {deleteDialogOpen}
      <OakPrompt
        action={() =>
          dispatch(
            deleteRoles(
              authorization,
              'space',
              administrators.userId,
              administrators.domainId
            )
          )
        }
        visible={deleteDialogOpen}
        toggleVisibility={() => setDeleteDialogOpen(!deleteDialogOpen)}
      />
    </>
  );
};

export default EditAdministrators;
