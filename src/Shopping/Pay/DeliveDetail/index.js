//第一段 送餐詳情
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
import PayTitleBlock from '../PayTitleBlock';
import { useEffect, useState } from 'react';
import { useGeo } from '../../../Context/GeoLocationProvider';
function DeliveDetail() {
  const { calculateDistance } = useGeo();
  const { notLoginGetFetch } = useFunc();
  //備註設定
  const {
    deliverMemo,
    setDeliverMemo,
    storeMemo,
    setStoreMemo,
    sendAddress,
    setSendAddress,
    waitTime,
    setWaitTime,
    chooseedPayShop,
    cartContents,
    setDeliverFee,
  } = usePay();

  const [editAddress, setEditAddress] = useState(false);

  const [editShopMemo, setEditShopMemo] = useState(false);

  const [editDeliverMemo, setEditDeliverMemo] = useState(false);
  //計算外送費 OK
  const calculateDeliverFee = async (shopSid) => {
    const storeAddress = await notLoginGetFetch(
      `getStoreAddress/?shopSid=${shopSid}`
    );
    // console.log(storeAddress);
    const distance = await calculateDistance(sendAddress, storeAddress);
    // console.log(distance);
    const fee = parseInt(distance / 5) * 10 + 30;
    console.log(fee);
    setDeliverFee(fee);
  };
  const checkWaitTime = async () => {
    const time = await notLoginGetFetch(
      `PayGetWaitTime/?sid=${chooseedPayShop}`
    );
    setWaitTime(time);
  };

  useEffect(() => {
    checkWaitTime();
  }, []);
  useEffect(() => {
    if (!editAddress) {
      calculateDeliverFee(chooseedPayShop);
    }
  }, [editAddress]);
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={1} titleString={'送餐詳情'} />

        <div className="marb20 disf jc-sb ai-c">
          <div>
            <p
              onClick={() => {
                setSendAddress('台北市大安區復興南路一段390號2樓');
                localStorage.setItem(
                  'DeliveAddress',
                  '台北市大安區復興南路一段390號2樓'
                );
              }}
              className="fs24 fw5 marb15 "
            >
              送達地址:
            </p>
            {editAddress ? (
              <div>
                <input
                  className="w100p w300 padV5 fs18 padH5"
                  value={sendAddress}
                  onChange={(e) => {
                    setSendAddress(e.target.value);
                    localStorage.setItem('DeliveAddress', e.target.value);
                  }}
                  autoFocus={editAddress}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                      // calculateDeliverFee(Number(chooseedPayShop));
                      setEditAddress(false);
                    }
                  }}
                />
              </div>
            ) : (
              <p className="fs18">{sendAddress}</p>
            )}
          </div>
          <div
            className="payPageButton"
            onClick={() => {
              setEditAddress((v) => !v);
            }}
          >
            {editAddress ? '儲存' : '修改'}
          </div>
        </div>
        <div className="marb20 disf jc-sb ai-c">
          <div>
            <p
              onClick={() => {
                setStoreMemo('全部餐點都不要辣');
              }}
              className="fs24 fw5 marb15"
            >
              店家備註:
            </p>
            {editShopMemo ? (
              <div>
                <input
                  className="w300 padV5 fs18 padH5"
                  value={storeMemo}
                  onChange={(e) => {
                    setStoreMemo(e.target.value);
                  }}
                  autoFocus={editShopMemo}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                      setEditShopMemo(false);
                    }
                  }}
                />
              </div>
            ) : (
              <p>{storeMemo === '' ? '無' : storeMemo}</p>
            )}
          </div>

          <div
            className="payPageButton"
            onClick={() => {
              setEditShopMemo((v) => !v);
            }}
          >
            {editShopMemo ? '儲存' : '修改'}
          </div>
        </div>
        <div className="marb20 disf jc-sb ai-c">
          <div>
            <p
              onClick={() => {
                setDeliverMemo('放在櫃檯就好');
              }}
              className="fs24 marb15 fw5"
            >
              外送員備註:
            </p>
            {editDeliverMemo ? (
              <div>
                <input
                  className="w300 padV5 fs18 padH5"
                  value={deliverMemo}
                  onChange={(e) => {
                    setDeliverMemo(e.target.value);
                  }}
                  autoFocus={editDeliverMemo}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                      setEditDeliverMemo(false);
                    }
                  }}
                />
              </div>
            ) : (
              <p>{deliverMemo === '' ? '無' : deliverMemo}</p>
            )}
          </div>
          <div
            className="payPageButton"
            onClick={() => {
              setEditDeliverMemo((v) => !v);
            }}
          >
            {editDeliverMemo ? '儲存' : '修改'}
          </div>
        </div>
        <div className="marb10 disf jc-sb ai-c">
          <p className="fs18">
            店家現在等待時間:
            <span className={`fw6  ${waitTime >= 50 ? 'fontRed' : ''} `}>
              {waitTime}
            </span>
            分鐘
          </p>
        </div>
      </div>
    </>
  );
}
export default DeliveDetail;
