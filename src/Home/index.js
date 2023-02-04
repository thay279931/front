import './home.css';
import Jumbotron from './Jumbotron';
import Citys from './Citys';
import Random from './Random';
import HomeCoupons from './HomeCoupons';
import SearchByAddress from './SearchByAddress';
import DailyTimeCounter from './DailyTimeCounter';
import { useState } from 'react';
function Home() {
  const [fakeCounter, setFakeCounter] = useState(0);
  return (
    <>
      {/* TODO: 這裡的順序 */}

      <SearchByAddress />

      <Jumbotron />

      {/* <SearchByAddress /> */}

      <Random setFakeCounter={setFakeCounter} />

      <Citys />

      <HomeCoupons fakeCounter={fakeCounter} />

      {/* <NewHomePage/> */}
      {/* <FoodTypes /> */}
    </>
  );
}
export default Home;
