import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header } from "components";
import { getPosts } from "api";

function Main() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [allList, setAllList] = useState([]);
  const { data } = useQuery("getPosts", getPosts, {
    onSuccess: (response) => {
      setList(response.data.response.slice(0, 20));
      setAllList(response.data.response);
    },
  });

  //무한스크롤
  const [itemIndex, setItemIndex] = useState(0);

  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setItemIndex(itemIndex + 20);
      setList(list.concat(allList.slice(itemIndex + 20, itemIndex + 40)));
      console.log("도착");
    }
  }, [itemIndex, list]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true); //마지막 데이터
  }, [infiniteScroll]);

  //무한스크롤
  /**
   * legnth 30개
   * 15개만 렌더링을 쳐요
   * list.slice(15)
   * scrollY가 1000쯤 오면
   * 15개 남은 걸 붙힌다.
   */
  // const { data } = useQuery("getPosts", getPosts, {
  //   onSuccess: (response) => {
  //   setList(response.data.response.slice(0,15));
  //   },
  //   });

  //   useEffect(() => {
  //   window.addEventListener("scroll", (e) => console.log(window.scrollY));

  //   if(window.scrollY > 1000) {
  //   setList(response.data.response(15,30))
  //   }
  //   }, []);

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
                <StContents>
                  <div>{item.title}</div>
                  <div>{item.contents}</div>
                </StContents>
                <StDate>
                  {item.createdAt} · {item.commentsCount}개의 댓글
                </StDate>
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
  /* border: 1px solid lightgray; */
  width: 300px;
  height: 350px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 13%) 0px 4px 16px 0px;
  &:hover {
    transform: translateY(-8px);
    transition: ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  }
  overflow: hidden;
`;

const StImg = styled.img`
  height: 140px;
  background-color: lightgray;
  margin-bottom: 10px;
  width: 300px;
`;

const StContents = styled.div`
  height: 100px;
  padding: 0px 10px;
  margin-bottom: 20px;
`;
const StDate = styled.div`
  height: 30px;
  padding: 0px 10px;
  font-size: 12px;
  color: gray;
`;
const StFooter = styled.div`
  border-top: 1px solid #e9ecef;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  line-height: 40px;
`;

const StLikeBox = styled.div`
  display: flex;
  padding: 0px 10px;
`;
