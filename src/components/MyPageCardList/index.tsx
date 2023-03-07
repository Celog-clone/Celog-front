import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Divider, Stack } from "@mui/material";
import { getMyPosts } from "api";
import { PostCard } from "types";

const MyPageCardList = () => {
  const [cookies] = useCookies(["Access-Token"]);
  const navigate = useNavigate();
  const { data } = useQuery("getMyPosts", () =>
    getMyPosts(cookies["Access-Token"])
  );

  return (
    <StWrapper>
      <StContainer
        divider={<Divider flexItem />}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {data?.data.response.map((post: PostCard) => (
          <StPostCardBox key={post.id} onClick={() => navigate(`/${post.id}`)}>
            <StPostCardImg src={post.image} />
            <StPostCardTitle>{post.title}</StPostCardTitle>
            <StPostCardContent>{post.contents}</StPostCardContent>
            <StPostCardFooter
              direction="row"
              spacing={1}
              divider={<Divider flexItem />}
              alignItems="center"
            >
              <div>{post.modifiedAt}</div>
              <div>{post.commentsCount}개의 댓글</div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                <div>❤︎</div>
                <div>{post.likeCount}</div>
              </div>
            </StPostCardFooter>
          </StPostCardBox>
        ))}
      </StContainer>
    </StWrapper>
  );
};

export default MyPageCardList;

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0px;
`;

const StContainer = styled(Stack)`
  width: 50%;
  height: 100%;
`;

const StPostCardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  &:hover {
    transform: translateY(-8px);
    transition: ease-in 0s, transform 0.25s ease-in 0s;
    cursor: pointer;
  }
`;

const StPostCardImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const StPostCardTitle = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
`;

const StPostCardContent = styled.div``;

const StPostCardFooter = styled(Stack)`
  font-size: 0.5rem;
`;
