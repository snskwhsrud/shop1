import React, { useEffect, useState } from "react";
import { Alert, Table, Row, Col } from "react-bootstrap";

const OrderPage = ({ books }) => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const list = books.filter((book) => book.checked);
    //console.log(list);
    let sum = 0;
    let total = 0;
    list.forEach((book) => {
      sum += book.sum;
      total += book.qnt;
    });
    setSum(sum);
    setTotal(total);
    setOrders(list);
  }, []);

  return (
    <div className="my-5">
      <h1 className="text-center my-5">주문하기</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>제목</td>
            <td>가격</td>
            <td>수량</td>
            <td>금액</td>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            (book) =>
              book.checked && (
                <tr key={book.cid}>
                  <td width="30%">
                    <div className="ellipsis">
                      [{book.bid}] {book.title}
                    </div>
                  </td>
                  <td className="text-end">{book.fmtprice}원</td>
                  <td className="text-end">{book.qnt}권</td>
                  <td className="text-end">{book.fmtsum}원</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <Alert>
        <Row>
          <Col>총 주문수량: {total}권</Col>
          <Col className="text-end">
            총 주문합계: {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </Col>
        </Row>
      </Alert>
    </div>
  );
};

export default OrderPage;
