//聊天內容頁 純內容
import { useEffect, useState } from 'react';
import { useFunc } from '../../../../Context/FunctionProvider';

function DeliverChatContentBox({ acceptedMessage, selectedOrder }) {
  const { loginCheckGetFetch } = useFunc();
  const [chattingDetails, setChattingDetails] = useState([]);
  const getChatHistory = async () => {
    const res = await loginCheckGetFetch(
      `deliving/GetChattingContent?orderSid=${selectedOrder}`,
      'Deliver'
    );
    console.log(res);
    if (res) {
      console.log('yes');
      setChattingDetails(res);
    }
  };
  /* {
    "sid": 292,
    "post_sid": 1,
    "post_side": 1,
    "receive_sid": 1,
    "receive_side": 3,
    "post_content": "測試",
    "post_time": "11/27 10:27:09",
    "order_sid": 1
} */
  useEffect(() => {
    getChatHistory();
  }, []);
  return (
    <>
      {chattingDetails.map((v, i) => {
        return (
          <div
            className={`notAdminChatBlocks ${
              v.post_side === 3 ? 'ChatSetRight' : 'ChatSetLeft'
            }`}
            key={v.sid}
          >
            <p className="notAdminTexts">{v.post_content}</p>
            <p className="notAdminTimes">{v.post_time}</p>
          </div>
        );
      })}
    </>
  );
}
export default DeliverChatContentBox;