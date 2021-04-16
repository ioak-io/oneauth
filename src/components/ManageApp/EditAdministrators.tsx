import { Cancel, Close } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakSelect from '../../oakui/wc/OakSelect';
import OakTypography from '../../oakui/wc/OakTypography';
// import OakAutoComplete from '../../oakui/OakAutoComplete';
import { updateRoles, fetchRoles } from '../../actions/OaRoleActions';
import OakButton from '../../oakui/wc/OakButton';
import Member from './Member';
import OakSpacing from '../../oakui/wc/OakSpacing';

interface Props {
  app: any;
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
      (item) => item.domainId === props.app._id
    );
    const oaUser = diff(oaRole, oaUsers.data);
    setItems(oaUser);
  }, [oaRoles.data.data]);

  const diff = (arr, arr2) => {
    const ret: any[] = [];
    arr2?.map((item1) => {
      arr?.map((item) => {
        if (item1._id.indexOf(item.userId) > -1) {
          ret.push(item1);
        }
      });
    });
    return ret;
  };

  useEffect(() => {
    let list: any[] = [];
    oaUsers.data?.map((item) => {
      list.push({ id: item._id, value: item.email });
    });

    const adminList: any[] = [];
    if (items) {
      items.map((item) => adminList.push({ id: item._id }));
    }
    list = list.filter((val) => {
      return !adminList.some((item) => {
        return val.id === item.id;
      });
    });
    setData({ autoCompleteDropdownData: list });
  }, [oaUsers.data, items]);

  const handleAutoCompleteChange = (detail: any) => {
    dispatch(
      updateRoles(authorization, {
        type: 'app',
        userId: detail.value,
        domainId: props.app._id,
      })
    );
  };

  return (
    <>
      <div slot="modal-body">
        <div className="autocomplete-users space-bottom-2">
          <OakSelect
            multiple
            value="user name"
            name="Search by user name"
            autoCompleteVariant="autocomplete"
            handleChange={handleAutoCompleteChange}
            optionsAsKeyValue={data.autoCompleteDropdownData}
          />
        </div>
        <div
          className="oaapp-view space-top-2 space-bottom-4"
          key={oaUsers._id}
        >
          <OakSpacing marginHorizontal={9}>
            <OakTypography variant="caption">Email</OakTypography>
            <OakTypography variant="caption" align="center">
              Name
            </OakTypography>
          </OakSpacing>
          {items?.map((item) => (
            <Member
              member={item}
              domainId={props.app._id}
              domainType="app"
              key={item._id}
              owner={props.app.createdBy}
            />
          ))}
        </div>
      </div>
      <div className="modal-footer">
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
