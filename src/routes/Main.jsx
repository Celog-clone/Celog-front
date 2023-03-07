import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header } from "components";
import { getPosts } from "api";

function Main() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { data } = useQuery("getPosts", getPosts, {
    onSuccess: (response) => {
      setList(response.data.response);
    },
  });

  //무한스크롤
  return (
    <>
      <Header />
      <StWrap>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <StCard
                onClick={() => {
                  navigate(`/${item.id}`);
                }}
                key={item.id}
              >
                <StImg src={item.image} alt="img" />
                {item.image}
                <StContents>
                  <div>{item.title}</div>
                  <div>{item.contents}</div>
                </StContents>
                <StDate>{item.createdAt}</StDate>
                <StFooter>
                  <div>{item.nickname}</div>
                  <StLikeBox>
                    <div>{item.likeCount}</div>
                    <div>❤︎</div>
                  </StLikeBox>
                </StFooter>
              </StCard>
            );
          })}
      </StWrap>
    </>
  );
}

export default Main;

const StWrap = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 0 auto;
`;

const StCard = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 350px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  &:hover {
    transform: translateY(-8px);
    transition: ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  }
`;

const StImg = styled.img`
  height: 130px;
  background-color: lightgray;
  margin-bottom: 10px;
`;

const StContents = styled.div`
  height: 120px;
  padding: 0px 10px;
  margin-bottom: 20px;
`;
const StDate = styled.div`
  height: 30px;
  padding: 0px 10px;
`;
const StFooter = styled.div`
  border-top: 1px solid #e9ecef;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  line-height: 40px;
`;

const StLikeBox = styled.div`
  display: flex;
  padding: 0px 10px;
`;
