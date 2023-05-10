import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Chart, ArcElement, DoughnutController, Legend } from 'chart.js';
import './style.scss';

interface Props {
  children: any;
}

const ChartBody = (props: Props) => {
  return <div className="chart-body">{props.children}</div>;
};

export default ChartBody;
