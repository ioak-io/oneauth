import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { newId } from '../../events/MessageService';
// import AddTagCommand from '../../../../events/AddTagCommand';

interface Props {
  tag: any;
  active?: boolean;
  handleClick: any;
}

const TagChip = (props: Props) => {
  const handleClick = () => {
    props.handleClick(props.tag);
  };

  return (
    <button
      className={`button tag-chip ${
        props.active ? 'tag-chip--active' : 'tag-chip--inactive'
      }`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faTag} />
      {props.tag.name}
    </button>
  );
};

export default TagChip;
