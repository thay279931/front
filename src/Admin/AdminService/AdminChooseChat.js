//WS第三層 選擇對話對象框框
function AdminChooseChat({
  datas,
  side,
  sideName,
  setChatting,
  setChattingPerson,
}) {
  return (
    <div className="adminChooseChat flexSetCenter">
      <h2>{sideName}</h2>
      <div>
        {Object.keys(datas).map((v) => {
          return (
            <div
              className="adminChatPersonsBlock"
              key={datas[v].post_sid}
              onClick={() => {
                // console.log(datas[v].name);
                setChattingPerson({ sid: datas[v].post_sid, side: side });
                setChatting(true);
              }}
            >
              <p>{datas[v].name}</p>
              <p>{datas[v].post_time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
AdminChooseChat.defaultProps = {
  datas: { 0: { post_sid: 0, name: '無資料', post_time: '' } },
};

export default AdminChooseChat;
//{
//  side: 0,
//  sid: 0,
//}
