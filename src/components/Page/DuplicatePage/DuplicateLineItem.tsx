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
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Checkbox } from 'basicui';

import './DuplicateLineItem.scss';
import {
  getDuplicateReceipt,
  fixDuplicateReceipt,
  fixDuplicateLineItem,
  getDuplicateLineItem,
} from './service';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import TableHeader from '../../../components/TableHeader';

interface Props {
  space: string;
}

const DuplicateLineItem = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const categories = useSelector((state: any) => state.category.categories);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const [data, setData] = useState<any[]>([]);

  const [paginationPref, setPaginationPref] = useState<any>({
    pageSize: 20,
    pageNo: 0,
    hasMore: true,
    sortBy: '',
    sortOrder: '',
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
    if (authorization.isAuth) {
      getDuplicateLineItem(props.space, authorization, paginationPref).then(
        (response: any) => {
          if (response?.results) {
            setData(response.results);
            setPaginationPref({
              ...paginationPref,
              hasMore: response.hasMore,
              pageNo: response.pageNo,
            });
          }
        }
      );
    }
  }, [authorization]);

  const toggleCheckedState = (index: number) => {
    if (checkedRecords.includes(index)) {
      setCheckedRecords(checkedRecords.filter((item) => item !== index));
    } else {
      setCheckedRecords([...checkedRecords, index]);
    }
  };

  const toggleAll = () => {
    const _checkedRecords: number[] = [];
    if (data.length > checkedRecords.length) {
      data.forEach((item: any, index: number) => {
        _checkedRecords.push(index);
      });
    }
    setCheckedRecords(_checkedRecords);
  };

  const openAddReceipt = () => {
    navigate(`/${props.space}/receipt/edit`);
  };

  const openRecord = (record: any) => {
    // navigate(`/${props.space}/receipt/edit?id=${record._id}`);
  };

  const loadMore = () => {
    if (paginationPref.hasMore) {
      getDuplicateLineItem(props.space, authorization, paginationPref).then(
        (response: any) => {
          if (response?.results) {
            setData([...data, ...response.results]);
            setPaginationPref({
              ...paginationPref,
              hasMore: response.hasMore,
              pageNo: response.pageNo,
            });
          }
        }
      );
    }
  };

  const handleSortChange = (sortBy: string) => {
    let _paginationPref = { ...paginationPref };
    if (_paginationPref.sortBy === sortBy) {
      if (_paginationPref.sortOrder === 'descending') {
        _paginationPref = {
          sortBy: null,
          sortOrder: null,
        };
      } else {
        _paginationPref.sortOrder = 'descending';
      }
    } else {
      _paginationPref = {
        sortBy,
        sortOrder: 'ascending',
      };
    }
    setPaginationPref(_paginationPref);
  };

  const fixDuplicates = () => {
    const payload: any[] = [];
    checkedRecords.forEach((index: number) => {
      payload.push(data[index]);
    });
    fixDuplicateLineItem(props.space, authorization, payload).then(
      (response: any) => {
        const _data = [...data];
        // eslint-disable-next-line no-plusplus
        for (let i = _data.length - 1; i >= 0; i--) {
          if (checkedRecords.includes(i)) {
            _data.splice(i, 1);
          }
        }
        setData(_data);
        setCheckedRecords([]);
      }
    );
  };

  return (
    <>
      <div className="duplicate-receipt__action">
        <div className="duplicate-receipt__action__left page-title">
          Duplicate line items
        </div>
        <div className="duplicate-receipt__action__right">
          {checkedRecords.length > 0 && (
            <Button
              onClick={fixDuplicates}
            >
              <FontAwesomeIcon icon={faWrench} /> Fix ({checkedRecords.length})
            </Button>
          )}
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
      <div className="content-section duplicate-receipt">
        <table className={`basicui-table ${denseView ? 'table-small' : ''}`}>
          <thead>
            <tr>
              <th className="duplicate-receipt__column duplicate-receipt__column--selection">
                <Checkbox
                  id=""
                  name="check"
                  value={
                    checkedRecords.length === data.length && data.length > 0
                  }
                  onInput={toggleAll}
                />
              </th>
              <th className="duplicate-receipt__column">
                <TableHeader
                  name="billDate"
                  label="Date"
                  sortPref={paginationPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="duplicate-receipt__column">
                <TableHeader
                  name="number"
                  label="Category"
                  sortPref={paginationPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="duplicate-receipt__column">
                <TableHeader
                  name="description"
                  label="Description"
                  sortPref={paginationPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="duplicate-receipt__column">
                <TableHeader
                  name="total"
                  label="Amount"
                  sortPref={paginationPref}
                  handleChange={handleSortChange}
                />
              </th>
              <th className="duplicate-receipt__column">
                <TableHeader
                  name="count"
                  label="Count"
                  sortPref={paginationPref}
                  handleChange={handleSortChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((record: any, index: number) => (
              <tr key={record._id}>
                <td className="duplicate-receipt__column duplicate-receipt__column--selection">
                  <div>
                    <Checkbox
                      id=""
                      name="check"
                      value={checkedRecords.includes(index)}
                      onInput={() => toggleCheckedState(index)}
                    />
                  </div>
                </td>
                <td
                  className="duplicate-receipt__column"
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
                  className="duplicate-receipt__column duplicate-receipt__column--description"
                  onClick={() => openRecord(record)}
                >
                  {record.description}
                </td>
                <td
                  className="duplicate-receipt__column"
                  onClick={() => openRecord(record)}
                >
                  {formatCurrencyByCompanyDetail(record.amount, company)}
                </td>
                <td
                  className="duplicate-receipt__column"
                  onClick={() => openRecord(record)}
                >
                  {record.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginationPref.hasMore && (
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

export default DuplicateLineItem;
