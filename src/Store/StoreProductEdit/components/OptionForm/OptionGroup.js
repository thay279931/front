import React, { useEffect, useState } from 'react';

function OptionGroup({
  ot,
  data,
  optionBoolean,
  setOptionBoolean,
  otIndex,
  // test
  testDetails,
  setTestDetails,
}) {
  const min = ot.min;
  const max = ot.max;

  useEffect(() => {
    // 如果這個選項類別可以不用選的話，自動回報optionBoolean是正確的。
    // if (data.options_types.length === 0) {
    //   const newOptionBoolean = [...optionBoolean];
    //   console.log(newOptionBoolean);
    //   newOptionBoolean[otIndex] = true;
    //   setOptionBoolean(newOptionBoolean);
    // }
  }, []);

  return (
    <>
      {data.options
        .filter((opt) => {
          return opt.options_type_sid === ot.sid;
        })
        .map((opt, i) => {
          return (
            <div className="opt-box">
              <label
                className={
                  testDetails[otIndex] &&
                  !testDetails[otIndex].list[i] &&
                  testDetails[otIndex].list.filter((v) => {
                    return !!v === true;
                  }).length === max &&
                  (min !== 1 || max !== 1) &&
                  !(min === 0 && max === 1)
                    ? 'inActive'
                    : ''
                }
              >
                {min === 1 && max === 1 ? (
                  <input
                    type="radio"
                    value={opt.sid}
                    name={ot.name}
                    checked={
                      testDetails[otIndex]
                        ? !!testDetails[otIndex].list[i]
                        : false
                    }
                    onChange={() => {
                      // test
                      const testThisIndex = testDetails.findIndex((detail) => {
                        return detail.sid === ot.sid;
                      });
                      const testNewDetails = [...testDetails];
                      if (!testNewDetails[testThisIndex]) {
                        return;
                      }
                      testNewDetails[testThisIndex].list.forEach((v, index) => {
                        testNewDetails[testThisIndex].list[index] = false;
                      });
                      testNewDetails[testThisIndex].list[i] = {
                        sid: opt.sid,
                        name: opt.name,
                        price: opt.price,
                      };
                      setTestDetails(testNewDetails);

                      // 檢測數量
                      if (
                        testDetails[otIndex].list.filter((v) => {
                          return !!v === true;
                        }).length >= min ||
                        testDetails[otIndex].list.filter((v) => {
                          return !!v === true;
                        }).length <= max
                      ) {
                        const newOptionBoolean = [...optionBoolean];
                        newOptionBoolean[otIndex] = true;
                        setOptionBoolean(newOptionBoolean);
                      }
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name={ot.name}
                    value={opt.name}
                    checked={
                      testDetails[otIndex]
                        ? !!testDetails[otIndex].list[i]
                        : false
                    }
                    onChange={(e) => {
                      // check-test
                      const testNewCheckState = [...testDetails[otIndex].list];

                      if (!testNewCheckState[i] && min === 0 && max === 1) {
                        // test
                        const testThisIndex = testDetails.findIndex(
                          (detail) => {
                            return detail.sid === ot.sid;
                          }
                        );
                        const testNewDetails = [...testDetails];
                        if (!testNewDetails[testThisIndex]) {
                          return;
                        }
                        testNewDetails[testThisIndex].list.forEach(
                          (v, index) => {
                            testNewDetails[testThisIndex].list[index] = false;
                          }
                        );
                        testNewDetails[testThisIndex].list[i] = {
                          sid: opt.sid,
                          name: opt.name,
                          price: opt.price,
                        };
                        setTestDetails(testNewDetails);

                        // 檢測數量
                        if (
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length >= min ||
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length <= max
                        ) {
                          const newOptionBoolean = [...optionBoolean];
                          newOptionBoolean[otIndex] = true;
                          setOptionBoolean(newOptionBoolean);
                        }
                      } else if (!testNewCheckState[i]) {
                        // test
                        const testThisIndex = testDetails.findIndex(
                          (detail) => {
                            return detail.sid === ot.sid;
                          }
                        );

                        const testNewDetails = [...testDetails];
                        testNewDetails[testThisIndex].list[i] = {
                          sid: opt.sid,
                          name: opt.name,
                          price: opt.price,
                        };
                        setTestDetails(testNewDetails);

                        // 檢測目前所選數量
                        if (
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length >= min &&
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length <= max
                        ) {
                          const newOptionBoolean = [...optionBoolean];
                          newOptionBoolean[otIndex] = true;
                          setOptionBoolean(newOptionBoolean);
                        }
                      } else {
                        // test
                        const testThisIndex = testDetails.findIndex(
                          (detail) => {
                            return detail.sid === ot.sid;
                          }
                        );
                        const testNewDetails = [...testDetails];
                        testNewDetails[testThisIndex].list[i] = false;
                        setTestDetails(testNewDetails);

                        // 檢測目前所選數量
                        if (
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length >= min &&
                          testDetails[otIndex].list.filter((v) => {
                            return !!v === true;
                          }).length <= max
                        ) {
                          // const newOptionBoolean = [...optionBoolean];
                          // newOptionBoolean[otIndex] = true;
                          // setOptionBoolean(newOptionBoolean);
                        } else {
                          const newOptionBoolean = [...optionBoolean];
                          newOptionBoolean[otIndex] = false;
                          setOptionBoolean(newOptionBoolean);
                        }
                      }
                    }}
                    disabled={
                      testDetails[otIndex] &&
                      !testDetails[otIndex].list[i] &&
                      testDetails[otIndex].list.filter((v) => {
                        return !!v === true;
                      }).length === max &&
                      !(min === 0 && max === 1)
                        ? true
                        : false
                    }
                  />
                )}

                <div className="option-words">
                  <p>{opt.name}</p>
                  <p>{opt.price === 0 ? 'Free' : `$ ${opt.price}`}</p>
                </div>
              </label>
            </div>
          );
        })}
    </>
  );
}

export default OptionGroup;
