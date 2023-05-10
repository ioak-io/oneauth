import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'basicui';
import CategoryChip from '../CategoryChip';

import './CategorySelection.scss';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  categoryId: string;
  handleChange: any;
  error: boolean;
}

const CategorySelection = (props: Props) => {
  const categories = useSelector((state: any) => state.incomeCategory.items);
  const [searchText, setSearchText] = useState('');
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setCategoriesFiltered(categories);
    } else {
      setCategoriesFiltered(
        categories.filter((category: any) =>
          category.name.toLowerCase().includes(searchText)
        )
      );
    }
  }, [categories, searchText]);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const handleCategoryChange = (category: any) => {
    props.handleChange(category._id);
  };

  return (
    <div className="category-selection">
      <label>Category</label>
      {categories && categories.length > 10 && (
        <div className="category-selection__search">
          <Input
            name="searchText"
            value={searchText}
            onInput={handleChange}
            placeholder="Search category"
          />
        </div>
      )}
      <div className="category-selection__list">
        {categoriesFiltered &&
          categoriesFiltered.map((category: any) => (
            <CategoryChip
              key={category._id}
              category={category}
              handleClick={handleCategoryChange}
              active={props.categoryId === category._id}
            />
          ))}
      </div>
      {props.error && <div className="error">Choose category</div>}
    </div>
  );
};

export default CategorySelection;
