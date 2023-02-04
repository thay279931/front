import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunc } from '../../Context/FunctionProvider';
const siteName = '35.221.208.241';

function Jumbotron() {
  const navi = useNavigate();
  const { notLoginGetFetch } = useFunc();
  const [storeData, setStoreData] = useState([
    { sid: 0, name: '', src: '', average_evaluation: 0 },
  ]);
  const getIMgs = async () => {
    const res = await notLoginGetFetch('getJumbotronImgs');
    res.push(res[0]);
    console.log(res);
    setStoreData(res);
    /*{
    "sid": 64,
    "name": "拼拼看雙主食便當",
    "src": "store64.jpg",
    "average_evaluation": 0.8
    } */
  };

  useEffect(() => {
    getIMgs();
  }, []);
  return (
    <>
      <div className="w100p h350 ta-c padV50 padH50 of-h zi10">
        <div className="outterFrame h100p">
          <div className="pa_frame h100p">
            <div className="card_plate">
              {storeData.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="imgFR po-r  pointer"
                    onClick={() => {
                      navi(`/productList/?shop_sid=${v.sid}`);
                    }}
                  >
                    <p className="jumbotronEvaluation">
                      {v.average_evaluation}
                      <i className="fa-solid fa-star fontSubColor "></i>
                    </p>
                    <p className="jumbotronShopName">{v.name}</p>
                    <img
                      src={
                        v.src !== ''
                          ? `http://${siteName}:3001/images/shop/${v.src}`
                          : null
                      }
                      alt={v.name}
                    />
                  </div>
                );
              })}
              {/* <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP001.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP002.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP003.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP001.jpg`} alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Jumbotron;
