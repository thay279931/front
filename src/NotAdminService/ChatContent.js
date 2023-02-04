//會員WS第三層 只有詳細對話內容 只對管理者發言
import { useEffect, useState } from 'react';
const siteName = '35.221.208.241';

function ChatContent({ newContent, setNewContent, sideName }) {
  const tokenString = localStorage.getItem(sideName);
  //打開後對話內容
  const [contents, setContents] = useState([]);
  const postData = JSON.stringify({ getSid: 101, getSide: 4 });
  //{ newMsg: false, content: {} }
  function addNewContent(newContent) {
    // console.log('進入');
    if (newContent.newMsg) {
      // console.log('進入判斷式');
      // console.log(newContent.content);
      setContents([JSON.parse(newContent.content), ...contents]);
      setNewContent({ newMsg: false, content: {} });
    }
  }

  function getChatDetail() {
    fetch(`http://${siteName}:3001/${sideName}/ChatServiceToAdmin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenString,
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log(res);
        //   console.log(res);
        setContents(res.reverse());
      });
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
                value.post_sid === 101 && value.post_side === 4
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
