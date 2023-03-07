import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useCookies } from "react-cookie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";
import { deletePost, updatePost, getPost, postLike } from "api";
import { CommentList, Header } from "components";

function Detail() {
  const { id } = useParams();
  const [cookies] = useCookies(["Access-Token", "nickname"]);
  const [detail, setDetail] = useState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery("getPost", () => getPost(`${id}`), {
    onSuccess: (response) => {
      setDetail(response.data.response);
    },
  });

  //상세페이지 삭제
  const { mutate: delPostMutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPosts");
    },
  });
  const onDeleteHandler = () => {
    const message = window.confirm("삭제하시겠습니까?");
    if (message) {
      delPostMutate({ id, accessToken: cookies["Access-Token"] });
      navigate("/");
    } else {
      return;
    }
  };

  //상세페이지 수정
  const [edit, setEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContents, setUpdateContents] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState("");
  const fileInput = useRef(null);

  const onEditMode = () => {
    if (detail) {
      setEdit(!edit);
      setUpdateTitle(detail.title);
      setUpdateContents(detail.contents);
      setImage(detail.image);
      setImgView([detail.image]);
    }
  };

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const onImgHandler = (event) => {
    setImgView([]);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        setImage(event.target.files[i]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base = reader.result;
          if (base) {
            const baseSub = base.toString();
            setImgView((imgView) => [...imgView, baseSub]);
          }
        };
      }
    }
  };

  const { mutate: updatePostMutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });
  const onUpdateHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", updateTitle);
    formData.append("contents", updateContents);
    formData.append("image", image);

    updatePostMutate({
      id,
      accessToken: cookies["Access-Token"],
      formData,
    });

    setUpdateTitle("");
    setUpdateContents("");
    setImgView(imgView);
    setImage("");
    onEditMode();
    alert("수정 완료!");
  };

  //좋아요
  const { mutate: postLikeMutate } = useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });

  const onLikeHandler = () => {
    postLikeMutate({ id, accessToken: cookies["Access-Token"] });
  };

  return (
    <>
      {edit ? (
        // 수정모드
        <StEditWrap>
          <StPostBox>
            <StForm onSubmit={onUpdateHandler} encType="multipart/form-data">
              <StTitleInput
                type="text"
                name="title"
                value={updateTitle}
                onChange={(event) => {
                  setUpdateTitle(event.target.value);
                }}
              />
              <StLine />
              <StImgBtn onClick={onImgButton}>이미지 업로드</StImgBtn>
              <div>
                {imgView.length > 0 &&
                  imgView.map((item, index) => {
                    return <StImg src={item} alt="img" key={index} />;
                  })}
              </div>
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={onImgHandler}
              />
              <StContentInput
                type="text"
                name="title"
                value={updateContents}
                onChange={(event) => {
                  setUpdateContents(event.target.value);
                }}
              />
              <StButtons>
                <StCancelBtn onClick={onEditMode}>
                  <AiOutlineArrowLeft />
                  나가기
                </StCancelBtn>
                <StAddBtn>출간하기</StAddBtn>
              </StButtons>
            </StForm>
          </StPostBox>
          <StPostBox>
            <StViewTitle>{updateTitle}</StViewTitle>
            <StViewBox>
              {imgView.length > 0 &&
                imgView.map((item, index) => {
                  return <StImg src={item} alt="img" key={index} />;
                })}
            </StViewBox>
            <StViewContents>{updateContents}</StViewContents>
          </StPostBox>
        </StEditWrap>
      ) : (
        // 수정 전 모드
        <>
          <Header />
          {detail && (
            <>
              <StWrap>
                <StTitle>{detail.title}</StTitle>
                <StTop>
                  <StDate>
                    {detail.nickname} · {detail.createdAt}
                  </StDate>
                  {detail.nickname === cookies.nickname && (
                    <div>
                      <StChangeBtn onClick={onEditMode}>수정</StChangeBtn>
                      <StChangeBtn onClick={onDeleteHandler}>삭제</StChangeBtn>
                    </div>
                  )}
                </StTop>
                <StOriginImg src={detail.image} alt="img" />
                <div style={{ height: "400px" }}>{detail.contents}</div>
              </StWrap>
              <StHeartBox>
                <StHeart onClick={onLikeHandler}>❤︎</StHeart>
                <div>{detail.likeCount}</div>
              </StHeartBox>
              <CommentList
                id={id}
                queryClient={queryClient}
                detail={detail}
                setDetail={setDetail}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Detail;

const StWrap = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const StTitle = styled.div`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const StHeartBox = styled.div`
  position: fixed;
  top: 20%;
  left: 15%;
  background-color: #e9ecef;
  width: 70px;
  height: 100px;
  border-radius: 50px;
  text-align: center;
`;

const StHeart = styled.div`
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  border-radius: 50px;
  border: 1px solid #e9ecef;
  color: #969896;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    color: black;
  }
`;

const StTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StDate = styled.div`
  color: gray;
`;

const StOriginImg = styled.img`
  margin: 20px 0;
  width: 750px;
`;

const StChangeBtn = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  color: #969896;
  &:hover {
    text-decoration: underline;
  }
`;

// ----------------------------
const StEditWrap = styled.div`
  display: flex;
`;

const StPostBox = styled.div`
  width: 800px;
  height: 900px;
  position: relative;
`;

const StForm = styled.form`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StTitleInput = styled.input`
  height: 66px;
  outline: none;
  border: none;
  ::placeholder {
    font-size: 40px;
    font-weight: 900;
  }
`;

const StLine = styled.div`
  height: 6px;
  width: 70px;
  background-color: #343a40;
`;

const StImgBtn = styled.button`
  border: none;
  cursor: pointer;
  height: 30px;
  &:hover {
    background-color: #e9ecef;
  }
`;

const StImg = styled.img`
  width: 654.49px;
  height: 300px;
`;

const StContentInput = styled.textarea`
  height: 300px;
  outline: none;
  border: none;
  ::placeholder {
    font-size: 18px;
  }
`;

const StButtons = styled.div`
  width: 680px;
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  padding: 5px 20px;
  position: fixed;
  left: 5px;
  top: 90%;
`;

const StCancelBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  margin: auto 0;
  height: 2.8rem;
  border-radius: 5px;
  text-align: center;
  line-height: 2.5rem;
  padding-right: 20px;
  padding-left: 20px;
  &:hover {
    background-color: #e9ecef;
  }
`;

const StAddBtn = styled.button`
  background-color: #12b886;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 800;
  height: 2.8rem;
  border-radius: 5px;
  text-align: center;
  line-height: 2.5rem;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: #20c997;
  }
  margin: auto 0;
`;

const StViewTitle = styled.div`
  height: 66px;
  padding: 20px;
  margin-top: 60px;
`;

const StViewBox = styled.div`
  padding: 20px;
`;

const StViewContents = styled.div`
  height: 300px;
  padding: 20px;
`;
