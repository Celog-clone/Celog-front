import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { signup } from "api";
import { NewUser, TextField as ITextField } from "types";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<NewUser>({
    nickname: "",
    email: "",
    password: "",
  });

  const [nicknameTextField, setNicknameTextField] = useState<ITextField>({
    label: "nickname",
    color: "info",
    helperText: "2~10자 이내의 닉네임을 입력해주세요.",
  });
  const [emailTextField, setEmailTextField] = useState<ITextField>({
    label: "Email",
    color: "info",
    helperText: "올바른 이메일 형식을 입력해주세요.",
  });
  const [pwTextField, setPwTextField] = useState<ITextField>({
    label: "Password",
    color: "info",
    helperText:
      "숫자,문자,특수문자 포함 8~15자 이내의 비밀번호를 입력해주세요.",
  });

  const nicknameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const pwReg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  const { mutate } = useMutation(signup, {
    onSuccess: (response) => {
      if (response?.data?.response.status === 200) {
        alert("회원가입 성공!");
        navigate("/signin");
      } else {
        alert("회원가입 실패!");
      }
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname")
      !nicknameReg.test(value)
        ? setNicknameTextField({
            ...nicknameTextField,
            color: "error",
            helperText: "2~10자 이내의 닉네임을 입력해주세요.",
          })
        : setNicknameTextField({
            ...nicknameTextField,
            color: "success",
            helperText: " ",
          });

    if (name === "email")
      !emailReg.test(value)
        ? setEmailTextField({
            ...emailTextField,
            color: "error",
            helperText: "올바른 이메일 형식을 입력해주세요.",
          })
        : setEmailTextField({
            ...emailTextField,
            color: "success",
            helperText: " ",
          });

    if (name === "password")
      !pwReg.test(value)
        ? setPwTextField({
            ...pwTextField,
            color: "error",
            helperText:
              "숫자,문자,특수문자 포함 8~15자 이내의 비밀번호를 입력해주세요.",
          })
        : setPwTextField({
            ...pwTextField,
            color: "success",
            helperText: " ",
          });

    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      user.nickname.trim() === "" ||
      user.email.trim() === "" ||
      user.password.trim() === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    }

    mutate(user);
  };

  return (
    <StWrapper>
      <StContainer>
        <StHeader>Sign Up</StHeader>
        <StForm onSubmit={onSubmitHandler}>
          <StInputs>
            <TextField
              fullWidth
              onChange={onChangeHandler}
              name="nickname"
              label={nicknameTextField.label}
              color={nicknameTextField.color}
              helperText={nicknameTextField.helperText}
              error={nicknameTextField.color === "error"}
            />
            <TextField
              fullWidth
              onChange={onChangeHandler}
              name="email"
              label={emailTextField.label}
              color={emailTextField.color}
              helperText={emailTextField.helperText}
              error={emailTextField.color === "error"}
            />
            <TextField
              fullWidth
              onChange={onChangeHandler}
              name="password"
              label={pwTextField.label}
              color={pwTextField.color}
              helperText={pwTextField.helperText}
              error={pwTextField.color === "error"}
            />
            <Button type="submit" variant="outlined" size="large">
              회원가입
            </Button>
          </StInputs>
        </StForm>
      </StContainer>
    </StWrapper>
  );
};

export default SignUp;

const StWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
  position: relative;
  margin: 20px;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  height: 60px;
  background: #63e6be;
  border-radius: 16px 16px 0px 0px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 550px;
  padding: 50px;
`;

const StInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;
