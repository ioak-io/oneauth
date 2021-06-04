import React from 'react';

interface Props {
  style: object;
  accent: object;
  dimension: object;
}
const IoakIcon = (props: Props) => {
  return (
    <svg viewBox="0 0 73 73" style={props.dimension}>
      <polygon
        fill="#27AAE1"
        points="38.5,-3.8 37.9,-3.8 37.9,-3.8 38.5,-3.8 "
      />
      <g>
        <path
          fill="#149ED9"
          d="M27.6,23c2.6-1.8,5.8-2.9,9.3-2.9c3.4,0,6.6,1.1,9.3,2.9l6.3-7.5c-4.3-3.2-9.7-5.2-15.6-5.2
		c-5.8,0-11.2,1.9-15.6,5.2L27.6,23z"
          style={props.accent}
        />
        <rect x="32" y="37.4" width="9.8" height="25.6" style={props.style} />
        <circle
          fill="none"
          stroke="#000000"
          strokeWidth="9.75"
          strokeMiterlimit="10"
          cx="36.9"
          cy="36.5"
          r="30.9"
          style={{ ...props.style, fill: 'none' }}
        />
        <polygon
          fill="#27AAE1"
          points="37.2,-3.9 36.6,-3.9 36.6,-3.9 37.2,-3.9 	"
        />
        <circle cx="36.9" cy="32.8" r="7.8" style={props.style} />
      </g>
    </svg>
  );
};

export default IoakIcon;
