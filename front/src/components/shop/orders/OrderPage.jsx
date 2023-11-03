import React, { useState } from "react";
import CartPage from "./CartPage";

const OrderPage = () => {
  const [show, setShow] = useState(false);
  return (
    <>
    {!show ? 
        <CartPage/>
        :
    <div className="my-5">
      <h1 className="text-center my-5">주문하기</h1>
    </div>
    }
    </>
  );
};

export default OrderPage;
