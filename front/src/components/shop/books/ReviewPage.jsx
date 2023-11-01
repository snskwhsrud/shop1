import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ReviewPage = ({ location }) => {
  const [page, setPage] = useState(1);
  const size = 3;
  const { bid } = useParams();
  //console.log(pathname);

  const getReviews = async () => {
    const url = `/review/list.json?page=${page}&size=${size}&bid=${bid}`;
    const res = await axios(url);
    console.log(res.data);
  };

  useEffect(() => {
    getReviews();
  }, [page]);

  const onClickWrite = () => {
    sessionStorage.setItem("target", location.pathname);
    window.location.href = "/users/login";
  };

  return (
    <div className="py-3">
      {!sessionStorage.getItem("uid") ? (
        <div className="px-5">
          <Button className="w-100" onClick={onClickWrite}>
            리뷰작성
          </Button>
        </div>
      ) : (
        <div>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="내용을 입력하세요."
          />
          <div className="text-end mt-2">
            <Button className="px-5">등록</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
