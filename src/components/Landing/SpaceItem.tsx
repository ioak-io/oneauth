import React from 'react';
import './style.scss';

interface Props {
  space: any;
  history: any;
}

const SpaceItem = (props: Props) => {
  const goToSpacePage = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${props.space.spaceId}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };
  return (
    <div className="space-list-item" onClick={goToSpacePage}>
      <div className="space-list-item--link">
        <div className="typography-6">{props.space.name}</div>
      </div>
      <div className="typography-4">{props.space.description}</div>
    </div>
  );
};

export default SpaceItem;
