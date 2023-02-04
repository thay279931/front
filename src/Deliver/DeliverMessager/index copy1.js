// import axios from 'axios';

// function Takebtn(){
//   const ordersid = localStorage.getItem('order_sid');
//   async function foodget() {
//     await axios.put(`http://localhost:3001/deliver/deliverorder/${ordersid}`);
//   }
//   return(
//     <button type='button'
//       onClick={()=>{
//         foodget();
//       }}
//     >
//     已取餐
//     </button>
//   )
// }
// function Finishbtn(){
//   const ordersid = localStorage.getItem('order_sid');
//   async function foodreach(){
//     await axios.put(`http://localhost:3001/deliver/finishdeliverorder/${ordersid}`);
//   }
//   return(
//     <button type='button'
//       onClick={()=>{
//         foodreach();
//         localStorage.setItem('delivertake',true)
//       }}
//     >
//       已送達
//     </button>
//   )
// }


// function DeliverMessager() {
//   return (
//     <>
//       <Takebtn />
//       <Finishbtn />
//     </>
//   );
// }
// export default DeliverMessager;


// function DeliverStatistics() {
//   return <>外送員統計</>;
// }

// export default DeliverStatistics;
