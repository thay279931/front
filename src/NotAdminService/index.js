//會員 WS 第一層 開啟WS 只對管理者發言
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotAdminService.css';
import Swal from 'sweetalert';

import ChatBox from './ChatBox';
const siteName = '35.221.208.241';

function MemberService({ sideName }) {
  const tokenString = localStorage.getItem(sideName);
  const navi = useNavigate();
  const socket = new WebSocket(`ws://${siteName}:3001`);
  useEffect(() => {
    return () => {
      socket.close();
      console.log('end');
    };
  }, []);
  function sendToken() {
    if (!tokenString) {
      Swal.fire('沒登入');
      navi(`/${sideName}Login`);
    }
    socket.send(JSON.stringify({ token: tokenString }));
  }
  socket.addEventListener('open', () => {
    sendToken();
    console.log('start');
  });
  return (
    <>
      <ChatBox socket={socket} sideName={sideName} />
    </>
  );
}
export default MemberService;
