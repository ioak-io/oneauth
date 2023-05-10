import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'basicui';

import './TagSelection.scss';
import { isEmptyOrSpaces } from '../Utils';
import TagChip from '../TagChip';

interface Props {
  tagId: string[];
  addTag: any;
  removeTag: any;
}

const TagSelection = (props: Props) => {
  const tags = useSelector((state: any) => state.tag.items);
  const [searchText, setSearchText] = useState('');
  const [tagsFiltered, setCategoriesFiltered] = useState([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setCategoriesFiltered(tags);
    } else {
      setCategoriesFiltered(
        tags.filter((tag: any) => tag.name.toLowerCase().includes(searchText))
      );
    }
  }, [tags, searchText]);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const handleTagChange = (tag: any) => {
    if (props.tagId?.includes(tag._id)) {
      props.removeTag(tag._id);
    } else {
      props.addTag(tag._id);
    }
  };

  return (
    <div className="tag-selection">
      <label>Tag</label>
      {tags && tags.length > 10 && (
        <div className="tag-selection__search">
          <Input
            name="searchText"
            value={searchText}
            onInput={handleChange}
            placeholder="Search tag"
          />
        </div>
      )}
      <div className="tag-selection__list">
        {tagsFiltered &&
          tagsFiltered.map((tag: any) => (
            <TagChip
              key={tag._id}
              tag={tag}
              handleClick={handleTagChange}
              active={props.tagId.includes(tag._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default TagSelection;
