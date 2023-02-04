import axios from 'axios';
import { useEffect, useState } from 'react';
import ListTable from './ListTable';
import { useAuth } from '../../Context/AuthProvider';
import './index.css';
const siteName = '35.221.208.241';
function DeliverConfirmOrder() {
  const { authDeliver } = useAuth();
  const [listData, setListData] = useState([]);
  const [showTextStatus, setShowTextStatus] = useState(false);

  const getonlineState = () => {
    const loginStatus = localStorage.getItem('onlie_state');
    setShowTextStatus(loginStatus);
  };

  async function getList() {
    const response = await axios.get(
      `http://${siteName}:3001/deliver/deliverlist`
    );
    setListData(response.data.rows1);
    console.log(listData);
  }

  useEffect(() => {
    getList();
  }, [listData]);
  useEffect(() => {
    getonlineState();
  }, [authDeliver]);

  return (
    <>
      <div className="Dstates">
        <p>使用狀態</p>
        <div className="Donliestate">
          <div className={showTextStatus ? 'Donlie' : 'Donlie active'}></div>
          <p>{showTextStatus ? '在線中' : '隱藏'}</p>
        </div>
      </div>
      <ul className="Doldlist">
        {/* ---------------------接單列表------------------ */}
        {listData.length > 0 ? (
          <>
            {listData.map((value) => {
              const { sid } = value;
              return <ListTable key={sid} {...value} />;
            })}
          </>
        ) : (
          <div className="Dnothingorder">
            <p>暫無訂單</p>
          </div>
        )}

        {/* ---------------------------------------------- */}
      </ul>
    </>
  );
}
export default DeliverConfirmOrder;
