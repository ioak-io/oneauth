import React from 'react';
import './styles/oak-icon.scss';

interface Props {
  icon: string;
  size?: string;
}
const OakIcon = (props: Props) => {
  const getStyle = () => {
    return {
      fontSize: `${props.size}px`,
    };
  };
  return (
    <div className="oak-icon">
      <i className="material-icons" style={getStyle()}>
        vpn_key
      </i>
    </div>
  );
};

export default OakIcon;
