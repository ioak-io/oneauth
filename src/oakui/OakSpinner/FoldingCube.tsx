import React from 'react';
import './FoldingCube.scss';

const FoldingCube = () => {
  return (
    <div className="folding-cube">
      <div className="folding-cube--child folding-cube--1" />
      <div className="folding-cube--child folding-cube--2" />
      <div className="folding-cube--child folding-cube--4" />
      <div className="folding-cube--child folding-cube--3" />
    </div>
  );
};

export default FoldingCube;
