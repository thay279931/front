function ChooseShopList({
  setMaxDistance,
  setchoosedShopDatas,
  maxDistance,
  shopDatas,
  sortMethod,
  setSortMethod,
  setChoosedShopSid,
  setCenter,
}) {
  return (
    <>
      <div>
        <div className="marb10 padV10 padH10 ta-c h15p fs18 fw6">
          <div className="marb10 flexSetCenter">
            最大距離
            <input
              className="w40 ta-c"
              type="number"
              value={maxDistance}
              onChange={(e) => {
                setMaxDistance(e.target.value);
              }}
            />
            公里
          </div>
          <div className="marb10 flexSetCenter">
            排序方式：
            <select
              className=""
              value={sortMethod}
              onChange={(e) => {
                setSortMethod(Number(e.target.value));
              }}
            >
              <option value={0}>距離</option>
              <option value={1}>評價</option>
            </select>
          </div>
        </div>
        <div className=" ChooseShopListOption">
          {/*    {
                "sid": 697,
                "name": "好吃豆花",
                "address": "台北市民族西路92號",
                "phone": "0950608251",
                "average_evaluation": 3.5,
                "shop_lat": 25.0684,
                "shop_lng": 121.517,
                "distance": 4.7566466128572396,
                "fee": 30
                }  */}
          {shopDatas.map((v, i) => {
            return (
              <div key={v.sid}>
                <div
                  className="ChooseShopListCard"
                  onClick={() => {
                    setchoosedShopDatas(v);
                    setChoosedShopSid(v.sid);
                    setCenter({ lat: v.shop_lat, lng: v.shop_lng });
                  }}
                >
                  <p className=" ChooseShopListCardStar">
                    {v.average_evaluation}
                    <i className="fa-solid fa-star fontMainColor"></i>
                  </p>
                  <p className="fs18 fw6 padV10">{v.name}</p>
                  <p>{v.address}</p>
                  <p>距離：{v.distance}公里</p>
                  <p>電話：{v.phone}</p>
                </div>
              </div>
            );
          })}
          {/* <div className="ChooseShopListCard">
            <p className=" as-e">
              4<i className="fa-solid fa-star fontMainColor"></i>
            </p>
            <p className="fs18 fw6">店家名稱123</p>
            <p>台北市信義路一段234號一樓</p>
            <p>外送費:$20</p>
            <p>電話:0912345678</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default ChooseShopList;
