import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  category: any;
  handleClick: any;
  active?: boolean;
}

const CategoryChip = (props: Props) => {
  const handleClick = () => {
    props.handleClick(props.category);
  };

  return (
    <button
      className={`button category-chip ${
        props.active ? 'category-chip--active' : 'category-chip--inactive'
      }`}
      onClick={handleClick}
    >
      {props.category.name}
    </button>
  );
};

export default CategoryChip;
