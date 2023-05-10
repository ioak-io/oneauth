import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Chart, ArcElement, DoughnutController, Legend } from 'chart.js';
import './style.scss';
// import Chart from 'chart.js';
// import { Chart as ChartJS } from 'chart.js';
import { newId } from '../../../events/MessageService';

interface Props {
  title: string;
}

const ChartHeader = (props: Props) => {
  return (
    <div className="chart-header">
      <div className="chart-header__left">{props.title}</div>
    </div>
  );
};

export default ChartHeader;
