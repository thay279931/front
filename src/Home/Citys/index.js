//首頁 城市段
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Citys.css';
const siteName = '35.221.208.241';
function Citys() {
  const [scrollOver, setScrollOver] = useState(false);
  const cityGroup = useRef(null);
  const navi = useNavigate();
  const cityList = [
    { name: '台北市', src: 'TPE.jpg', id: 1 },
    { name: '新北市', src: 'NTPC.jpg', id: 2 },
    { name: '桃園市', src: 'TYC.jpg', id: 3 },
    { name: '台中市', src: 'TCC.jpg', id: 4 },
    { name: '台南市', src: 'TNC.jpg', id: 5 },
    { name: '高雄市', src: 'GHC.jpg', id: 6 },
  ];

  function checkScroll(e) {
    // console.log('scroll');
    const scrollNow = window.scrollY;
    const framePosition = cityGroup.current.offsetTop;

    const frameHeight = parseInt(
      window.getComputedStyle(cityGroup.current).getPropertyValue('height')
    );
    // console.log('現在滑到');
    // console.log(scrollNow);
    // console.log('框的位置');
    // console.log(framePosition);
    // console.log('框的高');
    // console.log(frameHeight);
    //widow height
    if (scrollNow + window.innerHeight > framePosition + frameHeight / 2) {
      setScrollOver(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div
      ref={cityGroup}
      // style={{ height: '600px' }}
    >
      <p className="homePageLogos">城市</p>
      <div className="FR po-r">
        {cityList.map((value) => {
          return (
            <div
              onClick={() => {
                if (value.id === 1) {
                  navi('/City/Taipei');
                }
              }}
              className={`hex ${
                value.id % 2 === 0 ? ' move_even' : ' move_odd'
              } ${scrollOver ? ' movein' : ''}`}
              key={value.id}
            >
              <div className="hexImgFR">
                <img
                  src={`http://${siteName}:3001/images/citys/${value.src}`}
                  alt={value.name}
                />
              </div>
              <div className="hex_txt">{value.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Citys;
