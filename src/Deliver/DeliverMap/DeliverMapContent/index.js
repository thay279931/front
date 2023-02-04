//外送員 地圖
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import GoogleMapReact from 'google-map-react';
import { useGeo } from '../../../Context/GeoLocationProvider';
import keys from '../../../keys';
import { useFunc } from '../../../Context/FunctionProvider';
import { useNavigate } from 'react-router-dom';
import TargetPositionIcon from './TargetPositionIcon';
import './DeliverMaps.css';
const siteName = '35.221.208.241';
const Cycle = () => (
  <div>
    <i className="fs48 fa-solid fa-motorcycle fontMainColor mapTranslate cycleFontOnMap"></i>
  </div>
);
// const TargetPosition = ({ targetName, targetAddress }) => (
//   <div className="w200 bgcW">
//     <span>{targetName}</span>
//     <span>{targetAddress}</span>
//     <i className="fa-solid fa-location-dot fontMainColor mapTranslate fs48"></i>
//   </div>
// );

const buttonText = ['', '送達', '取餐'];
function DeliverMapContent({
  //現在跟哪方對話  1是會員 2是店家
  side = 1,
  //現在的訂單SID
  orderSid = 1,
  //聊天室
  orderSocket,
  //會員SID
  // memberSid = 1,
  //聊天室開啟狀態
  socketOpened,
}) {
  //店家/客戶名稱
  const [targetName, setTargetName] = useState('');
  //會員SID
  const [memberSid, setMemberSid] = useState(0);
  //現在是誰  2 店家 1 客戶
  const [sideNow, setSideNow] = useState(2);
  const { loginCheckGetFetch } = useFunc();
  const { calculateDistance, calculateDistanceByLatLng, getLatLngByAddress } =
    useGeo();
  //按鈕狀態  是否鎖定  靠近才可以取餐/送達
  const [buttonStatus, setButtonStatus] = useState(true);
  //目標位置
  const [targetPosition, setTargetPosition] = useState({
    lat: 25.03359,
    lng: 121.54349,
  });
  //自己位置
  const [deliverPosition, setDeliverPosition] = useState({
    lat: 0,
    lng: 0,
  });
  //對方地址
  const [targetAddress, setTargetAddress] = useState('');
  //預設狀態
  const defaultProps = {
    center: {
      lat: 25.03359,
      lng: 121.54349,
    },
    zoom: 15,
  };
  //檢查是否抵達 控制按鈕是否可以點(送達/取餐)
  const checkArraive = async () => {
    if (deliverPosition.lat !== 0) {
      const distance = await calculateDistanceByLatLng(
        deliverPosition,
        targetPosition
      );
      if (distance < 0.15) {
        setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
      console.log(distance);
    }
  };
  //獲得對方位置函式
  const getAddress = async () => {
    const orderSid = localStorage.getItem('order_sid');
    console.log(123);
    console.log({ orderSid });
    if (orderSid === 0) {
      return;
    }
    const res = await loginCheckGetFetch(
      //這邊SIDE沒用到 就放著
      `deliving/GetAddress?side=${side}&orderSid=${orderSid}`,
      'Deliver'
    );
    // console.log({res});
    //  side
    /* {
    "receive_address": "台北市信義路一段1號",
    "shopName": "I’m PASTA 和平店",
    "address": "台北市和平東路二段118巷50號 ",
    "memberName": "ゆう"
    } */
    //依照是哪方設定地址
    const address = sideNow === 1 ? res.receive_address : res.address;
    const gettedName = sideNow === 1 ? res.memberName : res.shopName;
    // console.log(address);
    //由地址獲得座標
    const coordinate = await getLatLngByAddress(address);
    console.log(coordinate);
    setTargetPosition(coordinate);
    setTargetAddress(address);
    setTargetName(gettedName);
    setMemberSid(res.memberSid);
  };
  //===============================================分隔線================================================
  const checkMyLocation = async () => {
    //獲得現在位置 然後傳到裡面的函式
    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location.coords);
      setDeliverPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };
  //每秒定位 OK 1126/2315
  useEffect(() => {
    const intervals = setInterval(checkMyLocation, 1000);

    return () => {
      clearInterval(intervals);
    };
  }, []);
  //sideNow
  useEffect(() => {
    getAddress();
    getOrderStep();
  }, [sideNow]);
  //近來頁面時獲得訂單狀態
  const getOrderStep = async () => {
    const orderSid = localStorage.getItem('order_sid');
    //沒有就不設定
    if (!orderSid) {
      return;
    }
    const res = await loginCheckGetFetch(
      `deliving/GetDeliveStep/?orderSid=${orderSid}`,
      'Deliver'
    );
    console.log(res);
    const stateList = [2, 1];
    setSideNow(stateList[res]);
    //res 0 還沒取餐 1 已經取餐
  };

  //位置有改變時傳送位置訊息
  //orderSocket memberSid
  //  JSON.stringify({position:true,lat:deliverPosition.lat,lng:deliverPosition.lng ,receiveSid:memberSid,receiveSide:side,orderSid:orderSid})
  //    {position:true,lat:deliverPosition.lat,lng:deliverPosition.lng ,receiveSid:memberSid,receiveSide:side,orderSid:orderSid}
  //這邊只發給會員 所以SIDE不管
  useEffect(() => {
    if (socketOpened) {
      orderSocket.send(
        JSON.stringify({
          position: true,
          lat: deliverPosition.lat,
          lng: deliverPosition.lng,
          receiveSid: memberSid,
          receiveSide: 1,
          orderSid: 1,
        })
      );
    }
    checkArraive();
  }, [deliverPosition, sideNow]);
  //===============================================分隔線================================================
  const navi = useNavigate();

  async function foodget() {
    const ordersid = localStorage.getItem('order_sid');
    await axios.put(`http://${siteName}:3001/deliver/deliverorder/${ordersid}`);
  }

  async function foodreach() {
    const ordersid = localStorage.getItem('order_sid');
    await axios.put(
      `http://${siteName}:3001/deliver/finishdeliverorder/${ordersid}`
    );
    //這裡看要到接單畫面還是歷史訂單
    //記得要刪掉現在接單的資訊 LOCALSTORAGE
  }

  //====================================================================================================
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys.gmap }}
        // bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={deliverPosition}
      >
        <TargetPositionIcon
          lat={targetPosition.lat}
          lng={targetPosition.lng}
          text="target"
          targetName={targetName}
          targetAddress={targetAddress}
          sideNow={sideNow}
        />
        <Cycle
          lat={deliverPosition.lat}
          lng={deliverPosition.lng}
          text="My Marker"
        />
      </GoogleMapReact>
      <button
        className="deliverMapSendButton"
        disabled={buttonStatus}
        onClick={() => {
          if (sideNow === 2) {
            Swal.fire({
              title: '確定要取餐?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: '收到你的取餐訊息',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                foodget();
                setSideNow(1);
                orderSocket.send(
                  JSON.stringify({
                    receiveSide: 1,
                    receiveSid: 1,
                    step: 4,
                    orderSid: Number(orderSid),
                  })
                );
              }
            });
            setSideNow(1);
            const orderSid = localStorage.getItem('order_sid');
          }
          if (sideNow === 1) {
            const orderSid = localStorage.getItem('order_sid');
            Swal.fire({
              title: '確定已送達?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                foodreach();
                orderSocket.send(
                  JSON.stringify({
                    receiveSide: 1,
                    receiveSid: 1,
                    step: 5,
                    orderSid: Number(orderSid),
                  })
                );
                Swal.fire({
                  title: '收到你送達回覆',
                  icon: 'success',
                  showConfirmButton: true,
                }).then((result) => {
                  navi('/Deliver/DeliverConfirmOrder');
                });
                localStorage.removeItem('deliver_order_sid');
                localStorage.removeItem('order_sid');
                localStorage.setItem('delivertake', true);
              }
            });
          }
        }}
      >
        {sideNow === 2 ? '取餐' : '送達'}
      </button>
    </>
  );
}
export default DeliverMapContent;
