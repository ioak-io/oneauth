import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  realm: number;
  clientId: string;
}

const UserList = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  return <div className="user-list">table</div>;
};

export default UserList;
