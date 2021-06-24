import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoles, fetchRoles } from '../../actions/OaRoleActions';
import OakButton from '../../oakui/wc/OakButton';
import Member from './Member';

interface Props {
  domainId: string;
  domainType: 'app' | 'realm';
}

const AccessControl = (props: Props) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const oaUsers = useSelector((state: any) => state.oaUsers);
  const oaRoles = useSelector((state: any) => state.oaRoles);
  const [roleMap, setRoleMap] = useState<any>({});
  const [data, setData] = useState({
    autoCompleteDropdownData: [{}],
  });

  useEffect(() => {
    dispatch(fetchRoles(authorization));
  }, [authorization]);

  useEffect(() => {
    //   oaUsers.data?.map((item: any) => {
    //     list.push({ key: item._id, value: item.email });
    //   });

    const roleMap: any = {};
    const oaRole = oaRoles.data.data?.filter(
      (item: any) =>
        item.domainId === props.domainId && item.type === props.domainType
    );
    oaRole.forEach((item: any) => {
      if (roleMap[item.userId]) {
        roleMap[item.userId].push(item);
      } else {
        roleMap[item.userId] = [item];
      }
    });
    setRoleMap(roleMap);
  }, [oaRoles.data.data]);

  // useEffect(() => {
  //   let list: any[] = [];
  //   oaUsers.data?.map((item: any) => {
  //     list.push({ key: item._id, value: item.email });
  //   });

  //   const adminList: any[] = [];
  //   if (items) {
  //     items.map((item) => adminList.push({ id: item._id }));
  //   }
  //   list = list.filter((val) => {
  //     return !adminList.some((item) => {
  //       return val.key === item.id;
  //     });
  //   });
  //   setData({ autoCompleteDropdownData: list });
  // }, [oaUsers.data, items]);

  const handleAutoCompleteChange = (value: string) => {
    dispatch(
      updateRoles(authorization, {
        type: props.domainType,
        userId: value,
        domainId: props.domainId,
      })
    );
  };

  return (
    <>
      {showAddUser && <div>add user prompt</div>}
      {!showAddUser && (
        <div>
          <div className="autocomplete-users app-bottom-2">
            <OakButton theme="default" handleClick={() => setShowAddUser(true)}>
              Add user
            </OakButton>
          </div>
          <div
            className="realm-view realm-top-2 realm-bottom-4"
            key={oaUsers._id}
          >
            {roleMap &&
              Object.keys(roleMap)?.map((userId) => (
                <Member
                  key={userId}
                  domainType={props.domainType}
                  domainId={props.domainId}
                  userId={userId}
                  roles={roleMap[userId]}
                  rolesMaster={['MEMBER', 'ADMIN']}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AccessControl;
