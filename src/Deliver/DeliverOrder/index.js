import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';
/* --------------------------------------- */
import { useGeo } from '../../Context/GeoLocationProvider';
/* --------------------------------------- */
const siteName = '35.221.208.241';
function DeliverOrder() {
  const navi = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [total, setTotal] = useState([]);
  const [deliverPosition, setDeliverPosition] = useState(
    '25.03086247511344, 121.53130788356066'
  );
  const [addmap, setAppmap] = useState();
  const [delivertake, setDelivertake] = useState();
  // const ordersid = localStorage.getItem('order_sid');

  async function getOrder() {
    const ordersid = localStorage.getItem('order_sid');
    const response = await axios.get(
      `http://${siteName}:3001/deliver/deliverorder/${ordersid}`
    );
    setOrderData(response.data.rows);
    setFoodData(response.data.food);
    setTotal(response.data.total);
    setDelivertake(JSON.parse(localStorage.getItem('delivertake')));
    console.log(response.data);
  }
  /* -----------------距離用---------------------- */
  const { calculateDistance } = useGeo();

  const checkMyLocation = async () => {
    //獲得現在位置 然後傳到裡面的函式
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location.coords);
      console.log(`${location.coords.latitude}, ${location.coords.longitude}`);
      const deliverself = `${location.coords.latitude}, ${location.coords.longitude}`;
      setDeliverPosition(deliverself);
    });
  };

  const map = async () => {
    // 計算("店家地址","送達地址")間的直線距離
    console.log(orderData[0].address);
    const gettedDistance = await calculateDistance(
      orderData[0].address,
      deliverPosition
    );
    const mapapp = gettedDistance.toFixed(1);
    setAppmap(mapapp);
  };

  /* --------------------------------------- */

  useEffect(() => {
    checkMyLocation();
    getOrder();
    map();
  }, [deliverPosition, delivertake]);
  return (
    <>
      <div className="Dttcontext">
        <div className="Dtopcontext">
          <p>取餐資訊</p>
          <p>{delivertake ? null : addmap + ' km'}</p>
        </div>
        {orderData.map((ddate, i) => {
          return (
            <div className="Dinfo1" key={i}>
              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-regular fa-user"></i>
                  </div>
                  <div>
                    <p>{ddate.name}</p>
                    <p className="Dcontext">{ddate.receive_address}</p>
                  </div>
                </div>
              </div>
              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-store"></i>
                  </div>
                  <div>
                    <p>{ddate.shopname}</p>
                    <p className="Dcontext">{ddate.address}</p>
                  </div>
                </div>
                {/* <i className="Dsimgicon fa-solid fa-phone-flip"></i> */}
              </div>

              <div className="Dinfodata">
                <div className="Dinfotext1">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-utensils"></i>
                  </div>
                  <div className="Dofoodlist">
                    {foodData.map((v, i) => {
                      return (
                        <div className="Dofoodlist" key={i}>
                          <div className="Dofoodcontext">
                            <p>
                              {v.amount}X {v.name}
                            </p>
                            <p>NT$ {v.product_price}</p>
                          </div>
                          {v.detail.length === 0 ? null : (
                            <div className="Dofooddateil">
                              {v.detail.map((v, i) => {
                                return (
                                  <div className="Dofooddateilline">
                                    <p>{v.options}</p>
                                    <p>NT$ {v.option_price}</p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-box-archive"></i>
                  </div>
                  <div>
                    <p>備註</p>
                    <p className="Dcontext">{ddate.deliver_memo}</p>
                  </div>
                </div>
              </div>
              <div className="Dinfodata">
                <button
                  className="Dbbtn"
                  onClick={() => {
                    navi('/Deliver/DeliverMap'); //還要修正按鈕
                  }}
                >
                  前往地圖
                </button>
              </div>
              <div className="Dfooter">
                {total.map((v, i) => {
                  return <p key={i}>總計金額：{v.total}</p>;
                })}
                <p>外送費用：{ddate.deliver_fee}</p>
              </div>
            </div>
          );
        })}
        <div className="w100p" style={{ height: '80px' }}></div>
      </div>
    </>
  );
}
export default DeliverOrder;
