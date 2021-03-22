import React from 'react';
import BouncingDots from './BouncingDots';
import ChasingDots from './ChasingDots';
import CheckerGrid from './CheckerGrid';
import CircleZoom from './CircleZoom';
import CirclingAndBouncingDots from './CirclingAndBouncingDots';
import CirclingDots from './CirclingDots';
import DoubleBounce from './DoubleBounce';
import FoldingCube from './FoldingCube';
import MovingDots from './MovingDots';
import Overlay from './Overlay';
import RotatingPlane from './RotatingPlane';
import ShiftingCube from './ShiftingCube';
import StretchingBars from './StretchingBars';
import './style.scss';
import TwinDots from './TwinDots';

interface Props {
  style?:
    | 'moving-dots'
    | 'chasing-dots'
    | 'double-bounce'
    | 'shifting-cube'
    | 'circle-zoom'
    | 'twin-dots'
    | 'bouncing-dots'
    | 'rotating-plane'
    | 'stretching-bars'
    | 'circling-dots'
    | 'circling-and-bouncing-dots'
    | 'checker-grid'
    | 'folding-cube';
}

const OakSpinner = (props: Props) => {
  return (
    <div className="oak-spinner">
      <Overlay />
      {props.style === 'moving-dots' && <MovingDots />}
      {props.style === 'chasing-dots' && <ChasingDots />}
      {props.style === 'double-bounce' && <DoubleBounce />}
      {props.style === 'shifting-cube' && <ShiftingCube />}
      {props.style === 'circle-zoom' && <CircleZoom />}
      {props.style === 'twin-dots' && <TwinDots />}
      {props.style === 'bouncing-dots' && <BouncingDots />}
      {props.style === 'rotating-plane' && <RotatingPlane />}
      {props.style === 'stretching-bars' && <StretchingBars />}
      {props.style === 'circling-and-bouncing-dots' && (
        <CirclingAndBouncingDots />
      )}
      {props.style === 'circling-dots' && <CirclingDots />}
      {props.style === 'checker-grid' && <CheckerGrid />}
      {props.style === 'folding-cube' && <FoldingCube />}
    </div>
  );
};

export default OakSpinner;
