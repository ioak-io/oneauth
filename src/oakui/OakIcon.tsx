import React from 'react';
import './styles/oak-icon.scss';
import SendIcon from './icons/SendIcon';
import IoakIcon from './icons/IoakIcon';

interface Props {
  // pass either mat or svg or fa
  // mat for material icon names
  mat?: string;
  // svg for custom svg icon names
  svg?: string;
  fa?: string;
  size?: string;
  color?: string; // theme names and actual color codes or names or variables
  accent?: string;
}
const OakIcon = (props: Props) => {
  const getStyle = colorVar => {
    const style: any = {};
    let chosenColor = '';
    switch (colorVar) {
      case 'primary':
        chosenColor = 'var(--color-primary-1)';
        break;
      case 'secondary':
        chosenColor = 'var(--color-secondary-1)';
        break;
      case 'tertiary':
        chosenColor = 'var(--color-tertiary-1)';
        break;
      case 'success':
        chosenColor = 'var(--color-success)';
        break;
      case 'failure':
        chosenColor = 'var(--color-failure)';
        break;
      case 'warning':
        chosenColor = 'var(--color-warning)';
        break;
      default:
        chosenColor = colorVar || 'var(--color-foreground-1)';
    }
    style.fill = chosenColor;
    style.color = chosenColor;
    style.stroke = chosenColor;
    return style;
  };
  const getDimension = () => {
    const dimension: any = {};
    dimension.fontSize = props.size ? props.size : '24px';
    if (props.svg) {
      dimension.height = props.size ? props.size : '24px';
      dimension.width = 'auto';
    }
    return dimension;
  };
  return (
    <div className="oak-icon">
      {props.mat && (
        <i
          className="material-icons"
          style={{ ...getStyle(props.color), ...getDimension() }}
        >
          {props.mat}
        </i>
      )}
      {props.fa && (
        <i
          className={`fontawesome-icons ${props.fa}`}
          style={{ ...getStyle(props.color), ...getDimension() }}
        >
          {props.mat}
        </i>
      )}
      {props.svg && props.svg === 'send' && (
        <SendIcon
          style={getStyle(props.color)}
          accent={props.accent && getStyle(props.accent)}
          dimension={getDimension()}
        />
      )}
      {props.svg && props.svg === 'ioak' && (
        <IoakIcon
          style={getStyle(props.color)}
          accent={props.accent && getStyle(props.accent)}
          dimension={getDimension()}
        />
      )}
    </div>
  );
};

export default OakIcon;
