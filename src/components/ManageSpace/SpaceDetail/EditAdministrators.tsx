import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Member from '../ManageApp/Member';
import { Cancel, Close, DoubleArrow } from '@material-ui/icons';
import OakSelect from '../../../oakui/wc/OakSelect';
import { updateRoles, fetchRoles } from '../../../actions/OaRoleActions';
import OakButton from '../../../oakui/wc/OakButton';
import Member from '../../ManageApp/Member';

interface Props {
  space: any;
  toggleVisibilityHandler: Function;
}

const EditAdministrators = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const oaUsers = useSelector((state) => state.oaUsers);
  const oaRoles = useSelector((state) => state.oaRoles);
  const [items, setItems] = useState<undefined | any[]>([{}]);
  const [data, setData] = useState({
    autoCompleteDropdownData: [{}],
  });

  useEffect(() => {
    dispatch(fetchRoles(authorization));
  }, [authorization]);

  useEffect(() => {
    const oaRole = oaRoles.data.data?.filter(
      (item: any) => item.domainId === props.space._id
    );
    const oaUser = diff(oaRole, oaUsers.data);
    setItems(oaUser);
  }, [oaRoles.data.data]);

  const diff = (arr: any, arr2: any) => {
    const ret: any[] = [];
    arr2?.map((item1: any) => {
      arr?.map((item: any) => {
        if (item1._id.indexOf(item.userId) > -1) {
          ret.push(item1);
        }
      });
    });
    return ret;
  };

  useEffect(() => {
    let list: any[] = [];
    oaUsers.data?.map((item: any) => {
      list.push({ key: item._id, value: item.email });
    });

    const adminList: any[] = [];
    if (items) {
      items.map((item) => adminList.push({ id: item._id }));
    }
    list = list.filter((val) => {
      return !adminList.some((item) => {
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

  return (
    <>
      <div slot="body">
        <div className="autocomplete-users space-bottom-2">
          <OakSelect
            multiple
            value=""
            name="Search by user name"
            autoCompleteVariant="autocomplete"
            handleChange={handleAutoCompleteChange}
            optionsAsKeyValue={data.autoCompleteDropdownData}
          />
        </div>
        <div
          className="space-view space-top-2 space-bottom-4"
          key={oaUsers._id}
        >
          <div className="list-view-header typography-5">
            <div className="label">Email</div>
            <div className="label">Name</div>
          </div>
          {items?.map((item) => (
            <Member
              key={item}
              domainType="space"
              domainId={props.space._id}
              member={item}
              owner={props.space.email}
            />
          ))}
        </div>
      </div>
      <div slot="footer">
        <OakButton
          handleClick={props.toggleVisibilityHandler}
          theme="default"
          variant="appear"
          align="left"
        >
          <Cancel fontSize="small" />
          Close
        </OakButton>
      </div>
    </>
  );
};

export default EditAdministrators;
