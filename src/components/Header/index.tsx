import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  IconButton,
  Stack,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  Search,
  AccountCircle,
} from "@mui/icons-material";
import { isLightState } from "store/atoms";
import { searchPost } from "api";
import { PostCard } from "types";

interface Props {
  isSearchBarShow?: boolean;
  setAllList?: (allList: PostCard[]) => void;
  setList?: (list: PostCard[]) => void;
}

const Header = ({ isSearchBarShow, setAllList, setList }: Props) => {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["Access-Token", "nickname"]);
  const [isLight, setIsLight] = useRecoilState(isLightState);
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isSearchOnChange, setIsSearchOnChange] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery(
    "searchPost",
    () => searchPost(searchKeyword),
    { enabled: false }
  );

  useEffect(() => {
    if (!isLoading && !isSearchOnChange && setAllList && setList) {
      setList(data?.data.response.slice(0, 20));
      setAllList(data?.data.response);
    }
  }, [isLoading, isSearchOnChange, data, setAllList, setList]);

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

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setIsSearchOnChange(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      refetch();
      setIsSearchOnChange(false);
      timer.current = null;
    }, 1000);
  };

  return (
    <StContainer>
      <StLogo to="/">Celog</StLogo>
      <StToolbar direction="row" spacing={0.2} alignItems="center">
        {isSearchBarShow && (
          <div style={{ zIndex: 999 }}>
            <StSearchInput
              isSearchShow={isSearchShow}
              type="text"
              placeholder="Search..."
              onChange={(e) => handleChangeSearchInput(e)}
            />
            <IconButton onClick={handleClickSearch}>
              <StSearch />
            </IconButton>
          </div>
        )}
        <IconButton onClick={handleClickMode}>
          {isLight ? <StLightMode color="action" /> : <StDarkMode />}
        </IconButton>
        <StCreateBtn onClick={() => navigate("/post")}>새 글 작성</StCreateBtn>
        <IconButton onClick={handleClickMyIcon}>
          <StAccount fontSize="large" />
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
      {isSearchOnChange && !isLoading && (
        <>
          <StLoadingOverlay />
          <StLoading />
        </>
      )}
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
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  transition-duration: 0.5s;
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
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.textColor};
  transition-duration: 0.5s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.bgColor};
    background-color: ${({ theme }) => theme.textColor};
    border: 1px solid ${({ theme }) => theme.bgColor};
  }
`;

const StLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #111;
  opacity: 0.5;
  z-index: 9;
`;

const StLoading = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

const StSearch = styled(Search)`
  &:nth-child(1) {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

const StLightMode = styled(LightMode)`
  &:nth-child(1) {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

const StDarkMode = styled(DarkMode)`
  &:nth-child(1) {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

const StAccount = styled(AccountCircle)`
  &:nth-child(1) {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;
