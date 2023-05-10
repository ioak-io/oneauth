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
import { CSSVARIABLES_DARK, DASHBOARD_COLOR_SCHEME } from '../service';
import LegendView from './LegendView';
import { formatCurrencyByCompanyDetail } from '../../../components/CurrencyUtils';
import { isEmptyAttributes } from '../../../components/Utils';

interface Props {
  space: string;
  categoryMap: any;
  data?: any;
  title: string;
  colorScheme: any;
}

const CategoryDistribution = (props: Props) => {
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

  useEffect(() => {
    setTimeout(() => {
      if (chart) {
        chart.update();
      } else {
        renderChart();
      }
    }, 250);
  }, [profile.sidebar]);

  useEffect(() => {
    renderChart();
  }, [props.data]);

  const renderChart = () => {
    if (isEmptyAttributes(props.data)) {
      return;
    }
    const el: any = document.getElementById(refId);
    if (el) {
      if (chart) {
        chart.destroy();
      }
      const _chart = new Chart(el, {
        type: 'doughnut',
        data: {
          labels: props.data.label?.map((item: any) => {
            return props.categoryMap[item]?.name || item;
          }),
          datasets: [
            {
              data: props.data.data,
              backgroundColor: props.colorScheme,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '80%',
          plugins: {
            legend: {
              display: false,
              position: 'right',
              labels: {
                padding: 20,
              },
            },
            tooltip: {
              enabled: true,
              borderWidth: 0,
              backgroundColor:
                profile.theme === 'basicui-dark'
                  ? CSSVARIABLES_DARK.SURFACE_DARKER
                  : CSSVARIABLES_DARK.SURFACE,
              bodyColor:
                profile.theme === 'basicui-dark'
                  ? CSSVARIABLES_DARK.I
                  : CSSVARIABLES_DARK.I,
            },
          },
        },
      });
      setChart(_chart);
    }
  };

  return (
    <div className="chart-section">
      <ChartHeader title={props.title} />
      <ChartBody>
        <div className="chart-section-two-column">
          <div className="category-distribution__chart">
            <canvas id={refId} ref={chartRef} />
            {chart && props.data && (
              <div className="category-distribution__chart__center">
                <p>{props.data.totalCount} Spends</p>
                <p>
                  {formatCurrencyByCompanyDetail(props.data.total, company)}
                </p>
              </div>
            )}
          </div>
          <div className="category-distribution__legend">
            {chart && props.data && (
              <LegendView
                data={props.data}
                categoryMap={props.categoryMap}
                space={props.space}
                colorScheme={props.colorScheme}
              />
            )}
          </div>
        </div>
        {!props.data && <div>Loading...</div>}
      </ChartBody>
    </div>
  );
};

export default CategoryDistribution;
