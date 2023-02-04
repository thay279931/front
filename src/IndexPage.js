import { Outlet } from 'react-router-dom';
import MemberNav from './MemberNav';
import Footer from './Footer';
//這邊要放會員NAVBAR
function IndexPage() {
  return (
    <>
      <MemberNav />
      <div className="container">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default IndexPage;
