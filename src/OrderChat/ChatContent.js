//訂單WS第二層 只有詳細對話內容
import { useEffect, useState } from 'react';
import { useFunc } from '../Context/FunctionProvider';
const siteName = '35.221.208.241';
function ChatContent({
  newContent,
  setNewContent,
  orderSid, //訂單SID
  mySide, //自己是哪邊 1 / 3
  targetSid, //對方SID
  sideName, //自己是哪邊 Member   Deliver
  targetSide, //對方是哪邊 1 / 3
}) {
  const { loginCheckPostFetch } = useFunc();
  //打開後對話內容
  const [contents, setContents] = useState([]);
  //{ newMsg: false, content: {} }
  function addNewContent(newContent) {
    // console.log('進入');
    console.log(newContent.newMsg);
    console.log(newContent);

    if (newContent.newMsg) {
      // console.log('進入判斷式');
      const input = JSON.parse(newContent.content);
      if (!input.position) {
        // console.log(newContent.content);
        setContents([input, ...contents]);
        setNewContent({ newMsg: false, content: {} });
      }
    }
  }
  async function getChatDetail() {
    const postData = JSON.stringify({ targetSid, orderSid });
    const res = await loginCheckPostFetch(
      `OrderChat/${sideName}`,
      sideName,
      postData
    );
    console.log(res);
    setContents(res);
  }

  useEffect(() => {
    getChatDetail();
  }, []);
  useEffect(() => {
    addNewContent(newContent);
  }, [newContent]);
  return (
    <>
      <div className="flexSetCenter notAdminChatContent">
        {contents.map((value) => {
          return (
            <div
              key={value.sid}
              className={`notAdminChatBlocks ${
                value.post_sid === targetSid && value.post_side === targetSide
                  ? 'ChatSetLeft'
                  : 'ChatSetRight'
              }`}
            >
              <p className="notAdminTexts">{value.post_content}</p>
              <p className="notAdminTimes">{value.post_time}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ChatContent;
