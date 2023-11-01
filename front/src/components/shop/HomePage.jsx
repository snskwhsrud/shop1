import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Spinner,
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import Pagination from "react-js-pagination";
import "./Pagination.css";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const navi = useNavigate();
  const size = 6;
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;
  const path = location.pathname;
  const [query, setQuery] = useState(
    search.get("query") ? search.get("query") : ""
  );

  const getBooks = async () => {
    const url = `/books/list.json?query=${query}&page=${page}&size=${size}&uid=${sessionStorage.getItem(
      "uid"
    )}`;
    setLoading(true);
    const res = await axios(url);
    //console.log(res.data);
    setBooks(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, [location]);

  const onChangePage = (page) => {
    navi(`${path}?query=${query}&page=${page}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navi(`${path}?query=${query}&page=${page}`);
  };

  const onClickHeart = async (bid) => {
    if (sessionStorage.getItem("uid")) {
      await axios.post("/books/insert/favorite", {
        uid: sessionStorage.getItem("uid"),
        bid: bid,
      });
      getBooks();
    } else {
      navi("/users/login");
    }
  };

  const onClickFillHeart = async (bid) => {
    await axios.post("/books/delete/favorite", {
      uid: sessionStorage.getItem("uid"),
      bid: bid,
    });
    getBooks();
  };

  if (loading)
    return (
      <div className="my-5 text-center">
        <Spinner variant="primary" />
      </div>
    );
  return (
    <div className="my-5">
      <Row className="mb-3">
        <Col md={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="제목,내용,저자"
              />
              <Button>검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className="mt-2">검색수: {total}권</Col>
      </Row>
      <Row>
        {books.map((book) => (
          <Col xs={6} md={4} lg={2} className="mb-3" key={book.bid}>
            <Card>
              <Card.Body>
                <NavLink to={`/books/info/${book.bid}`}>
                  <img
                    src={book.image || "http://via.placeholder.com/170x250"}
                    width="100%"
                  />
                </NavLink>
                <small className="ellipsis mt-2">{book.title}</small>
              </Card.Body>
              <Card.Footer className="text-end">
                {book.rcnt === 0 || (
                  <span>
                    <span className="message">
                      <BiMessageDetail />
                    </span>
                    <span className="ms-1 rcnt">{book.rcnt}</span>
                  </span>
                )}
                <span className="ms-3">
                  <span className="heart">
                    {book.ucnt === 0 ? (
                      <BsHeart onClick={() => onClickHeart(book.bid)} />
                    ) : (
                      <BsHeartFill onClick={() => onClickFillHeart(book.bid)} />
                    )}
                  </span>
                  <span className="ms-1 fcnt">{book.fcnt}</span>
                </span>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {total > 6 && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={onChangePage}
        />
      )}
    </div>
  );
};

export default HomePage;
