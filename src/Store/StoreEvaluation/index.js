//店家評價 瀑布流 完成
import { useRef, useState } from 'react';
import './Evaluation.css';
import { useFunc } from '../../Context/FunctionProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const siteName = '35.221.208.241';
function StoreEvaluation() {
  const navi = useNavigate();
  const evaFrameForRef = useRef(null);
  const { notLoginGetFetch } = useFunc();
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);
  const [thirdColumn, setThirdColumn] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [startLoad, setStartLoad] = useState(true);
  const [shopSid, setShopSid] = useState(0);
  const [shopName, setShopName] = useState('');
  const [shopSrc, setShopSrc] = useState('');
  //獲得總頁數
  const getTotalPages = async () => {
    const res = await notLoginGetFetch(
      `GetStoreEvas/getEvaTotalPages?shopSid=${shopSid}`
    );
    console.log(res);
    setTotalPage(res.totalRow);
    setShopName(res.name);
    setShopSrc(res.src);
  };
  //獲得評價內容
  const getEva = async () => {
    const res = await notLoginGetFetch(
      `GetStoreEvas/getAllList/?shopSid=${shopSid}&getPage=${pageNow}`
    );
    console.log(res);
    /*{
    "name": "陳資展",
    "sid": 6,
    "order_sid": 26,
    "member_sid": 1,
    "evaluation_score": 3,
    "evaluation_content": "餐點有點太鹹了",
    "evaluation_time": "2022/12/08 13:24:47"
    } */
    const arrays = [[...firstColumn], [...secondColumn], [...thirdColumn]];
    res.forEach((v, i) => {
      const cols = i % 3;
      arrays[cols].push(v);
    });
    setFirstColumn(arrays[0]);
    setSecondColumn(arrays[1]);
    setThirdColumn(arrays[2]);
    setStartLoad(false);
    // setFirstColumn(Array(pageNow).fill(1));
    // setPageNow((v) => v + 1);
  };
  //滾動偵測
  const handleScroll = () => {
    //視窗高
    const screenHeight = window.innerHeight;
    //現在滾到哪
    const scrollNow = window.scrollY;
    //文件全高
    const bodyHeight = parseInt(
      window
        .getComputedStyle(document.querySelector('body'))
        .getPropertyValue('height')
    );
    console.log({ screenHeight, scrollNow, bodyHeight });
    //
    const scrollTop = scrollNow + screenHeight;
    if (
      bodyHeight > screenHeight &&
      //                    改這裡的數字可以改判斷點
      scrollTop > bodyHeight - 600 &&
      !startLoad &&
      pageNow <= totalPage
    ) {
      console.log(123);
      setStartLoad(true);
      setPageNow((v) => v + 1);
    }
  };
  useEffect(() => {
    const usp = new URLSearchParams(window.location.search);
    const uspShopSid = usp.get('shopSid');
    if (!uspShopSid) {
      navi(-1);
    } else {
      setShopSid(uspShopSid);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startLoad]);
  //頁數增加的時候反應
  useEffect(() => {
    if (totalPage !== 0 && shopSid !== 0) {
      getEva();
    } else if (totalPage === 0 && shopSid !== 0) {
      getTotalPages();
    }
  }, [totalPage, pageNow, shopSid]);
  return (
    <div className="evaBack">
      <div ref={evaFrameForRef} className="evaFrame">
        <div
          style={{
            background: `url(http://${siteName}:3001/images/shop/${shopSrc}) center center / cover`,
          }}
          className="disf jc-se ai-c evaTitleBar"
        >
          <div className="w33p ">
            <div
              onClick={() => {
                const usp = new URLSearchParams(window.location.search);
                const uspShopSid = usp.get('shopSid');
                navi(`/productList/?shop_sid=${uspShopSid}`);
              }}
              className="fs36 pointer backShopButton"
            >
              <i className="fa-solid fa-circle-chevron-left marr5"></i>
              返回商店
            </div>
          </div>

          <div className=" w33p flexsetCenter">
            <div className="evaTitles">
              <p className="ta-c fs36 fw6 padH20 padV10 ">店家評價</p>
              <p className="ta-c fs36 fw7 padH20 padV10 ">{shopName}</p>
            </div>
          </div>
          <div className="w33p"></div>
        </div>

        <div className="storeEvaluationOuterFrame">
          <div className="w33p padH20 padV10 disf fd-c ai-c">
            {firstColumn.map((v, i) => {
              return (
                <div className=" evaCards" key={v.sid}>
                  {/* ` http://${siteName}:3001/uploads/${v.image}` */}
                  <div className="w100p disf jc-se ai-c marb5">
                    <div className="w20p evaCardAvatar">
                      <img
                        className="w100p"
                        src={`http://${siteName}:3001/uploads/${v.image}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="w80p padH10">
                      <p className="fs24 fw6">{v.name ? v.name : '匿名訪客'}</p>
                      <p>{v.evaluation_time}</p>
                    </div>
                  </div>

                  <p className="marb20">
                    {Array(v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                    {Array(5 - v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-regular fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                  </p>

                  <p
                    style={{
                      textIndent: `${
                        v.evaluation_content.length > 20 ? '2em' : 'none'
                      }`,
                    }}
                    className="padH15 contentIndent"
                  >
                    {v.evaluation_content}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w33p padH20 padV10 disf fd-c ai-c">
            {secondColumn.map((v, i) => {
              return (
                <div className=" evaCards" key={v.sid}>
                  {/* ` http://${siteName}:3001/uploads/${v.image}` */}
                  <div className="w100p disf jc-se ai-c marb5">
                    <div className="w20p">
                      <img
                        className="w100p"
                        src={`http://${siteName}:3001/uploads/${v.image}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="w80p padH10">
                      <p className="fs24 fw6">{v.name ? v.name : '匿名訪客'}</p>
                      <p>{v.evaluation_time}</p>
                    </div>
                  </div>

                  <p className="marb20">
                    {Array(v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                    {Array(5 - v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-regular fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                  </p>

                  <p
                    style={{
                      textIndent: `${
                        v.evaluation_content.length > 20 ? '2em' : 'none'
                      }`,
                    }}
                    className="padH15 contentIndent"
                  >
                    {v.evaluation_content}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w33p padH20 padV10 disf fd-c  ai-c">
            {thirdColumn.map((v, i) => {
              return (
                <div className=" evaCards" key={v.sid}>
                  {/* ` http://${siteName}:3001/uploads/${v.image}` */}
                  <div className="w100p disf jc-se ai-c marb5">
                    <div className="w20p">
                      <img
                        className="w100p"
                        src={`http://${siteName}:3001/uploads/${v.image}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="w80p padH10">
                      <p className="fs24 fw6">{v.name ? v.name : '匿名訪客'}</p>
                      <p>{v.evaluation_time}</p>
                    </div>
                  </div>

                  <p className="marb20">
                    {Array(v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                    {Array(5 - v.evaluation_score)
                      .fill(1)
                      .map((v, i) => (
                        <i
                          key={i}
                          className="fa-regular fa-star fs18 fontMainColor"
                        ></i>
                      ))}
                  </p>

                  <p
                    style={{
                      textIndent: `${
                        v.evaluation_content.length > 20 ? '2em' : 'none'
                      }`,
                    }}
                    className="padH15 contentIndent"
                  >
                    {v.evaluation_content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreEvaluation;
