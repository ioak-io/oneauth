import React from 'react';
import './style.scss';

interface Props {
  space: any;
  history: any;
  asset: string;
  from?: string;
}

const SpaceItem = (props: Props) => {
  const oaLogin = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${
      props.space.realm
    }/login/${process.env.REACT_APP_ONEAUTH_APP_ID}?asset=${props.asset}${
      props.from ? `&from=${props.from}` : ''
    }`;
  };
  return (
    <div className="space-list-item align-horizontal" onClick={oaLogin}>
      <div className="space-list-item--link">
        <div className="typography-6 space-horizontal-1">
          {props.space.name}
        </div>
      </div>
      ( <div className="typography-4">{props.space.realm}</div> )
    </div>
  );
};

export default SpaceItem;
