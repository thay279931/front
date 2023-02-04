import {
  useState,
  useEffect,
  useMemo,
  useref,
  useContext,
  createContext,
} from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import './Shopping_RWD.css';
import './Shopping.css';
// 限時優惠券
import DailyTimeCounter from '../../Home/DailyTimeCounter';

//距離用----------------------------------------------------------------
import { useGeo } from '../../Context/GeoLocationProvider';
//地址用----------------------------------------------------------------
import { usePay } from '../../Context/PayPageContext';
import { UseSearchValue } from '../../Context/ShoppingValueProvider';

const siteName = '35.221.208.241';

export default function ListTable() {
  // const history = useHistory()
  const siteName = '35.221.208.241';
  const location = useLocation();
  const usp = new URLSearchParams(location.search);

  //原有useState移至上層context全域適用useContext，跳頁時保存搜尋結果
  const {
    formData,
    setFormData,
    isChecked,
    setIsChecked,
    searchWaitTime,
    setSearchWaitTime,
    clearSearchState,
  } = UseSearchValue();

  const [user, setUser] = useState([]);
  const [myIndex, setMyIndex] = useState({});
  const [index, setIndex] = useState();

  //儲存搜尋時呈現的訊息用
  const [noResult, setNoResult] = useState('無法搜尋到您想要的餐點');
  // const [zeroResult , setZeroResult] = useState('無法搜尋到您想要的餐點')
  const [disResult, setDisResult] = useState('0');

  //檢查是否為城市頁
  const [isCity, setIsCity] = useState(false);
  const pathname = window.location.pathname;

  const navigate = useNavigate();

  //確認第一次render用
  // const [isFirstRender, setIsFirstRender] = useState(false);
  //確認視窗寬度用
  // const [cardBoxWidth, setCardBoxWidth] = useState('width:100%');

  // const [formDefault, setFormDefault] = useState();

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
  // const [isChecked, setIsChecked] = useState(true);

  //錯誤用
  const [errorMsg, setErrorMsg] = useState('');

  //儲存搜尋值的value用
  const [searchWord, setSearchWord] = useState('');
  // const [searchPriceMax, setSearchPriceMax] = useState('');
  // const [searchPriceMin, setSearchPriceMin] = useState('');
  // const [searchWaitTime, setSearchWaitTime] = useState('80');
  const [searchTotalRows, setSearchTotalRows] = useState('');

  //取得所有店家
  // const getShop = async () => {
  //   const sid = localStorage.getItem('MemberSid');

  //   console.log('path', pathname);

  //   let order = usp.get('order');

  //   try {
  //     const response = await axios.get(`http://${siteName}:3001/Shopping`);

  //     //把總筆數和checkbox回歸初始狀態
  //     setSearchTotalRows('');
  //     setIsChecked(true);
  //     // 如果排序=距離，把資料按distance由小到大排列
  //     if (order === 'distance') {
  //       response.data.sort((a, b) => a.distance - b.distance);
  //     }
  //     //---------------------------計算距離用-----------------------------
  //     if (sendAddress) {
  //       for (let element of response.data) {
  //         const shopAddress = element.address;
  //         const selfLocation = sendAddress;

  //         setNoResult('正在搜尋中');
  //         // 計算("店家地址","送達地址")間的直線距離
  //         const gettedDistance = await calculateDistance(
  //           shopAddress,
  //           selfLocation
  //         );

  //         // 測試用，隨機亂數資料
  //         // const gettedDistance = Math.random() * 50;

  //         // 將結果放進result.distance
  //         element.distance = Math.round(gettedDistance * 10) / 10;
  //         // 超過30公里，每5公里加10元外送費
  //         element.fees = parseInt(gettedDistance / 5) * 10 + 30;
  //       }
  //     }
  //     //-----------------------------------------------------------------

  //     // setShop(result.data);

  //     try {
  //       const response_favorite = await axios.get(
  //         `http://localhost:3001/MemberLogin/api3/${sid}` //最愛店家
  //       );

  //       console.log(response_favorite.data);
  //       setUser(response_favorite.data);
  //       // const arr = { ...response_favorite.data };
  //       const obj = {};
  //       response_favorite.data.forEach((el) => {
  //         obj[el.shop_sid] = true;
  //       });
  //       console.log(obj);
  //       //myIndex, setMyIndex
  //       let newIndex = { ...myIndex };
  //       response.data.forEach((element) => {
  //         if (obj[element.sid]) {
  //           newIndex = { ...newIndex, [element.sid]: true };
  //           element.favor = true;
  //           return;
  //         }
  //         newIndex = { ...newIndex, [element.sid]: false };
  //         element.favor = false;
  //       });
  //       setMyIndex(newIndex);
  //       setShop(response.data);
  //       console.log(response.data);
  //     } catch (e) {
  //       console.error(e.message);
  //       return e.message;
  //     }
  //   } catch (e) {
  //     setErrorMsg(e.message);
  //   }
  //   // console.log(errorMsg);
  // };

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

  // 是否為所有店家
  // const [allShop, setAllShop] = useState(false);

  // 等待時間的改變事件
  const waitTime_handleChange = (event) => {
    let value = event.target.value;
    setSearchWaitTime(value);
  };
  // checkedBox的改變事件
  const checkedBox_handleChange = (event) => {
    if (event.target.checked) {
      setIsChecked(!isChecked);
    }
  };
  // const [formData, setFormData] = useState({});

  const form_handleChange = (e) => {
    const dataIN = { ...formData, [e.target.name]: e.target.value };
    setFormData(dataIN);
    localStorage.setItem('search_data', JSON.stringify(dataIN));

    //---測試---
    if (e.target.checked) {
      setIsChecked(!isChecked);
    }

    if (e.target.name === 'wait_time') {
      let value = e.target.value;
      setSearchWaitTime(value);
    }
  };

  // 搜尋函式
  const searchShop = async (event) => {
    window.scrollTo(0, 0);
    // 得到當前定位的經緯度
    const localposition = await getLatLngByAddress(sendAddress);
    //{lat: 25.0339145, lng: 121.543412}
    // const localposition = { lat: 25.0339145, lng: 121.543412 };

    console.log('執行了search');
    // setShop('');
    const sid = localStorage.getItem('MemberSid');
    let key = formData.search ? formData.search : '';
    let price_max = formData.price_max; // 未輸入為0，寫在後端API
    let price_min = formData.price_min; // 未輸入為0，寫在後端API
    let wait_time = searchWaitTime;
    let order = isChecked;
    console.log('form', formData);

    // console.log('排序:', order);

    // 如果等待時間小於5，設置成5
    if (wait_time && wait_time < 5) {
      wait_time = 5;
    }

    if (price_max === 0) {
      price_max = 0;
    }
    setSearchWord(key);
    // setSearchPriceMax(price_max);
    // setSearchPriceMin(price_min);
    setSearchWaitTime(wait_time);

    // 用空格("\s")同時搜尋多個字段，以","("%2C")取代
    if (key) {
      key = key.trim().replace(/\s+/g, '%2C');
    }

    const result = await axios.get(
      `http://${siteName}:3001/Shopping/?search=${key}&price_max=${price_max}&price_min=${price_min}&order=${order}&wait_time=${wait_time}`
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
      //TODO:SID88的店算不出來
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
      if (!order) {
        result.data.sort((a, b) => a.distance - b.distance);
      }
    } // 迴圈結束

    // }
    // else {
    //   for (let element of result.data) {
    //     // 將結果放進result.distance
    //     element.distance = shopDistance[element.sid].idistance
    //       ? shopDistance[element.sid].distance
    //       : '';
    //     console.log('第二次sid', element.sid);
    //     console.log('第二次distance', element.distance);

    //     // 超過30公里，每5公里加10元外送費
    //     element.fees = shopDistance[element.sid].distance
    //       ? parseInt(shopDistance[element.sid].distance / 5) * 10 + 30
    //       : 'Error';
    //   }

    //   if (!order) {
    //     result.data.sort((a, b) => a.distance - b.distance);
    //   }
    // }
    // setisFirstRender(true);
    //-----------------------------------------------------------------

    // 如果沒有結果則NoResult從"正在搜尋中"更改為"沒有找到"
    // if (shop.length === 0) {
    //   setNoResult('無法搜尋到您想要的餐點');
    // } else {
    //   setNoResult('正在搜尋中');
    // }

    //有搜尋店名or價格上限or下限才顯示筆數(等待時間沒有)
    if (key || price_max || price_min) {
      if (result.data.length > 0) {
        setSearchTotalRows(result.data[0].total_rows);
      } else {
        setSearchTotalRows('0');
      }
    }
    console.log(
      'key:',
      key,
      '結果網址',
      `http://${siteName}:3001/Shopping/` + `?` + usp.toString()
    );

    // history.pushState('','','?'+usp.toString())

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

  // // 如果沒有結果則NoResult從"正在搜尋中"更改為"沒有找到"
  // if (shop.length === 0) {
  //   setNoResult('無法搜尋到您想要的餐點');
  // }

  return (
    <>
      {/* {toggle ? ( */}
      <div className="col_bar" style={style}>
        <form
          className="shopping_table"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          id="form"
        >
          <div className="search_bar">
            {searchWord ? (
              <>
                {searchWord && searchWord.length > 0 ? (
                  <p>{searchWord}的搜尋結果</p>
                ) : (
                  ''
                )}
                <p>{searchTotalRows === 0 ? '0' : searchTotalRows}個店家</p>
              </>
            ) : (
              <p>所有餐廳</p>
            )}
            <div className="search_bar_title">
              <p>搜尋店家及餐點</p>
            </div>
            <div className="search_bar_box">
              <div className="search_bar_name">
                {/* <AiOutlineSearch className='search_mirror' /> */}
                {/* <AiOutlineSearch className='search_mirror' /> */}
                <input
                  type="text"
                  name="search"
                  className="search_bar_name_input"
                  placeholder="以餐點名搜尋"
                  // onChange={searchHandle}
                  autoFocus
                  value={formData.search || ''}
                  onChange={(e) => {
                    form_handleChange(e);
                  }}
                />
              </div>
              <div className="search_bar_price">
                <p>以價格搜尋</p>
                <div className="search_bar_price_max">
                  <span>上限</span>
                  <input
                    type="number"
                    name="price_max"
                    className="search_bar_price_max_input"
                    min="0"
                    value={formData.price_max || ''}
                    onChange={(e) => {
                      form_handleChange(e);
                    }}
                    placeholder="最高價"
                  />
                </div>
                <div className="search_bar_price_min">
                  <span>下限</span>
                  <input
                    type="number"
                    name="price_min"
                    className="search_bar_price_min_input"
                    min="0"
                    value={formData.price_min || ''}
                    onChange={(e) => {
                      form_handleChange(e);
                    }}
                    placeholder="最低價"
                  />
                </div>
              </div>
              <div className="search_bar_tag">
                <p>分類排序</p>
                <div className="search_bar_point_button">
                  <div className="search_bar_point_button1">
                    <input
                      type="checkbox"
                      id="checkbox_point"
                      name="order"
                      value="point"
                      checked={isChecked}
                      //onChange={checkedBox_handleChange}
                      onChange={(e) => form_handleChange(e)}
                      className="shopping_checkbox_point"
                    />
                    <label htmlFor="checkbox_point">照評分排序</label>
                  </div>
                  <div className="search_bar_point_button2">
                    <input
                      type="checkbox"
                      id="checkbox_distance"
                      name="order"
                      value="distance"
                      checked={!isChecked}
                      //onChange={checkedBox_handleChange}
                      onChange={(e) => form_handleChange(e)}
                      className="shopping_checkbox_distance"
                    />
                    <label htmlFor="checkbox_distance">照距離排序</label>
                  </div>
                </div>
              </div>
              <div className="search_bar_time">
                <p>餐點完成時間</p>
                <div className="range_label">
                  <span>最長</span>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    //onChange={waitTime_handleChange}
                    onChange={(e) => form_handleChange(e)}
                    disabled
                    value={searchWaitTime || 80}
                  />
                  <span>分鐘(最短5分鐘)</span>
                </div>
                <div className="range">
                  <input
                    className="slider"
                    type="range"
                    name="wait_time"
                    id="wait_time"
                    min="0"
                    max="80"
                    step="5"
                    value={searchWaitTime || 80}
                    //onChange={waitTime_handleChange}
                    onChange={(e) => form_handleChange(e)}
                    list="steplist"
                  />
                  <div className="sliderticks">
                    <p>5</p>
                    <p>20</p>
                    <p>40</p>
                    <p>60</p>
                    <p>80</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="search_bar_button_group">
              <input
                onClick={() => {
                  clearSearchState();
                }}
                type="button"
                value="清空"
                className="search_bar_clear"
              />
              <input
                onClick={() => {
                  searchShop();
                }}
                type="submit"
                value="開始搜尋"
                className="search_bar_submit"
              />
            </div>
          </div>
        </form>
      </div>
      {/* ) : ( */}
      {/* '' */}
      {/* )} */}

      <div className="col_list">
        <DailyTimeCounter />
        <div className="subTitle">所有餐廳</div>
        <div className="shopCardList">
          {shop.length > 0 ? (
            shop.map((shop, index) => (
              <div
                key={index}
                className={toggle ? 'shopCardBox' : 'shopCardBox shopCardBox1'}
              >
                <Link to={'/productList/?shop_sid=' + shop.sid}>
                  <div className="shopCard_image">
                    <img
                      src={`http://${siteName}:3001/images/shop/${shop.src}`}
                      alt={shop.name}
                      className="shopCard_cover"
                    />
                    <div className="shopCard_conpon">新會員送全站折50</div>
                    <div className="shopCard_delivery_time">
                      {shop.wait_time}
                      <div className="shopCard_delivery_time_text">分鐘</div>
                    </div>
                    <button
                      className="shopbtn"
                      onClick={(e) => {
                        e.preventDefault();
                        submit(shop.sid);
                        const oldState = myIndex[shop.sid];
                        setMyIndex({ ...myIndex, [shop.sid]: !oldState });
                      }}
                      // className="icon"
                    >
                      {!myIndex[shop.sid] ? (
                        <AiOutlineHeart />
                      ) : (
                        <AiFillHeart />
                      )}
                    </button>
                  </div>
                  {/* <span>SID {shop.sid}</span> */}
                  <div className="shopCard_text">
                    <div className="shopCard_text_name">
                      <h3 className="shoptitle">{shop.name}</h3>
                      <div className="shopCard_score">
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
                    <div className="shopCard_text">
                      <div className="shopCard_text_name">
                        <div className="shopCard_score"></div>
                      </div>
                      <span className="shopcontext">
                        {shop.distance ? shop.distance : disResult}{' '}
                        {sendAddress ? 'km,' : ''}
                        {shop.type_name}
                      </span>
                      {/* <span>{shop.distance} 公里</span> */}
                      <span className="shopcontext">
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
      <div
        onClick={() => {
          setToggle(!toggle);
          console.log(toggle);
          handleClick();
        }}
        className="search_bar_toggle"
        id="bar_switch"
      >
        {!toggle ? (
          <AiOutlineSearch className="search_mirror" />
        ) : (
          <AiOutlineClose className="search_mirror_close" />
        )}
      </div>
    </>
  );
}
