//接單/完成畫面

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const siteName = '35.221.208.241';
const fetchList = [
  'checkDisConfirmDetail',
  'checkConfirmedDetail',
  'checkCompletedDetail',
];
const buttonContent = ['確認', '完成'];
const alertContent = ['接單', '完成訂單'];
const confirmedMessage = ['接單成功', '訂單完成'];

function StoreOrderConfirm({
  setOpenDetail,
  page,
  choosedOrderSid,
  orderSocket,
  setPage,
}) {
  //接單API 之後往下放
  function setOrder(orderSid, member_sid) {
    const postData = JSON.stringify({ sid: orderSid, member_sid: member_sid });
    fetch(`http://${siteName}:3001/StoreConfirmOrders/confirm`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
      });
  }
  //完成訂單API
  function completeOrder(storeOrderSid) {
    const postData = JSON.stringify({ storeOrderSid: storeOrderSid });
    fetch(`http://${siteName}:3001/StoreConfirmOrders/CompleteOrder`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
      });
  }

  //訂單細節
  const [orderDetail, setOrderDetail] = useState({});
  //商品內容
  const [products, setProducts] = useState([]);
  //獲取訂單細節 傳入訂單sid
  function getData(orderSid) {
    const postData = JSON.stringify({ orderSid: orderSid });
    fetch(`http://${siteName}:3001/StoreOrders/${fetchList[page]}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        setOrderDetail(res.getData);
        setProducts(res.productDetails);
      });
  }
  /* res:{
    "getData": {
        "sid": 3,
        "member_sid": 1,
        "shop_sid": 89,
        "deliver_sid": null,
        "store_order_sid": null,
        "deliver_order_sid": null,
        "shop_memo": "就說了不要香菜",
        "deliver_memo": "不要成為在地美食",
        "order_time": "09:23:19",
        "order_total": 450,
        "coupon_sid": null,
        "sale": 450,
        "paid": 1,
        "pay_method": 0,
        "LinePayID": null,
        "daily_coupon_sid": null,
        "deliver_fee": 0,
        "cook_time": 40,
        "shop_order_status": 0,
        "deliver_order_status": 0,
        "total_amount": 5,
        "memberName": "ゆう",
        "orderNumber": "S3891"
    },
    "productDetails": [{
            "sid": 463,
            "order_sid": 189,
            "product_sid": 1111,
            "product_price": 135,
            "amount": 1,
            "productName": "奶油蔬菜鮭魚麵",
            "detail":{
                        "option_detail_sid": 1,
                        "options": "加起司",
                        "option_price": 10
                    }
        }
    ]
}*/
  //===============================================分隔線================================================
  const confirmAlert = Swal.mixin({
    customClass: {
      //classname
      confirmButton: 'storeConfirmOrderAlertButton',
      cancelButton: 'storeConfirmOrderAlertButton',
    },
    buttonsStyling: false,
  });
  //===============================================分隔線================================================

  useEffect(() => {
    getData(choosedOrderSid);
    const bodyQs = document.querySelector('body');
    bodyQs.style.overflow = 'hidden';
    return () => {
      bodyQs.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <div>
        <div className="storeConfirmOnGrayBack ">
          <div className="storeConfirmOrder">
            <div className="storeConfirmOrderNames">
              <span>客戶名稱：{orderDetail.memberName}</span>
              <span
                onClick={() => {
                  setOpenDetail(false);
                }}
              >
                <i className="fa-solid fa-circle-xmark pointer cartX"></i>
              </span>
            </div>
            <p className="padV5 fw6">訂單編號：{orderDetail.orderNumber}</p>
            <div className="storeOrderProductsContents">
              {products.map((value, index) => {
                return (
                  <div className="padV5" key={value.sid}>
                    <div className="disf padV5 fw6">
                      <p className="w15p fontMainColor ">{value.amount}x</p>
                      <p className="w85p">{value.productName}</p>
                    </div>
                    {Object.keys(value.detail).length !== 0 ? (
                      <>
                        <div className=" productDetails disf padV5">
                          <div className="w100p disf fw-w">
                            {value.detail.map((element, i) => {
                              return (
                                <>
                                  <span key={i} className=" marV5 ta-c">
                                    【{element.options}】
                                  </span>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>

            <p>
              <span className="fw6">商品總數:</span>
              {orderDetail.total_amount}
            </p>

            <p className="shopMemos">
              <span className="fw6 ">備註:</span>
              <br />

              <span className="shopMemoContent"> {orderDetail.shop_memo} </span>
            </p>
            <p>
              <span className="fw6">總金額:</span>
              {orderDetail.sale}
            </p>
            {/* //===============================================分隔線================================================ */}
            {page < 2 ? (
              <div
                className="storeConfirmOrderButton"
                onClick={async () => {
                  confirmAlert
                    .fire({
                      title: `是否確定${alertContent[page]}?`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: '確定',
                      cancelButtonText: '取消',
                    })
                    .then(async (result) => {
                      if (result.isConfirmed) {
                        if (page === 0) {
                          //接單  {postSid :89 , postSide : 2 ,receiveSide :1 ,receiveSid :1,step : 2,}
                          orderSocket.send(
                            JSON.stringify({
                              receiveSide: 1,
                              receiveSid: orderDetail.member_sid,
                              step: 2,
                              orderSid: orderDetail.sid,
                            })
                          );
                          await setOrder(
                            orderDetail.sid,
                            orderDetail.member_sid
                          );
                          setTimeout(() => {
                            setPage(1);
                          }, 1000);
                        } else if (page === 1) {
                          //完成  {postSid :89 , postSide : 2 ,receiveSide :1 ,receiveSid :1,step : 3}
                          orderSocket.send(
                            JSON.stringify({
                              receiveSide: 1,
                              receiveSid: orderDetail.member_sid,
                              step: 3,
                              orderSid: orderDetail.sid,
                            })
                          );
                          completeOrder(orderDetail.store_order_sid);
                          setTimeout(() => {
                            setPage(2);
                          }, 1000);
                        }
                        setOpenDetail(false);
                        confirmAlert.fire(confirmedMessage[page]);
                      }
                    });
                }}
              >
                {buttonContent[page]}
              </div>
            ) : null}
            {/* //===============================================分隔線================================================ */}
          </div>
        </div>

        <div
          onClick={() => {
            setOpenDetail(false);
          }}
          className="grayBack"
        ></div>
      </div>
    </>
  );
}
export default StoreOrderConfirm;
