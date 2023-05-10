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

import './ListReceipt.scss';
import {
  fetchAndAppendReceiptItems,
  fetchAndSetReceiptItems,
} from '../../../store/actions/ReceiptActions';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import TableHeader from '../../../components/TableHeader';

interface Props {
  space: string;
  data?: any;
}

const ListReceipt = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const categories = useSelector((state: any) => state.category.categories);
  const receiptState: any = useSelector((state: any) => state.receipt);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [sortPref, setSortPref] = useState<any>({
    sortBy: receiptState?.pagination?.sortBy,
    sortOrder: receiptState?.pagination?.sortOrder,
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
      receiptState?.pagination &&
      (receiptState?.pagination?.sortBy !== sortPref.sortBy ||
        receiptState?.pagination?.sortOrder !== sortPref.sortOrder)
    ) {
      dispatch(
        fetchAndSetReceiptItems(props.space, authorization, {
          ...receiptState.filter,
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
    if (receiptState.items.length > checkedRecords.length) {
      receiptState.items.forEach((item: any) => {
        _checkedRecords.push(item._id);
      });
    }
    setCheckedRecords(_checkedRecords);
  };

  const openAddReceipt = () => {
    navigate(`/${props.space}/receipt/edit`);
  };

  const openRecord = (record: any) => {
    navigate(`/${props.space}/receipt/edit?id=${record._id}`);
  };

  const loadMore = () => {
    dispatch(
      fetchAndAppendReceiptItems(props.space, authorization, {
        ...receiptState.filter,
        pagination: { ...receiptState.pagination },
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
      <div className="list-receipt__action">
        <div className="list-receipt__action__left" />
        <div className="list-receipt__action__right">
          {checkedRecords.length > 0 && (
            <Button
              onClick={() => { }}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete ({checkedRecords.length}
              )
            </Button>
          )}
          <Button
            onClick={openAddReceipt}
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
      <div className="content-section list-receipt">
        <table className="basicui-table table-hover table-small">
          <thead>
            <tr>
              <th className="list-receipt__column list-receipt__column--selection">
                <Checkbox
                  id=""
                  name="check"
                  value={checkedRecords.length === receiptState.items.length}
                  onInput={toggleAll}
                />
              </th>
              <th className="list-receipt__column">
                <TableHeader
                  name="billDate"
                  label="Date"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-receipt__column">
                <TableHeader
                  name="number"
                  label="Receipt Number"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-receipt__column">
                <TableHeader
                  name="description"
                  label="Description"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="list-receipt__column">
                <TableHeader
                  name="total"
                  label="Amount"
                  sortPref={sortPref}
                  handleChange={handleSortChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {receiptState.items.map((record: any) => (
              <tr key={record._id}>
                <td className="list-receipt__column list-receipt__column--selection">
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
                  className="list-receipt__column"
                  onClick={() => openRecord(record)}
                >
                  {format(new Date(record.billDate), 'yyyy-MM-dd')}
                </td>
                <td onClick={() => openRecord(record)}>
                  {record.number || '-'}
                </td>
                <td
                  className="list-receipt__column list-receipt__column--description"
                  onClick={() => openRecord(record)}
                >
                  {record.description || '-'}
                </td>
                <td
                  className="list-receipt__column"
                  onClick={() => openRecord(record)}
                >
                  {formatCurrencyByCompanyDetail(record.total, company)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {receiptState.pagination.hasMore && (
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

export default ListReceipt;
