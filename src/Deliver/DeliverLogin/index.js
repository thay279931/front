import './index';
import MemberLogin from '../../Components/MemberLogin';

function DeliverLogin() {

  return (
    <>
      <MemberLogin name="外送員登入" account="deliver@test.com" password="123456" kind="Deliver" />
    </>
  );
}

export default DeliverLogin;
