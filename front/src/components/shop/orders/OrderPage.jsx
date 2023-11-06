import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Alert,
  Row,
  Col,
  InputGroup,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import ModalPostCode from "../users/ModalPostCode";
import { BoxContext } from "../BoxContext";

const OrderPage = ({ books }) => {
  const [loading, setLoading] = useState(false);
  const { setBox } = useContext(BoxContext);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0); //주문할 전체상품 갯수
  const [sum, setSum] = useState(0); //주문할 상품합계
  const [form, setForm] = useState({
    uid: "",
    uname: "",
    phone: "",
    address1: "",
    address2: "",
  });
  const { uid, uname, phone, address1, address2 } = form;
  const getUser = async () => {
    const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
    console.log(res.data);
    setForm(res.data);
  };

  useEffect(() => {
    const list = books.filter((book) => book.checked);
    setOrders(list);
    let sum = 0;
    let total = 0;
    list.forEach((book) => {
      sum += book.sum;
      total += book.qnt;
    });
    setSum(sum);
    setTotal(total);
    getUser();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onOrder = () => {
    setBox({
      show: true,
      message: "주문을 진행하시겠습니까?",
      action: async () => {
        setLoading(true);
        const data = { ...form, sum, uid };
        //console.log(data);
        const res = await axios.post("/orders/insert/purchase", data);
        const pid = res.data;
        //주문상품저장
        for (const order of orders) {
          const data = { ...order, pid };
          //console.log(data);
          await axios.post("/orders/insert", data);
        }
        setLoading(false);
        window.location.href = "/";
      },
    });
  };

  if (loading)
    return (
      <div className="text-center my-e">
        <Spinner />
      </div>
    );

  return (
    <div className="my-5">
      <h1 className="text-center mb-5">주문하기</h1>
      <Table bordered striped hover>
        <thead>
          <tr className="text-center">
            <td>제목</td>
            <td>가격</td>
            <td>수량</td>
            <td>금액</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((book) => (
            <tr key={book.cid}>
              <td width="40%">
                <div className="ellipsis">
                  [{book.bid}] {book.title}
                </div>
              </td>
              <td className="text-end">{book.fmtprice}원</td>
              <td className="text-end">{book.qnt}권</td>
              <td className="text-end">{book.fmtsum}원</td>
            </tr>
          ))}
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
      <div className="my-5">
        <h1 className="text-center mb-5">주문자정보</h1>
        <Card className="p-3">
          <form>
            <InputGroup className="mb-3">
              <InputGroup.Text>받는이</InputGroup.Text>
              <Form.Control onChange={onChange} value={uname} name="uname" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>전화번호</InputGroup.Text>
              <Form.Control onChange={onChange} value={phone} name="phone" />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text>받을주소</InputGroup.Text>
              <Form.Control
                onChange={onChange}
                value={address1}
                name="address1"
              />
              <ModalPostCode user={form} setUser={setForm} />
            </InputGroup>
            <Form.Control
              onChange={onChange}
              placeholder="상세주소"
              value={address2}
              name="address2"
            />
          </form>
        </Card>
        <div className="text-center my-3">
          <Button onClick={onOrder} className="px-5" variant="success">
            주문하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
