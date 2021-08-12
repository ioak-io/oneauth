import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './styles/OakChartBar.scss';
import Chart from 'chart.js';
import { newId, receiveMessage } from '../events/MessageService';
import { findStepSize } from './ChartUtils';

interface Props {
  title?: string;
  stacked?: boolean;
  type: 'category';
  datasets: any;
  categoryLabels?: string[];
}

const OakChartBar = (props: Props) => {
  const chartRef = useRef(null);
  const [refId, setRefId] = useState(newId());
  const profile = useSelector((state: { profile: any }) => state.profile);

  useEffect(() => {
    renderChart(findStepSize(props.datasets, props.type, props.stacked));
  }, [props.datasets]);

  const renderChart = (stepSize: number) => {
    const el: any = document.getElementById(refId);
    if (el) {
      new Chart(el, {
        type: 'bar',
        data: { datasets: props.datasets },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // Customize chart options
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
                },
              },
            ],
            xAxes: [
              {
                stacked: props.stacked,
                type: props.type,
                labels: props.categoryLabels,
                // barThickness: 20,
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
    <div className="oak-chart-bar">
      <canvas
        id={refId}
        ref={chartRef}
        // height={height}
        // width={width}
      />
    </div>
  );
};

export default OakChartBar;
