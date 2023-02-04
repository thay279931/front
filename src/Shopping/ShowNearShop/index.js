import { useGeo } from '../../Context/GeoLocationProvider';
import { useFunc } from '../../Context/FunctionProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import ChooseShopList from './ChooseShopList';
import NearShopMap from './NearShopMap';
import './ShowNearShop.css';
function ShowNearShop() {
  const { calculateDistanceByLatLng } = useGeo();
  const { notLoginGetFetch } = useFunc();
  const [myPosition, setMyPosition] = useState({ lat: 0, lng: 0 });
  const [maxDistance, setMaxDistance] = useState(5);
  const [constShopDatas, setConstShopDatas] = useState([]);
  const [shopDatas, setShopDatas] = useState([]);
  const [choosedShopDatas, setchoosedShopDatas] = useState({});
  const [choosedShopSid, setChoosedShopSid] = useState(0);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  //排序方式 0距離 1評價
  const [sortMethod, setSortMethod] = useState(0);
  //獲得自己位置
  const checkMyLocation = async () => {
    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location.coords);
      setMyPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  };

  const getShopDatas = async () => {
    if (myPosition.lat !== 0 && myPosition.lng !== 0 && maxDistance !== 0) {
      const res = await notLoginGetFetch(
        `ShowNearShop/?lat=${myPosition.lat}&lng=${myPosition.lng}&maxDistance=${maxDistance}`
      );

      for (let element of res) {
        const shopLat = element.shop_lat;
        const shopLng = element.shop_lng;
        const distance = await calculateDistanceByLatLng(myPosition, {
          lat: shopLat,
          lng: shopLng,
        });
        const fee = parseInt(distance / 5) * 10 + 30;
        element.distance = parseInt(distance * 100) / 100;
        element.fee = fee;
      }
      // 這裡排序
      // if (sortMethod === 0) {
      //   res.sort((a, b) => {
      //     return a.distance - b.distance;
      //   });
      // } else if (sortMethod === 1) {
      //   res.sort((a, b) => {
      //     return b.average_evaluation - a.average_evaluation;
      //   });
      // }
      // console.log(res);
      sortShopDatas(res);
      setConstShopDatas(res);
    }
  };
  const sortShopDatas = (input) => {
    let newSort = [];
    if (input) {
      newSort = input;
    } else {
      newSort = [...constShopDatas];
    }
    console.log({ newSort });
    if (sortMethod === 0) {
      newSort.sort((a, b) => {
        return a.distance - b.distance;
      });
    } else if (sortMethod === 1) {
      newSort.sort((a, b) => {
        return b.average_evaluation - a.average_evaluation;
      });
    }
    const setArray = newSort.filter((v) => {
      return v.distance < maxDistance;
    });
    console.log({ newSort });
    setShopDatas(setArray);
  };
  /* {
    "sid": 697,
    "name": "好吃豆花",
    "address": "台北市民族西路92號",
    "phone": "0950608251",
    "average_evaluation": 3.5,
    "shop_lat": 25.0684,
    "shop_lng": 121.517,
    "distance": 4.7566466128572396,
    "fee": 30
} */
  useEffect(() => {
    checkMyLocation();
  }, []);
  useEffect(() => {
    sortShopDatas();
  }, [sortMethod, constShopDatas]);
  useEffect(() => {
    getShopDatas();
    // sortShopDatas();
  }, [myPosition, maxDistance, sortMethod]);
  return (
    <>
      <div className="padV20">
        <div className="disf ShowNearShopFrame">
          <div className="w70p h100p">
            <NearShopMap
              choosedShopDatas={choosedShopDatas}
              myPosition={myPosition}
              choosedShopSid={choosedShopSid}
              center={center}
            />
          </div>
          <div className="w30p">
            <ChooseShopList
              setchoosedShopDatas={setchoosedShopDatas}
              setMaxDistance={setMaxDistance}
              maxDistance={maxDistance}
              shopDatas={shopDatas}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              setChoosedShopSid={setChoosedShopSid}
              setCenter={setCenter}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowNearShop;
