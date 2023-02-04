import { useState, useEffect, Component } from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function StoreSellAnalyze() {
  const siteName = '35.221.208.241';
  const [shopData, setShopData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const getData = async () => {
    const sid = JSON.parse(localStorage.getItem('StoreDatas')).sid;

    const result = await axios.get(
      `http://${siteName}:3001/StoreSellAnalyze/${sid}`
    );
    // const sid = result.data.map((data) => data.sid);
    // console.log(sid);

    console.log(result.data);
    setShopData(result.data.map((data) => data.order_time));
    setSalesData(result.data.map((data) => data.order_total));

    console.log(sid);
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    //X軸(變量)
    labels: shopData,
    datasets: [
      {
        label: '已完成訂單銷售額',
        //Y軸(數據)
        data: salesData,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div>
        <Line data={data} />
      </div>
    </>
  );
}
export default StoreSellAnalyze;
