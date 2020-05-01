import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakAutoComplete from '../../oakui/OakAutoComplete';
import {
  updateRoles,
  fetchRoles,
  deleteRoles,
} from '../../actions/OaRoleActions';
import OakPrompt from '../../oakui/OakPrompt';
import OakButton from '../../oakui/OakButton';
import Member from '../ManageApp/Member';

interface Props {
  space: any;
  toggleVisibilityHandler: Function;
}

const EditAdministrators = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const oaUsers = useSelector(state => state.oaUsers);
  const oaRoles = useSelector(state => state.oaRoles);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [items, setItems] = useState<undefined | any[]>([{}]);
  const [administrators, setAdministrators] = useState({
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
            placeholder="Search by user name"
            handleChange={handleAutoCompleteChange}
            objects={data.autoCompleteDropdownData}
          />
        </div>
        <div
          className="space-view space-top-2 space-bottom-4"
          key={oaUsers._id}
        >
          <div className="list-view-header typography-5">
            <div className="label">Email</div>
            <div className="label">Name</div>
            <div className="label" />
          </div>
          {items?.map(item => (
            <Member
              domainType="space"
              domainId={props.space._id}
              member={item}
            />
          ))}
        </div>
      </div>
      <div className="modal-footer">
        <OakButton
          action={props.toggleVisibilityHandler}
          theme="default"
          variant="animate in"
          align="left"
        >
          <i className="material-icons">close</i>Close
        </OakButton>
      </div>
      {deleteDialogOpen && (
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
      )}
    </>
  );
};

export default EditAdministrators;
