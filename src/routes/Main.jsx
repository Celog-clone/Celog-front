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
    }
  }, [itemIndex, allList, list]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
    return () => window.removeEventListener("scroll", infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <>
      <Header isSearchBarShow setAllList={setAllList} setList={setList} />
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
                  <StTitle>{item.title}</StTitle>
                  <StText>{item.contents}</StText>
                </StContents>
                <StDate>
                  {item.createdAt.slice(0, 10)} · {item.commentsCount}개의 댓글
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
  padding: 20px 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 0 auto;
`;

const StCard = styled.div`
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
  padding: 0px 15px;
  margin-bottom: 20px;
`;

const StTitle = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;

const StText = styled.div`
  font-size: 14px;
  color: gray;
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
