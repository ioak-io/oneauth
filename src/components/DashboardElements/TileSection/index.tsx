import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Chart, ArcElement, DoughnutController, Legend } from 'chart.js';
import * as _ from 'lodash';
import './style.scss';
// import Chart from 'chart.js';
// import { Chart as ChartJS } from 'chart.js';
import { newId } from '../../../events/MessageService';
import ChartHeader from '../ChartHeader';
import ChartBody from '../ChartBody';
import StatisticsPayloadModel from '../../../model/StatisticsPayloadModel';
import { DASHBOARD_COLOR_SCHEME } from '../service';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import { isEmptyAttributes } from '../../../components/Utils';
import ItemView from './ItemView';

interface Props {
  space: string;
  categoryMap: any;
  data: any;
  title: string;
}

const TileSection = (props: Props) => {
  const chartRef = useRef(null);
  const [refId, setRefId] = useState(newId());
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const [chart, setChart] = useState<any>(null);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  return (
    <div className="tile-section">
      <ChartHeader title={props.title} />
      <ChartBody>
        {props.data && (
          <div className="tile-section__main">
            {props.data.map((item: any, index: number) => (
              <div
                className={`tile-section__main__item tile-section__main__item--${
                  index + 1
                }`}
              >
                <ItemView
                  space={props.space}
                  title={item.label}
                  value={item.data}
                  percent={item.percent}
                />
              </div>
            ))}
          </div>
        )}
        {!props.data && <div>Loading...</div>}
      </ChartBody>
    </div>
  );
};

export default TileSection;
