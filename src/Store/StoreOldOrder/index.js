import StoreEvaluation from '../StoreEvaluation';
import { useFunc } from '../../Context/FunctionProvider';
import { useGeo } from '../../Context/GeoLocationProvider';
function StoreOldOrder() {
  const { notLoginGetFetch, notLoginPostFetch } = useFunc();
  const { getLatLngByAddress } = useGeo();
  const updateLATLNG = async () => {
    const res = await notLoginGetFetch('Setfakedata/GetAllAddress');
    for (let element of res) {
      const result = await getLatLngByAddress(element.address);
      console.log(result);
      element.lat = result.lat;
      element.lng = result.lng;
    }
    console.log(res);
    const upDateRes = await notLoginPostFetch(
      'Setfakedata/Updatelatlng',
      JSON.stringify(res)
    );
    console.log(upDateRes);

    //'Setfakedata/GetAllAddress'
  };
  return (
    <>
      歷史訂單
      <button
        onClick={() => {
          updateLATLNG();
        }}
      >
        get
      </button>
      {/* <StoreEvaluation /> */}
    </>
  );
}
export default StoreOldOrder;
