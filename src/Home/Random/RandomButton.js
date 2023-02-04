//按鈕
import { useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import { useAuth } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
function RandomButton({
  rejectedTypes,
  setGettedShopName,
  setRadomArrays,
  setStartFlashing,
  todayOver,
  setTodayOver,
  startFlashing,
  flashingEnd,
  setFlashingEnd,
  pressedTimes,
  setPressedTimes,
  setGettedSid,
  todayTimes,
  setTodayTimes,
  setCutAmount,
  setFakeCounter,
}) {
  const { loginCheckPostFetch, notLoginPostFetch } = useFunc();
  const { authMember } = useAuth();

  //獲得店家函式 輸入不要的種類(陣列) 回傳1筆店家
  const getDailyCoupon = async (types) => {
    const postData = JSON.stringify(types);

    const res = authMember
      ? await loginCheckPostFetch(
          `DailyCoupon/GetRandomStoreWithType`,
          'Member',
          postData
        )
      : await notLoginPostFetch(`RandomWithoutLogin`, postData);
    console.log(res);
    //TODO 展示用 改這裡會改顯示結果 這樣寫只有第三次一定是要的店家
    // if (pressedTimes !== 2) {
    //   res.shopList.shift();
    // }
    if (res.cutamount) {
      setCutAmount(res.cutamount);
    } else {
      setCutAmount(0);
    }

    //res.cutamount  折價金額
    //開始閃爍
    setStartFlashing(true);
    //放進資料列
    setRadomArrays(res.shopList);
    //放進第0個
    setGettedShopName(res.shopList[0].name);
    //設定SID
    setGettedSid(res.shopList[0].sid);
    //今天超過次數的狀態
    if (res.over) {
      setTodayOver(true);
    }
  };
  return (
    <>
      <div></div>
      <div
        // rejectedTypes 之後用這個
        onClick={() => {
          if (!flashingEnd) {
            return;
          }
          const rejectedTypesWithNumber = [];
          rejectedTypes.forEach((v, i) => {
            //這裡有!是正向選擇(選要的)   沒有!是反向選擇(選不要的)
            if (!v) rejectedTypesWithNumber.push(i + 1);
          });
          if (rejectedTypesWithNumber.length === 6) {
            Swal.fire('選項不可為空');
            return;
          }
          if (todayTimes < 3) {
            setTodayTimes((v) => v + 1);
          }
          // console.log(rejectedTypesWithNumber);
          setFlashingEnd(false);
          getDailyCoupon(rejectedTypesWithNumber);
          setPressedTimes((v) => v + 1);
          setFakeCounter((v) => v + 1);
        }}
        className={`homeStartRandomButton ta-c pointer bgcMain   ${
          flashingEnd ? '' : 'active'
        }`}
      >
        {pressedTimes === 0 ? '隨饗' : '再次抽選'}
      </div>
    </>
  );
}
export default RandomButton;
