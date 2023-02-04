import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
const siteName = '35.221.208.241';
export default function Btn(props) {
  const { setAuthDeliver } = useAuth();
  const navi = useNavigate();

  const mySubmit = async () => {
    const formData = { email: props.account, password: props.password };

    const { data } = await axios.post(
      `http://${siteName}:3001/deliverlogin`,
      formData
    );
    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem('deliver_sid', JSON.stringify(data.auth.sid));
      localStorage.setItem('deliver_name', data.auth.name);
      localStorage.setItem('onlie_state', JSON.stringify(data.success));
      localStorage.setItem('delivertake', true);
      localStorage.setItem('Deliver', data.tokenYU);
      setAuthDeliver(true);
      navi('/Deliver/DeliverConfirmOrder');
    } else {
      Swal.fire({
        icon: 'error',
        title: '登入失敗',
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem('deliver_name'); //移除
      localStorage.removeItem('onlie_state');
      localStorage.removeItem('delivertake');
      localStorage.removeItem('deliver_sid');
    }
  };
  return (
    <button
      className="m_login_button"
      onClick={() => {
        if (props.kind == 'Deliver') {
          mySubmit();
        }
      }}
    >
      登入
    </button>
  );
}
