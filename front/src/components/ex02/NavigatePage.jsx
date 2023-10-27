import React from "react";
import { useNavigate } from "react-router-dom";

const NavigatePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <button onClick={() => navigate("/")}>홈으로가기</button>
      <button onClick={() => navigate("/profiles")}>프로파일</button>
    </div>
  );
};

export default NavigatePage;
