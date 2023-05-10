import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TagSelection.scss';
import { isEmptyOrSpaces } from '../Utils';
import TagChip from '../../components/TagChip';

interface Props {
  tagIdList: string[];
  handleChange: any;
}

const TagSelection = (props: Props) => {
  const tags = useSelector((state: any) => state.tag.items);
  const [searchText, setSearchText] = useState('');
  const [tagsFiltered, setTagsFiltered] = useState([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setTagsFiltered(tags);
    } else {
      setTagsFiltered(
        tags.filter((tag: any) => tag.name.toLowerCase().includes(searchText))
      );
    }
  }, [tags, searchText]);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const handleTagChange = (tag: any) => {
    if (props.tagIdList?.includes(tag._id)) {
      props.handleChange(props.tagIdList?.filter((item) => item !== tag._id));
    } else {
      props.handleChange([...(props.tagIdList || []), tag._id]);
    }
  };

  return (
    <div className="tag-selection-filter">
      <label>Tag</label>
      <div className="tag-selection-filter__list">
        {tagsFiltered &&
          tagsFiltered.map((tag: any) => (
            <TagChip
              key={tag._id}
              tag={tag}
              handleClick={handleTagChange}
              active={props.tagIdList.includes(tag._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default TagSelection;
