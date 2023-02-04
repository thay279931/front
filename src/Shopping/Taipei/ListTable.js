import { useState, useEffect, useMemo, useref } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import './taipei.css';
import './taipei_RWD.css';

//距離用----------------------------------------------------------------
import { useGeo } from '../../Context/GeoLocationProvider';
//地址用----------------------------------------------------------------
import { usePay } from '../../Context/PayPageContext';

const siteName = '35.221.208.241';

export default function ListTable() {
  const siteName = '35.221.208.241';
  const location = useLocation();
  const usp = new URLSearchParams(location.search);

  const [user, setUser] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  const [index, setIndex] = useState();

  //儲存搜尋時呈現的訊息用
  const [noResult, setNoResult] = useState('正在搜尋中');

  const [disResult, setDisResult] = useState('0');

  //檢查是否為城市頁
  // const [isCity, setIsCity] = useState(false);
  // const pathname = window.location.pathname;

  const navigate = useNavigate();

  //確認第一次render用
  // const [isFirstRender, setIsFirstRender] = useState(false);
  //確認視窗寬度用
  // const [cardBoxWidth, setCardBoxWidth] = useState('width:100%');

  //-------------------------計算距離用------------------------------------

  //距離用    實算距離(API)   以地址得到經緯度(API)   兩方經緯度算距離(本地)
  const { calculateDistance, getLatLngByAddress, calculateDistanceByLatLng } =
    useGeo();

  //地址用
  const { sendAddress, setSendAddress } = usePay();

  //放入商店地址的經緯度用
  const [shopPosition, setShopPosition] = useState({
    lat: 1,
    lng: 1,
  });

  //----------------------------------------------------------------------

  //抓網址變動
  useEffect(() => {
    searchShop();
  }, [sendAddress]);

  //表格資料
  const [shop, setShop] = useState([]);

  //checkbox用
  const [isChecked, setIsChecked] = useState(true);

  //錯誤用
  const [errorMsg, setErrorMsg] = useState('');

  //儲存搜尋值的value用
  // const [searchWord, setSearchWord] = useState('');
  // const [searchPriceMax, setSearchPriceMax] = useState('');
  // const [searchPriceMin, setSearchPriceMin] = useState('');
  // const [searchWaitTime, setSearchWaitTime] = useState('80');
  // const [searchTotalRows, setSearchTotalRows] = useState('');

  // --------------------最愛店家用-------------------------

  const add = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    try {
      const response = await axios.post(
        `http://${siteName}:3001/MemberLogin/addshop/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const del = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    try {
      const response = await axios.delete(
        `http://${siteName}:3001/MemberLogin/del/${sid}/${shopSid}`
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const submit = async (shopSid) => {
    const sid = localStorage.getItem('MemberSid');

    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    } else {
      // e.preventDefault();
      // const fd = new FormData({ input });
      // console.log(fd);
      // const nextStatusIndex = myIndex[shopSid] === 0 ? 1 : 0;
      const nextIndex = !myIndex[shopSid] ? add(shopSid) : del(shopSid);
      // setMyIndex(nextStatusIndex);
      setIndex(nextIndex);
    }
  };
  // -------------------------------------------------------

  // 搜尋函式
  const searchShop = async (event) => {
    const sid = localStorage.getItem('MemberSid');

    // 得到當前定位的經緯度
    const localposition = await getLatLngByAddress(sendAddress);
    //{lat: 25.0339145, lng: 121.543412}
    // const localposition = { lat: 25.0339145, lng: 121.543412 };

    console.log('執行了search');

    const result = await axios.get(
      `http://${siteName}:3001/City/Taipei`
      // `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );

    console.log('資料長度', result.data.length);
    // const test = {s:25.0448 , l:121.515}
    // const shopPosition = await getLatLngByAddress(test);
    // console.log(shopPosition);

    //---------------------------計算距離用-----------------------------

    // if (!isFirstRender) {
    for (let element of result.data) {
      const shopAddress = element.address;
      const selfLocation = sendAddress;

      // 計算("店家地址","送達地址")間的直線距離

      // GoogleAPI實時運算，耗時
      // const gettedDistance = await calculateDistance(shopAddress, selfLocation);

      // 測試用，隨機亂數
      // const gettedDistance = Math.random() * 50;

      // 直接以資料表內的店家經緯度與本地位置的經緯度運算(兩方皆為寫死)
      shopPosition.lat = await element.shop_lat;
      shopPosition.lng = await element.shop_lng;
      const gettedDistance = await calculateDistanceByLatLng(
        localposition,
        shopPosition
      );

      // console.log('店家經緯度', shopPosition);
      // if (!gettedDistance) {
      //   console.log('計算出距離:', gettedDistance);
      // }

      // 將結果放進result.distance
      element.distance = gettedDistance
        ? Math.round(gettedDistance * 10) / 10
        : '0';

      if (!sendAddress) {
        element.distance = '請輸入送達地址';
      }

      // 超過30公里，每5公里加10元外送費
      element.fees = gettedDistance
        ? parseInt(gettedDistance / 5) * 10 + 30
        : '計算中';

      // 如果排序=距離，把資料按distance由小到大排列
      // if (!order) {
      //   result.data.sort((a, b) => a.distance - b.distance);
      // }
    } // 迴圈結束

    //-----------------------------------------------------------------

    try {
      const response_favorite = await axios.get(
        `http://${siteName}:3001/MemberLogin/api3/${sid}` //最愛店家
      );

      console.log(response_favorite.data);
      setUser(response_favorite.data);
      // const arr = { ...response_favorite.data };
      const obj = {};
      response_favorite.data.forEach((el) => {
        obj[el.shop_sid] = true;
      });
      console.log(obj);
      //myIndex, setMyIndex
      let newIndex = { ...myIndex };
      result.data.forEach((element) => {
        if (obj[element.sid]) {
          newIndex = { ...newIndex, [element.sid]: true };
          element.favor = true;
          return;
        }
        newIndex = { ...newIndex, [element.sid]: false };
        element.favor = false;
      });
      setMyIndex(newIndex);
      setShop(result.data);
      console.log(result.data);
    } catch (e) {
      console.error(e.message);
      return e.message;
    }
  };

  const [toggle, setToggle] = useState(true);

  // function useWindowSize() {
  //   const [size, setSize] = useState([window.innerWidth]);
  //   useEffect(() => {
  //     const handleResize = () => {
  //       setSize([window.innerWidth]);
  //     };
  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }, []);
  //   return size;
  // }

  //const [width] = useWindowSize();

  // useEffect(() => {
  //   width < 768 && style();
  // }, [width]);

  const [isDisplay, setIsDisplay] = useState(false);
  const switchDisplay = () => {
    setIsDisplay(!isDisplay);
  };

  const style = {
    '@media(maxWidth:768px)': {
      padding: '800px',
    },
  };

  const handleClick = () => {
    if (toggle) {
      document.getElementsByClassName('col_bar')[0].style.right = '-30%';
      // document.getElementsByClassName('shopCardBox')[0].style.width = '100%';
      // const i = shop.length;
      // for ( let x = 0 ; x > i ; x++ ){
      //   document.querySelector('.shopCardBox')[1].style.width = '100%';
      // }
    }
    if (!toggle) {
      document.getElementsByClassName('col_bar')[0].style.right = '0';
      // document.querySelectorAll('.shopCardBox').style.width = '65%';
      // let elements = document.getElementsByClassName('.shopCardBox');
      // Array.from(elements).forEach(function (element) {
      //   element.style.width = '65%';
      // });
    }
  };

  return (
    <>
      <div className="city_col_list">
        <div className="city_subTitle">台北地區</div>
        <div className="city_shopCardList">
          {shop.length > 0 ? (
            shop.map((shop, index) => (
              <div
                key={index}
                className={
                  toggle
                    ? 'city_shopCardBox'
                    : 'city_shopCardBox city_shopCardBox1'
                }
              >
                <Link to={'/productList/?shop_sid=' + shop.sid}>
                  <div className="city_shopCard_image">
                    <img
                      src={`http://${siteName}:3001/images/shop/${shop.src}`}
                      alt={shop.name}
                      className="city_shopCard_cover"
                    />
                    <div className="city_shopCard_conpon">新會員送全站折50</div>
                    <div className="city_shopCard_delivery_time">
                      {shop.wait_time}
                      <div className="city_shopCard_delivery_time_text">
                        分鐘
                      </div>
                    </div>
                    <button
                      className="city_shopbtn"
                      onClick={(e) => {
                        e.preventDefault();
                        submit(shop.sid);
                        const oldState = myIndex[shop.sid];
                        setMyIndex({ ...myIndex, [shop.sid]: !oldState });
                      }}
                      // className="city_icon"
                    >
                      {!myIndex[shop.sid] ? (
                        <AiOutlineHeart />
                      ) : (
                        <AiFillHeart />
                      )}
                    </button>
                  </div>
                  {/* <span>SID {shop.sid}</span> */}
                  <div className="city_shopCard_text">
                    <div className="city_shopCard_text_name">
                      <h3 className="city_shoptitle">{shop.name}</h3>
                      <div className="city_shopCard_score">
                        {shop.average_evaluation !== null ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 40 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 0L24.4903 13.8197H39.0211L27.2654 22.3607L31.7557 36.1803L20 27.6393L8.2443 36.1803L12.7346 22.3607L0.97887 13.8197H15.5097L20 0Z"
                              fill="#FFA500"
                            />
                          </svg>
                        ) : (
                          ''
                        )}
                        {/* 資料庫結構: 小數點 */}
                        <p>{shop.average_evaluation}</p>
                      </div>
                    </div>
                    {/* <span>SID {shop.sid}</span> */}
                    <div className="city_shopCard_text">
                      <div className="city_shopCard_text_name">
                        <div className="city_shopCard_score"></div>
                      </div>
                      <span className="city_shopcontext">{shop.address}</span>
                      <span className="city_shopcontext">
                        {shop.distance ? shop.distance : disResult}
                        {sendAddress ? 'km,' : ' '}
                        {shop.type_name}
                      </span>
                      {/* <span>{shop.distance} 公里</span> */}
                      <span className="city_shopcontext">
                        外送費 {shop.fees ? shop.fees : disResult} 元
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>{noResult}</div>
          )}
        </div>
      </div>
    </>
  );
}
