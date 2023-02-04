import { useState, useEffect, Component } from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import './deliverMessager.css';

function DeliverStatistics() {
  const siteName = '35.221.208.241';
  const [shopData, setShopData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [orderSales, setOrderSales] = useState([]);
  const [optionsState, setOptionState] = useState('A');

  const getData = async () => {
    const sid = localStorage.getItem('deliver_sid');
    console.log(sid);

    const result = await axios.get(
      `http://${siteName}:3001/deliverMessager/${sid}`
    );
    // const sid = result.data.map((data) => data.sid);
    // console.log(sid);

    console.log(result.data);
    setShopData(result.data.map((data) => data.order_time));
    setSalesData(result.data.map((data) => data.deliver_fee));
    setOrderSales(result.data.map((data) => data.order_count));

    console.log(sid);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setOptionState(value);
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    //X軸(變量)
    labels: shopData,
    datasets: [
      {
        label: '7天內外送員每日外送費總計',
        //Y軸(數據)
        data: salesData,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const data2 = {
    //X軸(變量)
    labels: shopData,
    datasets: [
      {
        label: '7天內外送員已完成訂單數量',
        //Y軸(數據)
        data: orderSales,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'cyan',
          'purple',
        ],
      },
    ],
  };

  return (
    <>
      <div>
        <select
          value={optionsState}
          onChange={handleChange}
          className="deliver_chart_select"
        >
          <option value="A">七日內外送費總計</option>
          <option value="B">七日內訂單量總計</option>
        </select>
        {optionsState === 'A' ? <Line data={data} /> : <Bar data={data2} />}
      </div>
    </>
  );
}
export default DeliverStatistics;
