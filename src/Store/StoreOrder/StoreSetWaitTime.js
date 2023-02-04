import { useEffect, useState } from 'react';
const siteName = '35.221.208.241';

function StoreSetWaitTime({ setChangeTime }) {
  //等待時間
  const [waitTime, setWaitTime] = useState(0);
  //獲得等待時間
  const getTimeNow = () => {
    fetch(`http://${siteName}:3001/StoreOrders/readTime`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log({ res });
        setWaitTime(res);
      });
  };
  //設定到資料庫
  const setTime = () => {
    const postData = JSON.stringify({ waitTime: waitTime });
    fetch(`http://${siteName}:3001/StoreConfirmOrders/setWaitTime`, {
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
  };

  useEffect(() => {
    getTimeNow();
  }, []);
  return (
    <>
      <div>
        <div className="onGrayBack">
          <div
            style={{ marginTop: '50px' }}
            className="disf fd-c bgcW padV20 padH20 gap10"
          >
            <p className="disf jc-sb">
              <span className="fw6 fs24">等待時間</span>
              <i
                onClick={() => {
                  setChangeTime(false);
                }}
                className="fs24 fa-solid fa-circle-xmark pointer"
              ></i>
            </p>
            <div className="disf ai-c">
              <input
                className="w70p"
                onChange={(e) => {
                  setWaitTime(e.target.value);
                }}
                value={waitTime}
                min="10"
                max="80"
                step="5"
                type="range"
              />
              <span className="fw6 ta-c w15p">{waitTime}分</span>
              <div
                onClick={() => {
                  setChangeTime(false);
                  setTime();
                }}
                className="ta-c w15p bgcBlue fontW padV10 padH10 pointer"
              >
                確認
              </div>
            </div>
            <p className="fw6">快捷鍵</p>
            <div className="disf fw-w">
              {new Array(8).fill(1).map((v, i) => {
                return (
                  <div key={i} className="w25p padV10 padH10">
                    <div
                      onClick={() => {
                        setWaitTime((i + 1) * 10);
                      }}
                      className="setTimeButton pointer padV5"
                    >
                      {(i + 1) * 10 + '分鐘'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setChangeTime(false);
          }}
          className="grayBack"
        ></div>
      </div>
    </>
  );
}
export default StoreSetWaitTime;
