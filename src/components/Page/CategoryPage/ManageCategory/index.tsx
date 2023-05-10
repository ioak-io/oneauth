import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CategoryChip from '../../../CategoryChip';
import './style.scss';
import EditCategoryCommand from '../../../../events/EditCategoryCommand';

interface Props {
  space: string;
  location: any;
}

const ManageCategory = (props: Props) => {
  const [queryParam, setQueryParam] = useState<any>({});
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const categoryList = useSelector((state: any) => state.category.categories);
  const [categoryKakeiboMap, setCategoryKakeiboMap] = useState<any>({});

  useEffect(() => {
    if (categoryList?.length > 0) {
      const _categoryKakeiboMap: any = {};
      categoryList.forEach((item: any) => {
        if (_categoryKakeiboMap[item.kakeibo]) {
          _categoryKakeiboMap[item.kakeibo].push(item);
        } else {
          _categoryKakeiboMap[item.kakeibo] = [item];
        }
      });

      setCategoryKakeiboMap(_categoryKakeiboMap);
    }
  }, [categoryList]);

  const handleClick = (category: any) => {
    EditCategoryCommand.next({ open: true, record: category });
  };

  return (
    <div className="manage-category">
      {Object.keys(categoryKakeiboMap).map((kakeibo: any) => (
        <div key={kakeibo}>
          <div className="manage-category__kakeibo">{kakeibo}</div>
          <div className="manage-category__items">
            {categoryKakeiboMap[kakeibo]?.map((category: any) => (
              <CategoryChip
                key={category._id}
                category={category}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCategory;
