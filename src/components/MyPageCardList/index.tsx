import { useQuery } from "react-query";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Divider, Stack } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { getMyPosts } from "api";

const data = [
  {
    id: 1,
    title: "title",
    content: "content",
    nickname: "nickname",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",
    createAt: "2023-03-06",
    modifiedAt: "2023-03-06",
    commentListCnt: 3,
    likeCnt: 5,
  },
  {
    id: 2,
    title: "title2",
    content: "content2",
    nickname: "nickname2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",
    createAt: "2023-03-06",
    modifiedAt: "2023-03-06",
    commentListCnt: 3,
    likeCnt: 5,
  },
];

const MyPageCardList = () => {
  const [cookies] = useCookies(["Access-Token", "nickname"]);
  // const { data } = useQuery("getMyPosts", () => getMyPosts(cookies["nickname"],cookies["Access-Token"]));

  return (
    <StWrapper>
      <StContainer
        divider={<Divider flexItem />}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {data.map((post) => (
          <StPostCardBox key={post.id}>
            <StPostCardImg src={post.image} />
            <StPostCardTitle>{post.title}</StPostCardTitle>
            <StPostCardContent>{post.content}</StPostCardContent>
            <StPostCardFooter
              direction="row"
              spacing={1}
              divider={<Divider flexItem />}
              alignItems="center"
            >
              <div>{post.modifiedAt}</div>
              <div>{post.commentListCnt}개의 댓글</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Favorite fontSize="small" color="error" />
                {post.likeCnt}
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
  margin-top: 200px;
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
