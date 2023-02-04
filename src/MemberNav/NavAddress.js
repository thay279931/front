import { useState } from 'react';
import { useGeo } from '../Context/GeoLocationProvider';
//NAV 地址
function NavAddress({ sendAddress, setSendAddress }) {
  const [openSetAddress, setOpenSetAddress] = useState(false);
  const { getAddressByLatLng } = useGeo();
  const getAddress = async () => {
    const address = await getAddressByLatLng();
    // console.log(address);
    setSendAddress(address.address);
    localStorage.setItem('DeliveAddress', address.address);
  };
  return (
    <>
      <div className="po-r padH20">
        <p
          className="pointer navAddress"
          onClick={() => {
            // setOpenSetAddress((v) => !v);
            setOpenSetAddress((v) => !v);
          }}
        >
          <span className="fw6">{sendAddress === '' ? '' : '送到：'}</span>
          <span
            style={{ color: '#FF7C7C' }}
            onClick={() => {
              getAddress();
            }}
          >
            <i className="fa-solid fa-location-crosshairs fs18 fw6"></i>
          </span>
          <span style={{ color: '#FF7C7C' }} className="fs18 fw6">
            {sendAddress === '' ? '請設定地址' : sendAddress}
          </span>
        </p>
        {openSetAddress ? (
          <div className="bgcW navAddressInputs padV5 padH5">
            <input
              placeholder="請輸入地址"
              onChange={(e) => {
                setSendAddress(e.target.value);
                localStorage.setItem('DeliveAddress', e.target.value);
              }}
              autoFocus={true}
              className="w300 marH10"
              value={sendAddress}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOpenSetAddress(false);
                }
              }}
            />
            <p
              onClick={() => {
                setOpenSetAddress(false);
              }}
              className="flexSetCenter marH10 padV5 padH5 bgcMain pointer navAddressButton"
            >
              確定
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default NavAddress;
