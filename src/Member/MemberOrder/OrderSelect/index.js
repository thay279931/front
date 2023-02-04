import { useEffect, useState } from 'react';
import OrderOptions from './OrderOptions';
function OrderSelect({ orderList, selectedOrder, setSelectedOrder }) {
  const [selectedData, setSelectedData] = useState({ orderId: 0, name: '' });
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    //一開始先設定成最新的那筆
    if (selectedData.orderId === 0 && selectedData.name === '') {
      setSelectedOrder(orderList[0].sid);
      setSelectedData({
        orderId: orderList[0].orderId,
        name: orderList[0].name,
      });
    }
  }, []);

  const checkBlock = (e) => {
    const targetTag = e.target.closest('#OrderOptionsBlock');
    // console.log(targetTag);
    if (!targetTag && openList) {
      setOpenList(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', checkBlock);
    return () => {
      window.removeEventListener('click', checkBlock);
    };
  }, []);

  return (
    <>
      <div className="w100p disf jc-fe marb20">
        {/* 整個選項 */}
        <div className="w70p disf h30 ai-fs" id="OrderOptionsBlock">
          {/* 前半段有文字 */}
          <div className={`w90p orderSelects ${openList ? 'active' : ''} `}>
            {openList ? (
              <OrderOptions
                orderList={orderList}
                setSelectedOrder={setSelectedOrder}
                setOpenList={setOpenList}
                setSelectedData={setSelectedData}
                selectedOrder={selectedOrder}
                openList={openList}
              />
            ) : (
              <div
                onClick={() => {
                  setOpenList(true);
                }}
                className="w100p padV5 disf jc-sb ai-c h100p pointer"
              >
                <p className="w50p orderSelectWrap">{selectedData.name}</p>
                <p className="w50p disf">
                  <span className="smallHidden">訂單編號:</span>
                  <span>{selectedData.orderId}</span>
                </p>
              </div>
            )}
          </div>
          {/* 箭頭按鈕 */}
          <div
            onClick={() => {
              setOpenList((v) => !v);
            }}
            className="padV5 padH5 h100p bgcBlue flexSetCenter pointer"
          >
            <i
              className={`fa-solid fa-angle-down optionArrow ${
                openList ? 'active' : ''
              }`}
            ></i>
          </div>
        </div>
      </div>
    </>

    // <div>
    //   <select
    //     className="w50p disf ta-c fs18"
    //     value={selectedOrder}
    //     onChange={(e) => {
    //       setSelectedOrder(e.target.value);
    //     }}
    //   >
    //     {orderList.map((v, i) => {
    //       return (
    //         <option className="padH10 disf" value={v.sid} key={v.sid}>
    //           {v.name}
    //           訂單編號:
    //           {v.orderId}
    //         </option>
    //       );
    //     })}
    //   </select>
    // </div>
  );
}
export default OrderSelect;
