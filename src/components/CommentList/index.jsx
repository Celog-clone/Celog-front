import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { addComment, deleteComment, updateComment, getDetail } from "api";
import { FaUserCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { instance } from "api";
import { useParams } from "react-router-dom";

function Comment() {
  const [cookies] = useCookies(["Access-Token"]);
  const [comments, setComments] = useState("");
  const [updateComments, setUpdateComments] = useState("");
  const [edit, setEdit] = useState(false);

  // const { data } = useQuery("getDetail", () => getDetail(`${id}`), {
  //   onSuccess: (response) => {
  //     setDetail(response.data.response.commentList.reverse());
  //   },
  // });

  // //댓글 추가
  // const queryClient = useQueryClient();
  // const { mutate: addCommentMutate } = useMutation(
  //   () => addComment(`${id}`, cookies["Access-Token"], comments),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries("getDetail"),
  //   }
  // );

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();

  //   addCommentMutate();
  //   alert("댓글 등록 완료!");
  //   setComments("");
  //   setDetail([...detail, comments]);
  // };

  // //댓글 삭제
  // const { mutate: delCommentMutate } = useMutation(
  //   () => deleteComment(`${id}`, cookies["Access-Token"]),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("getDetail");
  //     },
  //   }
  // );

  // const onDeleteCommentHandler = () => {
  //   const message = window.confirm("댓글을 삭제하시겠습니까?");
  //   if (message) {
  //     delCommentMutate();
  //     setDetail([...detail]);
  //   } else {
  //     return;
  //   }
  // };

  //댓글 수정
  const onEditMode = () => {
    setEdit(!edit);
    setUpdateComments(detail.comments);
  };

  // const { mutate: updateCommentMutate } = useMutation(
  //   () => updateComment(`${id}`, cookies["Access-Token"], updateComments),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("getDetail");
  //     },
  //   }
  // );

  // const onUpdateCommentHandler = (event) => {
  //   event.preventDefault();
  //   updateCommentMutate();
  //   setUpdateComments("");
  //   onEditMode();
  //   setDetail([...detail, updateComments]);
  // };
  //댓글 조회
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const getComment = async () => {
    const data = await instance.get(`/api/posts/${id}`);
    return data;
  };
  const { data } = useQuery("celog", getComment, {
    onSuccess: (response) => {
      console.log(response.data.commentList);
      setDetail(response.data.response.commentList.reverse());
    },
  });

  //댓글 추가
  const queryClient = useQueryClient();
  const addCommentMutation = useMutation(addComment, cookies["Access-Token"], {
    onSuccess: () => queryClient.invalidateQueries("celog"),
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newComment = {
      id: id,
      comments: comments,
    };
    addCommentMutation.mutate(newComment);
    alert("댓글 등록 완료!");
    setComments("");
    setDetail([...detail, newComment]);
  };

  //댓글 삭제
  const deleteCommentMutation = useMutation(
    deleteComment,
    cookies["Access-Token"],
    {
      onSuccess: () => {
        queryClient.invalidateQueries("celog");
      },
    }
  );

  const onDeleteCommentHandler = (id) => {
    const message = window.confirm("댓글을 삭제하시겠습니까?");
    if (message) {
      deleteCommentMutation.mutate(id);
      setDetail([...detail]);
    } else {
      return;
    }
  };

  //댓글 수정
  const updateCommentMutation = useMutation(
    updateComment,
    cookies["Access-Token"],
    {
      onSuccess: () => {
        queryClient.invalidateQueries("celog");
      },
    }
  );

  const onUpdateCommentHandler = (event) => {
    event.preventDefault();
    const payload = {
      id: id,
      comments: updateComments,
    };
    updateCommentMutation.mutate(payload);
    setDetail(payload);
  };

  return (
    <>
      <StWrap>
        <StCommentAddBox>
          <div>댓글 0개</div>
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
                        <div style={{ fontWeight: "600" }}>{item.nickname}</div>
                        <div style={{ color: "gray" }}>{item.createAt}</div>
                      </StData>
                    </StCommentTop>
                    <StBtns>
                      <StChangeBtn onClick={onEditMode}>수정</StChangeBtn>
                      <StChangeBtn onClick={onDeleteCommentHandler}>
                        삭제
                      </StChangeBtn>
                    </StBtns>
                  </StCommentTopBox>
                  {edit ? (
                    // 수정 모드
                    <div>
                      <form onSubmit={onUpdateCommentHandler}>
                        <input
                          type="text"
                          name="updateTitle"
                          value={updateComments || ""}
                          onChange={(event) => {
                            setUpdateComments(event.target.value);
                          }}
                        />
                        <StUpdateBtns>
                          <StCancelBtn onClick={onEditMode}>취소</StCancelBtn>
                          <StUpdateBtn>수정하기</StUpdateBtn>
                        </StUpdateBtns>
                      </form>
                    </div>
                  ) : (
                    // 수정 전
                    <div>
                      <StContent>{item.comments}</StContent>
                    </div>
                  )}
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
  width: 800px;
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

const StUpdateBtns = styled.div`
  display: flex;
  margin-top: 10px;
  float: right;
  gap: 10px;
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

const StUpdateBtn = styled.button`
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
