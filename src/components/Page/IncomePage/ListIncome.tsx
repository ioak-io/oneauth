/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faExpandAlt,
  faFileExport,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Checkbox } from 'basicui';

import './ListIncome.scss';

import {
  fetchAndAppendIncomeItems,
  fetchAndSetIncomeItems,
} from '../../../store/actions/IncomeActions';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import TableHeader from '../../../components/TableHeader';
import EditIncomeCommand from '../../../events/EditIncomeCommand';

interface Props {
  space: string;
  data?: any;
}

const ListIncome = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const categories = useSelector((state: any) => state.incomeCategory.items);
  const incomeState: any = useSelector((state: any) => state.income);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [sortPref, setSortPref] = useState<any>({
    sortBy: incomeState?.pagination?.sortBy,
    sortOrder: incomeState?.pagination?.sortOrder,
  });

  const [denseView, setDenseView] = useState(true);
  // const [data, setData] = useState<any[]>([]);
  const [categoryMap, setCategoryMap] = useState<any>({});

  const [checkedRecords, setCheckedRecords] = useState<any[]>([]);

  useEffect(() => {
    if (categories) {
      const _categoryMap: any = {};
      categories.forEach((category: any) => {
        _categoryMap[category._id] = category;
      });
      setCategoryMap(_categoryMap);
    }
  }, [categories]);

  useEffect(() => {
    if (
      incomeState?.pagination &&
      (incomeState?.pagination?.sortBy !== sortPref.sortBy ||
        incomeState?.pagination?.sortOrder !== sortPref.sortOrder)
    ) {
      dispatch(
        fetchAndSetIncomeItems(props.space, authorization, {
          ...incomeState.filter,
          pagination: { pageNo: 0, pageSize: 20, hasMore: true, ...sortPref },
        })
      );
    }
  }, [sortPref]);

  const toggleCheckedState = (recordId: string) => {
    if (checkedRecords.includes(recordId)) {
      setCheckedRecords(checkedRecords.filter((item) => item !== recordId));
    } else {
      setCheckedRecords([...checkedRecords, recordId]);
    }
  };

  const toggleAll = () => {
    const _checkedRecords: string[] = [];
    if (incomeState.items.length > checkedRecords.length) {
      incomeState.items.forEach((item: any) => {
        _checkedRecords.push(item._id);
      });
    }
    setCheckedRecords(_checkedRecords);
  };

  const openAddIncome = () => {
    EditIncomeCommand.next({ open: true, record: null });
  };

  const openRecord = (record: any) => {
    EditIncomeCommand.next({ open: true, record });
  };

  const loadMore = () => {
    dispatch(
      fetchAndAppendIncomeItems(props.space, authorization, {
        ...incomeState.filter,
        pagination: { ...incomeState.pagination },
      })
    );
  };

  const handleSortChange = (sortBy: string) => {
    let _sortPref = { ...sortPref };
    if (_sortPref.sortBy === sortBy) {
      if (_sortPref.sortOrder === 'descending') {
        _sortPref = {
          sortBy: null,
          sortOrder: null,
        };
      } else {
        _sortPref.sortOrder = 'descending';
      }
    } else {
      _sortPref = {
        sortBy,
        sortOrder: 'ascending',
      };
    }
    setSortPref(_sortPref);
  };

  return (
    <>
      <div className="list-income__action">
        <div className="list-income__action__left" />
        <div className="list-income__action__right">
          {checkedRecords.length > 0 && (
            <Button
              onClick={() => { }}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete ({checkedRecords.length}
              )
            </Button>
          )}
          <Button
            onClick={openAddIncome}
          >
            <FontAwesomeIcon icon={faPlus} /> Item
          </Button>
          <div className="desktop-only">
            <Button
              onClick={() => {
                setDenseView(!denseView);
              }}
            >
              <FontAwesomeIcon icon={denseView ? faExpandAlt : faCompressAlt} />
            </Button>
          </div>
        </div>
      </div>
      <div className="content-section list-income">
        <table className="basicui-table">
          <thead>
            <tr>
              <th className="list-income__column list-income__column--selection">
                <Checkbox
                  id=""
                  name="check"
                  value={checkedRecords.length === incomeState.items.length}
                  onInput={toggleAll}
                />
              </th>
              <th className="list-income__column">
                <TableHeader
                  name="billDate"
                  label="Date"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-income__column">
                <TableHeader
                  name="category"
                  label="Category"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-income__column">
                <TableHeader
                  name="description"
                  label="Description"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-income__column">
                <TableHeader
                  name="amount"
                  label="Amount"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {incomeState.items.map((record: any) => (
              <tr key={record._id}>
                <td className="list-income__column list-income__column--selection">
                  <div>
                    <Checkbox
                    id=""
                      name="check"
                      value={checkedRecords.includes(record._id)}
                      onInput={() => toggleCheckedState(record._id)}
                    />
                  </div>
                </td>
                <td
                  className="list-income__column"
                  onClick={() => openRecord(record)}
                >
                  {format(new Date(record.billDate), 'yyyy-MM-dd')}
                </td>
                <td onClick={() => openRecord(record)}>
                  {categoryMap[record.category]
                    ? categoryMap[record.category].name
                    : ''}
                </td>
                <td
                  className="list-income__column list-income__column--description"
                  onClick={() => openRecord(record)}
                >
                  {record.description}
                </td>
                <td
                  className="list-income__column"
                  onClick={() => openRecord(record)}
                >
                  {formatCurrencyByCompanyDetail(record.amount, company)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {incomeState.pagination.hasMore && (
          <div className="load-more">
            <button className="button load-more__button" onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListIncome;
