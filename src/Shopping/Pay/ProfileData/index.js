//第二段 個人資料
import { useEffect, useState } from 'react';
import PayTitleBlock from '../PayTitleBlock';
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
const siteName = '35.221.208.241';
function ProfileData() {
  const { profile, setProfile } = usePay();

  const { loginCheckGetFetch } = useFunc();

  //修改開關
  const [edit, setEdit] = useState(false);
  //loginCheckGetFetch('PayGetProfile','Member')
  //獲得個人資料
  const getProfileData = async () => {
    const datas = await loginCheckGetFetch('Pay/PayGetProfile', 'Member');
    setProfile(datas);
  };
  //INPUT修改函式
  const changeValue = (e) => {
    const names = e.target.name;
    setProfile({ ...profile, [names]: e.target.value });
  };

  useEffect(() => {
    // getProfileData();
    getProfileData();
    // console.log();
  }, []);

  //

  /*{
    "name": "ゆう",
    "phone": "0952400243",
    "email": "test@test.com"
  }*/
  //profile.name
  //profile.phone
  //profile.email
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={2} titleString={'取餐人資料'} />
        {/* INPUT群 */}
        <div className="disf ta-c jc-sb fw-w marb20 ai-c  fd-c">
          <div className="marb10 w100p padH5">
            <p className="fs24 fw6 marb10">姓名</p>
            {edit ? (
              <input
                className="w100p padV5 fs18 padH5"
                name="name"
                value={profile.name}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="fs18 padV1">{profile.name}</p>
            )}
          </div>

          <div className="marb10 w100p padH5">
            <p className="fw6 fs24 marb10">E-mail</p>
            {edit ? (
              <input
                className="w100p padV5 fs18 padH5"
                name="email"
                value={profile.email}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="fs18 padV1">{profile.email}</p>
            )}
          </div>

          <div className="marb10 w100p padH5">
            <p className="fs24 fw6 marb10">連絡電話</p>
            {edit ? (
              <input
                className="w100p padV5 fs18 padH5"
                name="phone"
                value={profile.phone}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="fs18 padV1">{profile.phone}</p>
            )}
          </div>
        </div>
        {/* 按鈕 */}
        <div
          className="marSetRight payPageButton"
          onClick={() => {
            setEdit((v) => !v);
          }}
        >
          {edit ? '儲存' : '修改'}
        </div>
      </div>
    </>
  );
}
export default ProfileData;
