import React, { useState, useEffect } from 'react';
import './styles/oak-table.scss';
import OakPagination from './OakPagination';

interface Props {
  header: {
    key: string;
    label: string;
    dtype?: string;
  }[];
  data: any;
  dense?: boolean;
  onChangePage?: any;
  totalRows?: number;
  material?: boolean;
}

const OakTable = (props: Props) => {
  const [data, setData] = useState([]);
  const [paginationPref, setPaginationPref] = useState({
    pageNo: 1,
    rowsPerPage: 6,
    sortField: '',
    sortAsc: true,
  });

  const [headerMap, setHeaderMap] = useState({});

  useEffect(() => {
    setData(props.data);
    const headerMap = {};
    props.header.forEach(element => {
      headerMap[element.key] = element;
    });
    setHeaderMap(headerMap);
  }, []);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    pageChanged();
  }, [paginationPref]);

  const pageChanged = () => {
    if (props.onChangePage) {
      props.onChangePage(
        paginationPref.pageNo,
        paginationPref.rowsPerPage,
        paginationPref.sortField,
        paginationPref.sortAsc
      );
    } else if (paginationPref.sortField) {
      setData(data.sort((a: any, b: any) => compare(a, b)));
    }
  };

  function compare(a: any, b: any): number {
    const { sortField } = paginationPref;
    const { sortAsc } = paginationPref;
    const headerElement = headerMap[sortField];
    if (!headerElement?.dtype || headerElement?.dtype === 'string') {
      if (sortAsc) {
        return a[paginationPref.sortField] > b[paginationPref.sortField]
          ? 1
          : a[paginationPref.sortField] < b[paginationPref.sortField]
          ? -1
          : 0;
      }
      return a[paginationPref.sortField] < b[paginationPref.sortField]
        ? 1
        : a[paginationPref.sortField] > b[paginationPref.sortField]
        ? -1
        : 0;

      // } else if (headerElement.dtype === 'number') {
    }
    if (sortAsc) {
      return a[paginationPref.sortField] - b[paginationPref.sortField] > 0
        ? 1
        : a[paginationPref.sortField] - b[paginationPref.sortField] < 0
        ? -1
        : 0;
    }
    return a[paginationPref.sortField] - b[paginationPref.sortField] < 0
      ? 1
      : a[paginationPref.sortField] - b[paginationPref.sortField] > 0
      ? -1
      : 0;
  }

  const onChangePage = (pageNo: number, rowsPerPage: number) => {
    setPaginationPref({
      ...paginationPref,
      pageNo,
      rowsPerPage,
    });
  };

  const sort = fieldName => {
    setPaginationPref({
      ...paginationPref,
      sortField: fieldName,
      sortAsc:
        paginationPref.sortField === fieldName ? !paginationPref.sortAsc : true,
    });
  };

  const formatDate = dateText => {
    if (!dateText || /^\s*$/.test(dateText)) {
      return '';
    }
    const date = new Date(dateText);
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  let view: any[] = [];
  if (props.data && props.totalRows) {
    view = props.data;
  } else if (props.data && !props.totalRows) {
    view = props.data.slice(
      (paginationPref.pageNo - 1) * paginationPref.rowsPerPage,
      paginationPref.pageNo * paginationPref.rowsPerPage
    );
  }
  let key = 0;

  return (
    <div className={props.material ? 'oak-table material' : 'oak-table'}>
      <div className="desktop-view">
        <div className="table-container">
          <table className={props.dense ? 'dense' : ''}>
            <thead>
              <tr>
                {props.header &&
                  props.header.map(item => (
                    <th key={item.key}>
                      <div className="label" onClick={() => sort(item.key)}>
                        {item.label}
                        {paginationPref.sortField === item.key &&
                          paginationPref.sortAsc && (
                            <i className="material-icons">keyboard_arrow_up</i>
                          )}
                        {paginationPref.sortField === item.key &&
                          !paginationPref.sortAsc && (
                            <i className="material-icons">
                              keyboard_arrow_down
                            </i>
                          )}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {props.data &&
                view.map(row => (
                  <tr key={(key += 1)}>
                    {props.header &&
                      props.header.map(column => (
                        <td
                          key={(key += 1)}
                          className={
                            headerMap[column.key]?.dtype
                              ? headerMap[column.key]?.dtype
                              : ''
                          }
                        >
                          {headerMap[column.key]?.dtype === 'date'
                            ? formatDate(row[column.key])
                            : row[column.key]}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <OakPagination
          onChangePage={onChangePage}
          totalRows={props.totalRows ? props.totalRows : props.data.length}
        />
      </div>

      <div className="mobile-view">
        <div className="card-container">
          {props.data &&
            view.map(row => (
              <div className="card" key={(key += 1)}>
                {props.header &&
                  props.header.map(column => (
                    <div key={(key += 1)}>
                      <b>{column.label}</b>: {row[column.key]}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <OakPagination
          onChangePage={onChangePage}
          totalRows={props.totalRows ? props.totalRows : props.data.length}
          label="Rows"
        />
      </div>
    </div>
  );
};

export default OakTable;
