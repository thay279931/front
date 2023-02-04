//燈箱 試作
import { useEffect } from 'react';
import './LightBoxSetting.css';
function LightBoxOnPage({ children, setOpenLightBox }) {
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = 'inherit';
    };
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setOpenLightBox(false);
        }}
        className="lightBox grayBack"
      >
        123456
        {<children />}
      </div>
    </>
  );
}
export default LightBoxOnPage;
