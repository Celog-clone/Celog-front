# Celog (velog clone)

---

## 📌 About Project

- Deploy 👉 [[__바로가기__]](http://celog.store/)
- 와이어프레임 👉 [[__바로가기__]](https://www.figma.com/file/GRpI1OFZAK4qMVeqCEMq8k/Celog?node-id=0-1&t=C1wGBUPFHqjx9xQb-0)
- Notion 👉 [[__바로가기__]](https://joyous-node-f7f.notion.site/4-Celog-2cc3d3918bc34ce4b322bcb5ec3a679f)

---

<div align=center><h1>📚 STACKS</h1></div>
<div align=center> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> 
<img src="https://img.shields.io/badge/recoil-0078D4?style=for-the-badge&logo=recoil&logoColor=white"> 
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/framer-0055FF?
style=for-the-badge&logo=framer&logoColor=white">
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white">
<img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white">
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>

---

## 📌 Trouble Shooting

| 내용                                                       | 해결방법                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| React-query useMutation mutate fn params가 인식이 잘 안됨. | mutate는 하나의 인자만 받을 수 있음. 객체에 묶어서 전달하는 방식으로 해결     |
| git clone이후 React was conflicted between...에러          | package.json의 name과 directory명이 달라 생기는 버그. repo이름 맞춰줘서 해결. |

---

## 📌 개선을 위한 고려사항

- 에러 컨트롤 미흡 : 서버와 정해진 에러 처리는 특정 컴포넌트로 보여주고, 그 외에 비정상 네트워크 에러도 따로 처리 필요함
  <br/>
- 초기 API 명세서 소통 미흡 : 같이 스키마를 정하지 않아, 서로 다른 key name으로 개발됐었음. 프로젝트 초기 회의 때 명확하게 정할 필요가 있음
  <br/>
- 다크모드 <-> 라이트 모드 시, svg icon 테두리 생김 : mui icons에서 불러와 쓰는 icon이라 css로 설정해도 내부 path의 모양만 건드릴 수가 없었음. 추후 path의 code를 바꾸는 형식으로 개선되어야함.
  <br/>
- 무한 스크롤 : 현재는 백엔드 pagination api와 연동하지 못함. 그래서 프론트 쪽에서 data를 잘라 붙히는 방식으로 비슷하게 무한 스크롤을 구현함. 추후 pagination api와 react-query의 useInfiniteQuery를 이용하여 리펙토링 필요.
  <br/>
- OAuth : 현재 refresh token api가 있지만, 사용하지 못함. access-token이 만료되었을때 refresh token을 이용하여 재로그인 유도 필요.
