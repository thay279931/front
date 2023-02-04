import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
/* --------------------------------------- */
import { useGeo } from '../../Context/GeoLocationProvider';
/* --------------------------------------- */
const siteName = '35.221.208.241';

function ListTable({
  receive_address,
  client,
  cook_time,
  member_sid,
  shop_sid,
  sid,
  name,
  address,
  order_sid,
  deliver_memo,
  deliver_fee,
}) {
  const [btn, setBtn] = useState(false);
  const [delivertake, setDelivertake] = useState(true);
  const [addmap, setAppmap] = useState();
  //自己位置
  const [deliverPosition, setDeliverPosition] = useState(
    '25.03086247511344, 121.53130788356066'
  );

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
    const gettedDistance = await calculateDistance(address, deliverPosition);
    const mapapp = gettedDistance.toFixed(1);
    setAppmap(mapapp);
  };

  /* --------------------------------------- */

  const navi = useNavigate();
  /* -----------後端動作--------------------- */
  async function sqlactive() {
    const deliver_sid = Number(localStorage.getItem('deliver_sid'));
    const order_finish = 0; //自動生成0即可
    const ordernum = {
      member_sid,
      shop_sid,
      deliver_sid,
      sid,
      order_sid,
      deliver_memo,
      order_finish,
      deliver_fee,
    };
    const res = await axios.post(
      `http://${siteName}:3001/deliver/sendOrder`,
      ordernum
    );
    localStorage.setItem('order_sid', JSON.stringify(order_sid));
    await localStorage.setItem(
      'deliver_order_sid',
      JSON.stringify(res.data[0].deliver_order_sid)
    );
  }
  /* --------------------------------------- */
  /* ---------------彈跳視窗----------------- */
  function chceklogin() {
    if (localStorage.getItem('onlie_state')) {
      Swal.fire({
        title: '確定接單嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '謝謝你的辛苦',
          }).then((result) => {
            navi('/Deliver/DeliverOrder');
          });
          sqlactive();
          take();
        }
      });
    } else {
      //
      Swal.fire({
        icon: 'error',
        text: '你尚未登入!',
      });
      navi('/Deliver/DeliverLogin'); //導入到登入畫面
    }
  }
  /* -------------------------------- */
  /* ------------接單後禁止在點取-------------- */
  function take() {
    const addtake = JSON.parse(localStorage.getItem('delivertake'));
    setDelivertake(addtake);
  }
  useEffect(() => {
    checkMyLocation();
    take();
    map();
  }, [deliverPosition]);
  /* -------------------------------- */

  return (
    <>
      <li className="Doldeitem">
        <div className="Dinfo">
          {/* ------------------------下拉式店家按鈕------------------ */}
          <div className="DDown" onClick={() => setBtn(!btn)}>
            <i
              className={
                btn ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
              }
            ></i>
          </div>
          {/* ----------------------------------------------------- */}
          <div className="Dcook">
            <p className="Dcooktitle">製作時間</p>
            <p className="Dcooktext">{cook_time + 'min'}</p>
          </div>

          <div className="Dcook">
            <p className="Dcooktitle">距離</p>
            <p className="Dcooktext">{addmap + 'km'}</p> {/* 未完成 */}
          </div>
        </div>
        {/* --------------------下拉式資訊----------------------- */}
        {btn && (
          <div className="Dshopmore">
            <div className="Dtext">
              <div className="Dlisttext">
                <div>
                  <i className="fa-regular fa-user Dicon"></i>
                </div>
                <div>
                  <p>{client}</p>
                  <p>{receive_address}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="Dtext">
                <div className="Dlisttext">
                  <div>
                    <i className="fa-solid fa-store Dicon"></i>
                  </div>
                  <div>
                    <p>{name}</p>
                    <p>{address}</p>
                  </div>
                </div>
                {/* ----------------------接單按鈕----------------------- */}
                <button
                  className={delivertake ? 'Dbtn' : 'Dbtn Dactive'}
                  disabled={delivertake ? false : true}
                  onClick={() => {
                    chceklogin();
                    localStorage.setItem('delivertake', false);
                  }}
                >
                  接單
                </button>
                {/* ----------------------------------------------------- */}
              </div>
            </div>
          </div>
        )}
        {/* ----------------------------------------------------- */}
      </li>
    </>
  );
}

export default ListTable;
