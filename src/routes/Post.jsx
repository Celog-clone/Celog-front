import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "api";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCookies } from "react-cookie";

function Post() {
  //데이터 조회
  const [cookies] = useCookies(["Access-Token"]);
  const queryClient = useQueryClient();
  const addMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getPost");
    },
  });

  //글 작성
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() === "" || contents.trim() === "" || !image)
      return alert("사진과 글을 모두 입력해주세요!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("image", image);
    addMutation.mutate(formData, cookies["Access-Token"]);
    alert("작성완료!");
    navigate("/");
  };

  //이미지 미리보기
  const fileInput = useRef(null);

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

  return (
    <>
      <StWrap>
        <StPostBox>
          <StForm onSubmit={onSubmitHandler} encType="multipart/form-data">
            <StTitleInput
              type="text"
              name="title"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <StLine></StLine>
            <StImgBtn onClick={onImgButton}>이미지 업로드</StImgBtn>
            <div>
              {imgView.map((item, index) => {
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
              value={contents}
              placeholder="당신의 이야기를 적어보세요..."
              onChange={(event) => {
                setContents(event.target.value);
              }}
            />
            <StButtons>
              <StCancelBtn
                onClick={() => {
                  navigate("/");
                }}
              >
                <AiOutlineArrowLeft />
                나가기
              </StCancelBtn>
              <StAddBtn>출간하기</StAddBtn>
            </StButtons>
          </StForm>
        </StPostBox>

        <StPostBox>
          <StViewTitle>{title}</StViewTitle>
          <StViewBox>
            {imgView.map((item, index) => {
              return <StImg src={item} alt="img" key={index} />;
            })}
          </StViewBox>
          <StViewContents>{contents}</StViewContents>
        </StPostBox>
      </StWrap>
    </>
  );
}

export default Post;

const StWrap = styled.div`
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
