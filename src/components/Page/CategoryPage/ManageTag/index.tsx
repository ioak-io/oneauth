import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import EditTagCommand from '../../../../events/EditTagCommand';
import EditCategoryCommand from '../../../../events/EditCategoryCommand';
import { newId } from '../../../../events/MessageService';
import TagChip from '../../../TagChip';
import './style.scss';

interface Props {
  space: string;
  location: any;
}

const ManageTag = (props: Props) => {
  const tagList = useSelector((state: any) => state.tag.items);

  const handleClick = (category: any) => {
    EditTagCommand.next({ open: true, record: category });
  };

  return (
    <div className="manage-tag">
      {tagList?.map((tag: any) => (
        <TagChip key={tag._id} tag={tag} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default ManageTag;
