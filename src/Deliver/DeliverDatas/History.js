import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
const siteName = '35.221.208.241';
function History({
  order_sid,
  deliver_fee,
  name,
  deliver_check_time,
  shopname,
  address,
  deliver_take_time,
  complete_time,
}) {
  const [btn, setBtn] = useState(false);
  const [food, setFood] = useState([]);
  // const day =

  async function foodmeun() {
    const repon = await axios.get(
      `http://${siteName}:3001/deliver/foodmeun/${order_sid}`
    );
    setFood(repon.data);
  }

  return (
    <li className="Dhistorylist">
      <div className="Dhistoryitem">
        <div
          className="Dfristcontext"
          onClick={() => {
            setBtn(!btn);
            foodmeun();
          }}
        >
          <i
            className={
              btn ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
            }
          ></i>
          <p>{'D' + dayjs(deliver_check_time).format('HHMMmm')}</p>
        </div>
        <div className="Dsecondtext">
          <p className="Dhistorytitle">外送費</p>
          <p className="Dhistorytext">{deliver_fee}</p>
        </div>
        <div className="Dsecondtext">
          <p className="Dhistorytitle">客戶</p>
          <p className="Dhistorytext">{name}</p>
        </div>
        <p>{dayjs(deliver_check_time).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div>
        {btn && (
          <div className="Dhistorydetail">
            <div className="Ddetaillist">
              <div className="Ddetailcontext">
                <div>
                  <i className="fa-solid fa-store Dicon"></i>
                </div>
                <div>
                  <p>{shopname}</p>
                  <p className="Dhistorytext">{address}</p>
                </div>
              </div>
              <div>
                <p>
                  接單時間&nbsp;&nbsp;&nbsp;
                  {dayjs(deliver_check_time).format('HH:mm')}
                </p>
                <p className="Dhistorytext">
                  取餐時間&nbsp;&nbsp;&nbsp;
                  {dayjs(complete_time).format('HH:mm')}
                </p>
              </div>
            </div>
            <div className="Dfoodmeun">
              <p className="Dfoodtop">餐點內容</p>
              <ul>
                {food.map((val) => {
                  return (
                    <li className="Dfoodcontext">
                      <div className="Dhistoryfood">
                        <p>
                          {val.amount}X {val.name}
                        </p>
                        <p>NT$ {val.price}</p>
                      </div>
                      {val.detail.length == 0 ? null : (
                        <div className="Dhistoryfoodetail">
                          {val.detail.map((v, i) => {
                            return <p className="Dhfoodetail">{v.options}</p>;
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default History;
