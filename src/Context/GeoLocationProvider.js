import React, { useState, useContext, createContext } from 'react';
import Geocode from 'react-geocode';
import keys from '../keys';
const GeoContext = createContext(null);
// https://www.npmjs.com/package/react-geocode
export const GeoLocationProvider = ({ children }) => {
  Geocode.setApiKey(keys.gmap);
  // Geocode.setApiKey('456465465132156456456');
  Geocode.setLanguage('zh-tw');
  Geocode.setRegion('tw');
  Geocode.setLocationType('ROOFTOP');
  //計算兩地距離 輸入兩個地址後計算
  const calculateDistance = async (firstAddress, secondAddress) => {
    const positions = { first: {}, second: {} };
    await Geocode.fromAddress(firstAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        positions.first = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    await Geocode.fromAddress(secondAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        positions.second = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
    // console.log(positions);
    //latitude 緯度差
    const latDistance = positions.first.lat - positions.second.lat;
    //longitude 經度差  X軸
    const lngDistance = positions.first.lng - positions.second.lng;
    //地球半徑 6378.137KM  OR 6371KM
    //設所求點A ，緯度角β1 ，經度角α1 ；點B ，緯度角β2 ，經度角α2。則距離S=R·arc cos[cosβ1cosβ2cos（α1-α2）+sinβ1sinβ2]，其中R為球體半徑。
    const getDistance =
      6378.137 *
      2 *
      Math.asin(
        Math.pow(
          Math.sin(((latDistance / 2) * Math.PI) / 180) *
            Math.sin(((latDistance / 2) * Math.PI) / 180) +
            Math.cos((positions.first.lat * Math.PI) / 180) *
              Math.cos((positions.second.lat * Math.PI) / 180) *
              Math.sin(((lngDistance / 2) * Math.PI) / 180) *
              Math.sin(((lngDistance / 2) * Math.PI) / 180),
          0.5
        )
      );
    console.log(getDistance);
    return getDistance;
  };
  //===============================================分隔線================================================
  //傳入經緯度資訊  { lat, lng }  得到距離
  const calculateDistanceByLatLng = (positionA, positionB) => {
    const latDistance = positionA.lat - positionB.lat;
    const lngDistance = positionA.lng - positionB.lng;
    const getDistance =
      6378.137 *
      2 *
      Math.asin(
        Math.pow(
          Math.sin(((latDistance / 2) * Math.PI) / 180) *
            Math.sin(((latDistance / 2) * Math.PI) / 180) +
            Math.cos((positionA.lat * Math.PI) / 180) *
              Math.cos((positionB.lat * Math.PI) / 180) *
              Math.sin(((lngDistance / 2) * Math.PI) / 180) *
              Math.sin(((lngDistance / 2) * Math.PI) / 180),
          0.5
        )
      );
    return getDistance;
  };
  //===============================================分隔線================================================
  //由地址獲得位置
  const getLatLngByAddress = async (address) => {
    let locate = {};
    await Geocode.fromAddress(address).then(
      (response) => {
        locate = response.results[0].geometry.location;
      },
      (error) => {
        console.error(error);
      }
    );
    return locate;
  };
  //===============================================分隔線================================================
  //由位置獲得地址
  const getAddressByLatLng = async () => {
    const positions = { lat: 0, lng: 0, address: '' };
    await navigator.geolocation.getCurrentPosition((getPosition) => {
      const lat = getPosition.coords.latitude;
      const lng = getPosition.coords.longitude;
      positions.lat = lat;
      positions.lng = lng;
    });
    await Geocode.fromLatLng(positions.lat, positions.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        positions.address = address;
        // console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
    return positions;
  };
  //===============================================分隔線================================================
  return (
    <GeoContext.Provider
      value={{
        calculateDistance,
        calculateDistanceByLatLng,
        getLatLngByAddress,
        getAddressByLatLng,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => useContext(GeoContext);
