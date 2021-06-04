import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './styles/OakChartLine.scss';
import Chart from 'chart.js';
import { newId, receiveMessage } from '../events/MessageService';
import { findStepSize } from './ChartUtils';

interface Props {
  title?: string;
  stacked?: boolean;
  type: 'linear' | 'category';
  datasets: any;
  categoryLabels?: string[];
}

const OakChartLine = (props: Props) => {
  const chartRef = useRef(null);
  const [refId, setRefId] = useState(newId());
  const profile = useSelector((state: any) => state.profile);

  useEffect(() => {
    renderChart(findStepSize(props.datasets, props.type, props.stacked));
  }, [props.datasets]);

  const renderChart = (stepSize: number) => {
    const el: any = document.getElementById(refId);
    if (el) {
      new Chart(el, {
        type: 'line',
        data: { datasets: props.datasets },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // Customize chart options,
          title: {
            // display: props.title,
            text: props.title,
          },
          scales: {
            yAxes: [
              {
                stacked: props.stacked,
                gridLines: {
                  color: profile.theme === 'theme_dark' ? '#000' : '#d6e0ea',
                  lineWidth: 0.5,
                },
                ticks: {
                  stepSize,
                  // fontColor: profile.theme === 'theme_dark' ? "#e0e0e0" : "#828282",
                },
              },
            ],
            xAxes: [
              {
                type: props.type,
                labels: props.categoryLabels,
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    }
  };

  return (
    <div className="oak-chart-line">
      <canvas
        id={refId}
        ref={chartRef}
        // height={height}
        // width={width}
      />
    </div>
  );
};

export default OakChartLine;
