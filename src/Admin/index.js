import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import Footer from '../Footer';
//這邊要放會員NAVBAR
function Admin() {
  return (
    <>
      <AdminNav />
      <div className="container">
        <Outlet />
        <Footer styles={{ position: 'fixed', bottom: 0 }} />
      </div>
    </>
  );
}
export default Admin;
