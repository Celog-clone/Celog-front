import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { addComment, deleteComment, updateComment, getDetail } from "api";
import { FaUserCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";

function Comment({ id, queryClient, detail, setDetail }) {
  const [cookies] = useCookies(["Access-Token"]);
  const [comments, setComments] = useState("");
  const [updateComments, setUpdateComments] = useState("");

  const { data } = useQuery("getDetail", () => getDetail(`${id}`), {
    onSuccess: (response) => {
      console.log(response);
      setDetail(response.data.response.commentList.reverse());
    },
  });

  const { mutate: addCommentMutate } = useMutation(
    () => addComment(`${id}`, cookies["Access-Token"], comments),
    {
      onSuccess: () => queryClient.invalidateQueries("getDetail"),
    }
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();

    addCommentMutate();
    alert("댓글 등록 완료!");
    setComments("");
    setDetail([...detail, comments]);
  };

  //댓글 삭제
  const { mutate: delCommentMutate } = useMutation(
    () => deleteComment(`${id}`, cookies["Access-Token"]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getDetail");
      },
    }
  );

  const onDeleteCommentHandler = () => {
    const message = window.confirm("댓글을 삭제하시겠습니까?");
    if (message) {
      delCommentMutate();
      setDetail([...detail]);
    } else {
      return;
    }
  };

  //댓글 수정
  const { mutate: updateCommentMutate } = useMutation(
    () => updateComment(`${id}`, cookies["Access-Token"], updateComments),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getDetail");
      },
    }
  );

  const onUpdateCommentHandler = (event) => {
    event.preventDefault();
    updateCommentMutate();
    setUpdateComments("");
    setDetail([...detail, updateComments]);
  };

  return (
    <>
      <StWrap>
        <StCommentAddBox>
          <div>댓글 3개</div>
          <form onSubmit={onSubmitHandler}>
            <StInput
              type="text"
              placeholder="댓글을 작성하세요"
              value={comments}
              onChange={(event) => {
                setComments(event.target.value);
              }}
            />
            <StBtn>댓글 작성</StBtn>
          </form>
        </StCommentAddBox>
        <StNewCommentBox>
          {detail.length > 0 &&
            detail.map((item) => {
              return (
                <div>
                  <StCommentTopBox>
                    <StCommentTop>
                      <FaUserCircle style={{ fontSize: "50px" }} />
                      <StData>
                        <div style={{ fontWeight: "600" }}>
                          {item.nickname}유저네임
                        </div>
                        <div style={{ color: "gray" }}>{item.createAt}시간</div>
                      </StData>
                    </StCommentTop>
                    <StBtns>
                      <StChangeBtn onClick={onUpdateCommentHandler}>
                        수정
                      </StChangeBtn>
                      <StChangeBtn onClick={onDeleteCommentHandler}>
                        삭제
                      </StChangeBtn>
                    </StBtns>
                  </StCommentTopBox>
                  <div>
                    <StContent>{item.comments}</StContent>
                  </div>
                </div>
              );
            })}
        </StNewCommentBox>
      </StWrap>
    </>
  );
}

export default Comment;

const StWrap = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const StCommentAddBox = styled.div`
  width: 800px;
`;

const StInput = styled.input`
  border: 1px solid #e9ecef;
  outline: none;
  border-radius: 5px;
  padding: 16px;
  width: 770px;
  height: 50px;
  margin-bottom: 20px;
  margin-top: 15px;
  ::placeholder {
    font-size: 16px;
  }
`;

const StBtn = styled.button`
  background-color: #12b886;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: 800;
  height: 35px;
  border-radius: 5px;
  text-align: center;
  float: right;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: #20c997;
  }
  margin: auto 0;
`;

const StNewCommentBox = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-top: 60px;
`;

const StCommentTopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StCommentTop = styled.div`
  display: flex;
`;

const StData = styled.div`
  margin-top: 5px;
  margin-left: 15px;
`;

const StBtns = styled.div`
  border: none;
`;

const StChangeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #969896;
  &:hover {
    text-decoration: underline;
  }
`;

const StContent = styled.div`
  width: 800px;
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
`;
