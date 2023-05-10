import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Chart, ArcElement, DoughnutController, Legend } from 'chart.js';
import * as _ from 'lodash';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import './style.scss';
// import Chart from 'chart.js';
// import { Chart as ChartJS } from 'chart.js';
import { newId } from '../../../events/MessageService';
import ChartHeader from '../ChartHeader';
import ChartBody from '../ChartBody';
import StatisticsPayloadModel from '../../../model/StatisticsPayloadModel';
import {
  DASHBOARD_COLOR_SCHEME,
  CSSVARIABLES_DARK,
  CSSVARIABLES_LIGHT,
  DASHBOARD_EXPENSE_CHANGE_COLOR_SCHEME,
  DASHBOARD_WEEKLY_COLOR_SCHEME,
} from '../service';
import { isEmptyAttributes } from '../../../components/Utils';

interface Props {
  space: string;
  criteria: StatisticsPayloadModel;
  data: any;
}

const WeeklyTrend = (props: Props) => {
  const chartRef = useRef(null);
  const [refId, setRefId] = useState(newId());
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const [chart, setChart] = useState<any>(null);
  const [cssVariable, setCssVariable] = useState<any>(CSSVARIABLES_DARK);
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
    setCssVariable(
      profile.theme === 'basicui-dark' ? CSSVARIABLES_DARK : CSSVARIABLES_LIGHT
    );
  }, [profile.sidebar, profile.theme]);

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
      // const config: any = {
      //   fill: false,
      //   tension: 0.5,
      //   borderJoinStyle: 'round',
      //   borderWidth: 2,
      //   // pointBorderWidth: 3,
      //   // pointHoverBorderWidth: 3,
      //   pointRadius: 5,
      //   pointHoverRadius: 5,
      //   pointBorderColor: cssVariable.SURFACE,
      //   pointHoverBorderColor: cssVariable.SURFACE,
      // };
      const config: any = {
        fill: false,
        tension: 0.5,
        borderJoinStyle: 'round',
        borderWidth: 1,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        pointRadius: 2,
        pointHoverRadius: 2,
        pointBorderColor: cssVariable.SURFACE,
        pointHoverBorderColor: cssVariable.SURFACE,
      };
      const _chart = new Chart(el, {
        type: 'bar',
        data: {
          labels: props.data.label,
          datasets: [
            {
              ...config,
              label: 'Amount',
              data: props.data.average,
              backgroundColor: DASHBOARD_COLOR_SCHEME[4],
              borderWidth: 0,
            },
            // {
            //   ...config,
            //   label: 'Number of spends',
            //   data: props.data.count,
            //   backgroundColor: DASHBOARD_EXPENSE_CHANGE_COLOR_SCHEME[1],
            //   borderWidth: 0,
            // },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              type: 'category',
              grid: {
                display: true,
                drawOnChartArea: false,
                drawTicks: true,
              },
            },
            y: {
              grid: {
                display: true,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: false,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            tooltip: {
              enabled: true,
              mode: 'x',
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
      <ChartHeader title="Average weekly spend" />
      <ChartBody>
        <div className="chart-section-one-column">
          <div className="budget-trend__chart">
            <canvas id={refId} ref={chartRef} />
            {/* {chart && (
              <div className="monthly-trend__chart__center">
                <p>{summary.count} Spends</p>
                <p>{formatCurrencyByCompanyDetail(summary.data, company)}</p>
              </div>
            )} */}
          </div>
          {/* <div className="monthly-trend__legend">legend</div> */}
        </div>
      </ChartBody>
    </div>
  );
};

export default WeeklyTrend;
