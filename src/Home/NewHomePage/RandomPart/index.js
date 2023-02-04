//首頁 隨機部分
import { useState } from 'react';
import LightBoxOnPage from './LightBoxOnPage';
function RandomPart({ setOpen }) {
  const [openLightBox, setOpenLightBox] = useState(false);
  return (
    <>
      <div
        // onClick={() => {
        //   setOpen((v) => !v);
        // }}
        className="randomContentOnHomePage"
      >
        <p className="randomTitleOnHomePage">
          想來想去還是不知道要吃什麼？試試隨饗！
        </p>
        <div
          onClick={() => {
            setOpenLightBox(true);
          }}
          className="randomButtonOnHomePage"
        >
          <p>隨饗</p>
        </div>
      </div>
      {openLightBox ? (
        <LightBoxOnPage setOpenLightBox={setOpenLightBox} />
      ) : null}
    </>
  );
}
export default RandomPart;
