import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakInput from '../../oakui/wc/OakInput';

import './KakeiboSelection.scss';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  kakeiboList: string[];
  handleChange: any;
}

const KakeiboSelection = (props: Props) => {
  const categories = ['Needs', 'Wants', 'Culture', 'Unexpected'];
  const [searchText, setSearchText] = useState('');
  const [categoriesFiltered, setCategoriesFiltered] = useState<any>([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setCategoriesFiltered([...categories]);
    } else {
      setCategoriesFiltered(
        categories.filter((category: any) =>
          category.name.toLowerCase().includes(searchText)
        )
      );
    }
  }, [searchText]);

  const handleChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const handleCategoryChange = (category: any) => {
    if (props.kakeiboList.includes(category)) {
      props.handleChange(props.kakeiboList.filter((item) => item !== category));
    } else {
      props.handleChange([...props.kakeiboList, category]);
    }
  };

  return (
    <div className="kakeibo-selection-filter">
      <label>Kakeibo quadrant</label>
      <div className="kakeibo-selection-filter__list">
        {categoriesFiltered &&
          categoriesFiltered.map((category: any) => (
            <button
              key={category}
              className={`kakeibo-selection-filter__list__chip ${
                props.kakeiboList.includes(category)
                  ? 'kakeibo-selection-filter__list__chip--selected'
                  : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default KakeiboSelection;
