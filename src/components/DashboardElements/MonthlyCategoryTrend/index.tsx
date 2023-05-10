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
} from '../service';
import { isEmptyAttributes } from '../../../components/Utils';

interface Props {
  space: string;
  criteria: StatisticsPayloadModel;
  categoryMap: any;
  data: any;
  title: string;
  stacked?: boolean;
  colorScheme: any;
}

const MonthlyCategoryTrend = (props: Props) => {
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
      const _chart = new Chart(el, {
        type: 'bar',
        data: {
          labels: props.data.label,
          datasets: (props.data.category || props.data.kakeibo)?.map(
            (id: string, index: number) => {
              return {
                label:
                  props.categoryMap && props.categoryMap[id]
                    ? props.categoryMap[id].name
                    : 'Unknown',
                data: props.data.data[id],
                backgroundColor: props.colorScheme[index],
                borderWidth: 0,
              };
            }
          ),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              stacked: props.stacked,
              type: 'time',
              time: {
                tooltipFormat: 'MMM yyyy',
                unit: 'month',
                round: 'month',
                displayFormats: {
                  month: 'MMM yy',
                },
              },
              ticks: {
                maxTicksLimit: 5,
              },
              grid: {
                display: true,
                drawOnChartArea: false,
                drawTicks: true,
              },
              adapters: {
                date: {
                  locale: enUS,
                },
              },
            },
            y: {
              stacked: props.stacked,
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
      <ChartHeader title={props.title} />
      <ChartBody>
        <div className="chart-section-one-column">
          <div className="monthly-trend__chart">
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

export default MonthlyCategoryTrend;
