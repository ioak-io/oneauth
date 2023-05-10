import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakInput from '../../oakui/wc/OakInput';

import './CategorySelection.scss';
import { isEmptyOrSpaces } from '../Utils';
import CategoryChip from '../../components/CategoryChip';

interface Props {
  categories: any[];
  categoryIdList: string[];
  handleChange: any;
}

const CategorySelection = (props: Props) => {
  const [searchText, setSearchText] = useState('');
  const [categoriesFiltered, setCategoriesFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setCategoriesFiltered(props.categories);
    } else {
      setCategoriesFiltered(
        props.categories.filter((category: any) =>
          category.name.toLowerCase().includes(searchText)
        )
      );
    }
  }, [props.categories, searchText]);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const handleCategoryChange = (category: any) => {
    if (props.categoryIdList.includes(category._id)) {
      props.handleChange(
        props.categoryIdList.filter((item) => item !== category._id)
      );
    } else {
      props.handleChange([...props.categoryIdList, category._id]);
    }
  };

  return (
    <div className="category-selection-filter">
      <label>Category</label>
      <div className="category-selection-filter__list">
        {categoriesFiltered &&
          categoriesFiltered.map((category: any) => (
            <CategoryChip
              key={category._id}
              category={category}
              handleClick={handleCategoryChange}
              active={props.categoryIdList.includes(category._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default CategorySelection;
