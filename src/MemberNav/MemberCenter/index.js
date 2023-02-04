import '../Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
function MemberCenter({ setOpenMemberCenter }) {
  const location = useLocation().pathname;

  const navi = useNavigate();
  const menuList = [
    { text: '會員資料', link: '/Member', index: 0 },
    { text: '現在訂單', link: '/Member/MemberOrder', index: 1 },
    { text: '歷史訂單', link: '/Member/MemberOldOrder', index: 2 },
    { text: '紅利明細', link: '/Member/MemberPoint', index: 3 },
    { text: '最愛店家', link: '/Member/FavoriteStore', index: 4 },
    { text: '優惠券', link: '/Member/MemberCoupon', index: 5 },
    { text: '客服中心', link: '/Member/MemberService', index: 6 },
  ];
  return (
    <>
      <div className="navMemberCenter boxShadow padH20 ">
        <div className="as-e padH20 disfHiddens">
          <i
            onClick={() => {
              setOpenMemberCenter(false);
            }}
            className="fa-solid fa-circle-xmark cartX pointer"
          ></i>
        </div>
        {menuList.map((value, index) => {
          return (
            <p
              className={`${value.link === location ? 'active' : ''}`}
              key={index}
              onClick={() => {
                navi(value.link);
                setOpenMemberCenter((v) => !v);
              }}
            >
              {value.text}
            </p>
          );
        })}
      </div>
    </>
    // onBlur={setToggle(!toggle)}
  );
}
export default MemberCenter;
