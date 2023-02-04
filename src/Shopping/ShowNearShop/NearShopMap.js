import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';
import keys from '../../keys';
function NearShopMap({ myPosition, choosedShopDatas, center, choosedShopSid }) {
  const navi = useNavigate();
  const MyPositionIcon = () => (
    <div className=" po-r">
      <i className=" fa-solid mapTranslate fontMainColor fa-location-dot fs36 "></i>
    </div>
  );
  const StorePositionIcon = () => (
    <div className="disf fd-c mapTranslate ai-c  po-r ">
      <div className="w300 nearShopTextBox">
        <p className="fs24 marb5">{choosedShopDatas.name}</p>
        <p className="fs18 marb5">
          {choosedShopDatas.average_evaluation}
          <i className="fa-solid fa-star fontMainColor"></i>
        </p>
        <p className="fs18 marb5">外送費：${choosedShopDatas.fee}</p>
        <p
          className="h50 pointer nearShopGoShopButton"
          onClick={() => {
            navi(`/productList/?shop_sid=${choosedShopSid}`);
          }}
        >
          前往店家
        </p>
      </div>
      <div className="w200 ta-c h50">
        <i className="fa-solid fa-store fontMainColor  fs48"></i>
      </div>
    </div>
  );
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys.gmap }}
        defaultCenter={{ lat: 25.033517511773827, lng: 121.54343194746913 }}
        defaultZoom={15}
        center={center.lat !== 0 && center.lng !== 0 ? center : null}
      >
        <MyPositionIcon lat={myPosition.lat} lng={myPosition.lng} />
        {choosedShopDatas.shop_lat && choosedShopDatas.shop_lng ? (
          <StorePositionIcon
            lat={choosedShopDatas.shop_lat}
            lng={choosedShopDatas.shop_lng}
          />
        ) : null}
      </GoogleMapReact>
    </>
  );
}
export default NearShopMap;
