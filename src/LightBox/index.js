import { useEffect } from 'react';
//需要傳入組件、關閉的函式
function LightBox({ part, setClose }) {
  useEffect(() => {
    const bodyQs = document.querySelector('body');
    bodyQs.style.overflow = 'hidden';
    return () => {
      bodyQs.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <div
        id="grayBackComponent"
        name="grayBackComponent"
        style={{
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#9999',
          zIndex: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={(e) => {
          if (e.target.id === 'grayBackComponent') {
            setClose(false);
          }
        }}
      >
        {part({ setClose })}
      </div>
    </>
  );
}
export default LightBox;
