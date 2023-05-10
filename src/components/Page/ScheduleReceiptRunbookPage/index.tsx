import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'basicui';
import './style.scss';

import { newId } from '../../../events/MessageService';
import { isEmptyAttributes, isEmptyOrSpaces } from '../../../components/Utils';
import Topbar from '../../../components/Topbar';
import ScheduleReceiptModel from '../../../model/ScheduleReceiptModel';
import { getReceiptById } from '../EditScheduleReceiptPage/service';
import Details from './Details';
import RunLog from './RunLog';
import { getLog } from './service';

interface Props {
  space: string;
  location: any;
}

const ScheduleReceiptRunbookPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState<ScheduleReceiptModel | null>();
  const [logData, setLogData] = useState<any[]>([]);
  const [formId, setFormId] = useState(newId());
  const [errorInItemList, setErrorInItemList] = useState<boolean[]>([]);
  const [errorInReceiptDetails, setErrorInReceiptDetails] =
    useState<boolean>(false);


  useEffect(() => {
    if (searchParams.has("id") && authorization.isAuth) {
      getReceiptById(props.space, searchParams.get("id") || '', authorization).then(
        (response: any) => {
          if (!isEmptyAttributes(response)) {
            setData(response);
          }
        }
      );
    }
  }, [searchParams, authorization]);

  useEffect(() => {
    if (authorization.isAuth && data?._id) {
      getLog(props.space, data._id, authorization).then((response: any) => {
        setLogData([...response]);
      });
    }
  }, [authorization, data]);

  const handleDataChange = (_logData: any[]) => {
    console.log(_logData);
    setLogData(_logData);
  };

  const goBack = () => {
    navigate(-1)
  };

  const goToEditSchedule = () => {
    navigate(`/${props.space}/schedule/receipt/edit?id=${searchParams.get("id")}`);
  };

  return (
    <div className="schedule-receipt-runbook-page">
      <Topbar title={data ? `${data.name} - Runbook` : ''}>
        <Button onClick={goToEditSchedule}>Edit schedule</Button>
      </Topbar>
      <div className="main-section schedule-receipt-runbook-page__main">
        <div className="schedule-receipt-runbook-page__main__section page-width content-section">
          {data && (
            <Details
              receipt={data}
              space={props.space}
              handleDataChange={handleDataChange}
            />
          )}
        </div>
        <div className="schedule-receipt-runbook-page__main__section page-width content-section">
          {data && <RunLog space={props.space} data={logData} />}
        </div>
      </div>
    </div>
  );
};

export default ScheduleReceiptRunbookPage;
