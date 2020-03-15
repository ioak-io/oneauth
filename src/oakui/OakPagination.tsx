import React, { useState, useEffect } from 'react';
import './styles/oak-pagination.scss';
import OakSelect from './OakSelect';

interface Props {
  onChangePage: any;
  totalRows: number;
  label?: string;
}

const OakPagination = (props: Props) => {
  const [data, setData] = useState({
    rowsPerPage: 6,
    pageNo: 1,
  });

  useEffect(() => {
    pageChanged();
  }, [data]);

  const previousPage = () => {
    if (data.pageNo !== 1) {
      setData({ ...data, pageNo: data.pageNo - 1 });
    }
  };

  const pageChanged = () => {
    props.onChangePage(data.pageNo, data.rowsPerPage);
  };

  const nextPage = () => {
    if (Math.ceil(props.totalRows / data.rowsPerPage) !== data.pageNo) {
      setData({ ...data, pageNo: data.pageNo + 1 });
    }
  };

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className="oak-pagination">
      <div className="space-right-3">
        {props.label ? props.label : 'Rows per page'}
      </div>
      <div className="space-right-3">
        <OakSelect
          data={data}
          id="rowsPerPage"
          handleChange={e => handleChange(e)}
          elements={['6', '10', '20', '50']}
        />
      </div>
      <div className="page-number space-right-3">
        <div>
          {(data.pageNo - 1) * data.rowsPerPage + 1}-{' '}
          {data.pageNo * data.rowsPerPage < props.totalRows
            ? data.pageNo * data.rowsPerPage
            : props.totalRows}
          &nbsp;of&nbsp; {props.totalRows}{' '}
        </div>
      </div>
      <div className="page-nav">
        <div className="space-right-2">
          <i
            data-test="action-page-previous"
            className={
              data.pageNo === 1 ? 'material-icons disabled' : 'material-icons'
            }
            onClick={previousPage}
          >
            keyboard_arrow_left
          </i>
        </div>
        <div>
          <i
            data-test="action-page-next"
            className={
              Math.ceil(props.totalRows / data.rowsPerPage) === data.pageNo
                ? 'material-icons disabled'
                : 'material-icons'
            }
            onClick={nextPage}
          >
            keyboard_arrow_right
          </i>
        </div>
      </div>
    </div>
  );
};

export default OakPagination;
