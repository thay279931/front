import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePay } from '../../../Context/PayPageContext';
//首頁 搜尋部分
function SearchPart({ setOpen }) {
  const { sendAddress, setSendAddress } = usePay();
  const navi = useNavigate();
  return (
    <>
      <div
        // onClick={() => {
        //   setOpen((v) => !v);
        // }}
        className="flexSetCenter"
      >
        <p>各式美食 馬上點馬上到</p>
        <div>
          <input
            placeholder="請輸入欲送達的地址"
            value={sendAddress}
            onChange={(e) => {
              localStorage.setItem('DeliveAddress', e.target.value);
              setSendAddress(e.target.value);
            }}
          />
        </div>
        <div
          onClick={() => {
            navi(`/Shopping?order=distance`);
          }}
        >
          外送
        </div>
      </div>
    </>
  );
}
export default SearchPart;
