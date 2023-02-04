import { useEffect, useState } from 'react';

function CBtest() {
  const length = 5;
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [lengthNow, setLengthNow] = useState(0);
  const limit = 3;
  // useEffect(() => {
  //   const newChecks = Array(5).map(() => {
  //     if (true) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   setChecks(newChecks);
  // }, []);
  return (
    <>
      {Array(5)
        .fill(1)
        .map((v, i) => {
          return (
            <input
              type="checkbox"
              disabled={lengthNow === limit && !checks[i] ? true : false}
              checked={checks[i]}
              onChange={(e) => {
                if (checks[i]) {
                  const newArr = [...checks];
                  newArr[i] = false;
                  // console.log(lengthNow);
                  setChecks(newArr);
                  setLengthNow(lengthNow - 1);
                } else if (lengthNow < limit && !checks[i]) {
                  const newArr = [...checks];
                  newArr[i] = true;
                  setChecks(newArr);
                  setLengthNow(lengthNow + 1);
                }
              }}
            />
          );
        })}
    </>
  );
}
export default CBtest;

const a = [
  {
    name: '加料',
    sid: 1,
    list: [
      { sid: 2, name: '珍珠', price: 15 },
      { sid: 3, name: '耶果', price: 10 },
    ],
  },
];

const b = [
  { sid: 2, name: '珍珠', price: 15 },
  { sid: 3, name: '耶果', price: 10 },
];

//10$/5km