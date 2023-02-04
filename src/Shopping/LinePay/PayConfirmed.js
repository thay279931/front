import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
const siteName = '35.221.208.241';
function PayConfirmed() {
  let location = useLocation();

  // 這裡要處理伺服器通知line pay已確認付款，為必要流程
  useEffect(() => {
    // 這裡要得到回到的交易id
    //?transactionId = 2022092200727626510
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('transactionId');

    if (transactionId) {
      // 向server發送交易成功記錄
      axios
        .get(
          `http://${siteName}:3001/LinePay/confirm?transactionId=${transactionId}`
        )
        .then((response) => {
          console.log(response);

          // 以下為關閉機制
          // focus回原本視窗
          window.opener.focus();
          //window.opener.location.reload()

          // 通知opener(原付款視窗已付款完成)
          //自訂事件名稱
          const event = new CustomEvent('paid', {
            detail: transactionId,
          });
          //對原本視窗觸發PAID事件
          window.opener.document.dispatchEvent(event);

          // 關閉自己視窗
          window.close();
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <p>已完成付款</p>
    </>
  );
}

export default PayConfirmed;
