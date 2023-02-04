//WS第五層 只有詳細對話內容
import { useEffect, useState } from 'react';
const siteName = '35.221.208.241';
const tokenString = localStorage.getItem('Admin');

function ChatContent({ chattingPerson, newContent, setNewContent }) {
  //打開後對話內容
  const [contents, setContents] = useState([]);
  const { sid, side } = chattingPerson;
  const postData = JSON.stringify({ getSid: sid, getSide: side });
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
    fetch(`http://${siteName}:3001/AdminService/Choosed`, {
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
  // adminChatSetLeft adminChatSetRight
  return (
    <>
      <div className="flexSetCenter chatContent">
        {contents.map((value) => {
          return (
            <div
              key={value.sid}
              className={`chatBlocks ${
                value.post_sid === sid && value.post_side === side
                  ? 'ChatSetLeft'
                  : 'ChatSetRight'
              }`}
            >
              <div>{value.post_content}</div>
              <div>{value.post_time}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ChatContent;

/*
ws
post_content
post_time
post_sid
post_side
sid
{
  "msg": "123",
  "name": "管理者",
  "post_side": 4,
  "post_sid": 101,
  "receive_side": 1,
  "receive_sid": 28,
  "sid": 64,
  "time": "2022-11-09 22:10:23",
  "self": true
}

DB
{
  "sid": 51,
  "post_sid": 101,
  "post_side": 4,
  "receive_sid": 28,
  "receive_side": 1,
  "post_content": "j",
  "post_time": "2022-11-09 21:24:14",
  "order_sid": null,
  "name": null
}
*/
