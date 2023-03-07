import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IconButton, Stack, Menu, MenuItem } from "@mui/material";
import {
  LightMode,
  DarkMode,
  Search,
  AccountCircle,
} from "@mui/icons-material";
import { isLightState } from "store/atoms";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["Access-Token", "nickname"]);
  const [isLight, setIsLight] = useRecoilState(isLightState);
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickMode = () => setIsLight((prev) => !prev);
  const handleClickSearch = () => setIsSearchShow((prev) => !prev);
  const handleClickMyIcon = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClickMyPage = () => {
    setAnchorEl(null);
    navigate(`/mypage/${cookies.nickname}`);
  };
  const handleClickLogOut = () => {
    setAnchorEl(null);
    removeCookie("Access-Token");
    removeCookie("nickname");
    navigate(`/signin`);
  };

  return (
    <StContainer>
      <StLogo to="/">Celog</StLogo>
      <StToolbar direction="row" spacing={0.2} alignItems="center">
        <div>
          <StSearchInput
            isSearchShow={isSearchShow}
            type="text"
            placeholder="Search..."
          />
          <IconButton onClick={handleClickSearch}>
            <Search />
          </IconButton>
        </div>
        <IconButton onClick={handleClickMode}>
          {isLight ? <LightMode /> : <DarkMode />}
        </IconButton>
        <StCreateBtn onClick={() => navigate("/post")}>새 글 작성</StCreateBtn>
        <IconButton onClick={handleClickMyIcon}>
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl !== null}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleClickMyPage}>내 셀로그</MenuItem>
          <MenuItem onClick={handleClickLogOut}>로그아웃</MenuItem>
        </Menu>
      </StToolbar>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 20px 50px;
  border-bottom: 1px solid gainsboro;
`;

const StLogo = styled(Link)`
  font-size: 2rem;
  font-family: "Pacifico", cursive;
`;

const StToolbar = styled(Stack)``;

const StSearchInput = styled.input<{ isSearchShow: boolean }>`
  visibility: ${({ isSearchShow }) => (isSearchShow ? "visible" : "hidden")};
  width: ${({ isSearchShow }) => (isSearchShow ? "200px" : "0px")};
  height: 30px;
  transition: width 0.5s, visibility 0.25s;
  border-radius: 30px;
  padding: 0px 15px;
`;

const StCreateBtn = styled.button`
  height: 30px;
  padding: 0px 15px;
  border-radius: 30px;
  transition-duration: 0.2s;
  color: black;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
  }
`;
