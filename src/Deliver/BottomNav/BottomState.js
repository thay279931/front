
import { useNavigate, useLocation } from 'react-router-dom';

import './Bottom.css';

// function BottomNav({ setToggle, toggle }) {
function BottomNav() {
  const location = useLocation().pathname;
  const navi = useNavigate();

  const bottomList = [
    { text: '狀態', icon:'fa-solid fa-check Dnavicon', link: '/Deliver/DeliverConfirmOrder' },
    { text: '訂單', icon:'fa-solid fa-list Dnavicon', link: '/Deliver/DeliverOrder' },
    { text: '地圖', icon:'fa-sharp fa-solid fa-map Dnavicon', link: '/Deliver/DeliverMap' },
    { text: '過往紀錄', icon:'fa-regular fa-clock Dnavicon', link: '/Deliver/DeliverDatas' },
    { text: '統計 ', icon:'fa-solid fa-chart-simple Dnavicon', link: '/Deliver/DeliverMessager' },
  ];

  return (
    <>
      <url className="DBottomNav">
        {bottomList.map((value, index) => {
          return (
            <li
              className={
                //這段無法執行
                '/Deliver/' + location.split('/')[2] === value.link ? 'DNavber Dactive' : 'DNavber'
              }
              key={index}
              onClick={() => {
                navi(value.link);
                // setToggle(!toggle);
              }}
            >
              <i className={value.icon}></i>
              <p className='Dicontext'>{value.text}</p>
            </li>
          );
        })}
      </url>
    </>
  );
  
}


export default BottomNav;
