import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CategoryChip from '../../../CategoryChip';
import './style.scss';
import EditIncomeCategoryCommand from '../../../../events/EditIncomeCategoryCommand';

interface Props {
  space: string;
  location: any;
}

const ManageIncomeCategory = (props: Props) => {
  const [queryParam, setQueryParam] = useState<any>({});
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const categoryList = useSelector((state: any) => state.incomeCategory.items);

  const handleClick = (category: any) => {
    EditIncomeCategoryCommand.next({ open: true, record: category });
  };

  return (
    <div className="manage-income-category">
      <div className="manage-income-category__items">
        {categoryList?.map((category: any) => (
          <CategoryChip
            key={category._id}
            category={category}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageIncomeCategory;
