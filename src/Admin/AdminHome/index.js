import { useState } from 'react';
import LightBox from '../../LightBox';
import PartTest from './PartTest';
function AdminHome() {
  const [open, setOpen] = useState(false);
  const divs = () => <div>123456789</div>;
  return (
    <>
      <h2>測試</h2>
      <div style={{ height: '2000px' }}>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          CLICK
        </button>
      </div>
      {open ? <LightBox setClose={setOpen} part={PartTest} /> : null}
    </>
  );
}
export default AdminHome;
