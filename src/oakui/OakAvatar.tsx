import React, { useEffect } from 'react';
import './styles/oak-avatar.scss';

interface Props {
  showName?: boolean;
  size?: string;
  firstName?: string;
  lastName?: string;
}
const OakAvatar = (props: Props) => {
  return (
    <div className="oak-avatar">
      {/* <AvatarImage
      v-if="user.avatar"
      v-bind:reference="user.avatar"
      v-bind:size="size"
    /> */}
      <div
        className={`${props.size ? props.size : ''} avatar-icon typography-6`}
      >
        {`${props.firstName?.substring(0, 1)}${props.lastName?.substring(
          0,
          1
        )}`}
      </div>
      {props.showName && <div className="avatar-name">{props.firstName}</div>}
    </div>
  );
};

export default OakAvatar;
