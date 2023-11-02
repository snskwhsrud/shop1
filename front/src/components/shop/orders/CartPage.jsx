import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";

const CartPage = () => {
  const size = 5;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    setLoading(true);
    const res = await axios.get(
      `/cart/list.json?uid=${sessionStorage.getItem(
        "uid"
      )}&size=${size}&page=${page}`
    );
    console.log(res.data);
    setBooks(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    getCart();
  }, [page]);

  if (loading)
    return (
      <div className="my-5 text-center">
        <Spinner variant="primary" />
      </div>
    );

  return (
    <div className="my-5">
      <h1 className="text-center">장바구니목록</h1>
    </div>
  );
};

export default CartPage;
