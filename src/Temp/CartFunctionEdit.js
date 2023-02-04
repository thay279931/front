//+
function addCart(
  shopSid, // 店家SID
  productSid, //產品SID
  shopName, //店家名稱
  productName, //產品名稱
  price, //產品價格
  cuttedPrice, //產品特價後價格
  imageUrl, //產品圖片連結
  details //其他資訊(選擇等等)
) {
  let localCart = JSON.parse(localStorage.getItem('cart'));
  if (!localCart) {
    localCart = {};
  }
  if (!localCart.cartList) {
    localCart.cartList = {};
  }
  if (!localCart.cartList[shopSid]) {
    localCart.cartList[shopSid] = {};
    localCart.cartList[shopSid].shopTotal = 0;
    localCart.cartList[shopSid].shopName = shopName;
  }
  if (!localCart.cartList[shopSid].list) {
    localCart.cartList[shopSid].list = {};
  }
  if (!localCart.cartList[shopSid].list[productSid]) {
    localCart.cartList[shopSid].list[productSid] = {};
  }
  //本來就有就+1 沒有就設定成1
  if (localCart.cartList[shopSid].list[productSid].amount) {
    localCart.cartList[shopSid].list[productSid].amount++;
  }
  //沒設定過要設定商品資訊
  else {
    localCart.cartList[shopSid].list[productSid].amount = 1;
    localCart.cartList[shopSid].list[productSid].name = productName;
    localCart.cartList[shopSid].list[productSid].price = price;
    localCart.cartList[shopSid].list[productSid].cuttedPrice = cuttedPrice;
    localCart.cartList[shopSid].list[productSid].imageUrl = imageUrl;
    localCart.cartList[shopSid].list[productSid].details = details;
  }

  localCart.cartList[shopSid].shopTotal++;

  //店家總金額
  let shopPriceTotal = 0;
  for (let element in localCart.cartList[shopSid].list) {
    if (element) {
      const dividedProduct = localCart.cartList[shopSid].list[element];
      // console.log(shopPriceTotal);
      console.log(localCart.cartList[shopSid].list[element]);
      shopPriceTotal +=
        Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
    }
  }
  localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;

  //總數重新計算
  let countCartTotal = 0;
  for (let element in localCart.cartList) {
    if (element) {
      countCartTotal += localCart.cartList[element].shopTotal;
      // console.log(countCartTotal);
    }
  }
  //放回去
  localCart.cartTotal = countCartTotal;
  // localStorage.removeItem("cart");
  localStorage.setItem('cart', JSON.stringify(localCart));
}
//-
function reduceCart(shopSid, productSid) {
  let localCart = JSON.parse(localStorage.getItem('cart'));
  if (
    !localCart ||
    !localCart.cartList ||
    !localCart.cartList[shopSid] ||
    !localCart.cartList[shopSid].list ||
    !localCart.cartList[shopSid].list[productSid] ||
    !localCart.cartList[shopSid].list[productSid].amount
  ) {
    return;
  }
  //判斷現在幾個
  if (localCart.cartList[shopSid].list[productSid].amount > 1) {
    localCart.cartList[shopSid].list[productSid].amount--;
  } else if (localCart.cartList[shopSid].list[productSid].amount === 1) {
    delete localCart.cartList[shopSid].list[productSid].amount;
  }
  //如果是最後一個則清除 不然只-1
  localCart.cartList[shopSid].shopTotal === 1
    ? delete localCart.cartList[shopSid]
    : localCart.cartList[shopSid].shopTotal--;

  //店家總金額
  let shopPriceTotal = 0;
  for (let element in localCart.cartList[shopSid].list) {
    if (element) {
      const dividedProduct = localCart.cartList[shopSid].list[element];
      // console.log(shopPriceTotal);
      console.log(localCart.cartList[shopSid].list[element]);
      shopPriceTotal +=
        Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
    }
  }
  localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;
  //總數重新計算
  let countCartTotal = 0;
  for (let element in localCart.cartList) {
    if (element) {
      countCartTotal += localCart.cartList[element].shopTotal;
    }
  }
  //如果歸零直接刪除
  if (countCartTotal === 0) {
    localStorage.removeItem('cart');
  } else {
    localCart.cartTotal = countCartTotal;
    // localStorage.removeItem("cart");
    localStorage.setItem('cart', JSON.stringify(localCart));
  }
}
