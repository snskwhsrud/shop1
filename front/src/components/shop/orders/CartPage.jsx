import React, { useEffect, useState } from "react";
import OrderPage from "./OrderPage";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";

const CartPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const search = new URLSearchParams(location.search);
  const show = search.get("show") ? search.get("show") : "cart";
  const navi = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClickOrder = () => {
    navi = `${pathname}$show=order`;
  };

  const getCart = async () => {
    setLoading(true);
    const res = await axios.get(
      `/cart/list.json?uid=${sessionStorage.getItem("uid")}`
    );
    let list = res.data.list;
    //console.log(list);
    setBooks(list);
    setLoading(false);
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading)
    return (
      <div className="my-5 text-center">
        <Spinner variant="primary" />
      </div>
    );
  return (
    <>
      {show === "cart" && (
        <div className="my-5">
          <h1 className="text-center mb-5">장바구니</h1>
          <div>
            <Button onClick={onClickOrder}>주문하기</Button>
          </div>
        </div>
      )}

      {show === "order" && <OrderPage />}
    </>
  );
};

export default CartPage;
