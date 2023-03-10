# Celog (velog clone)

---

## ๐ About Project

- Deploy ๐ [[__๋ฐ๋ก๊ฐ๊ธฐ__]](http://celog.store/)
- ์์ด์ดํ๋ ์ ๐ [[__๋ฐ๋ก๊ฐ๊ธฐ__]](https://www.figma.com/file/GRpI1OFZAK4qMVeqCEMq8k/Celog?node-id=0-1&t=C1wGBUPFHqjx9xQb-0)
- Notion ๐ [[__๋ฐ๋ก๊ฐ๊ธฐ__]](https://joyous-node-f7f.notion.site/4-Celog-2cc3d3918bc34ce4b322bcb5ec3a679f)

---

<div align=center><h1>๐ STACKS</h1></div>
<div align=center> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> 
<img src="https://img.shields.io/badge/recoil-0078D4?style=for-the-badge&logo=recoil&logoColor=white"> 
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white">
<img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white">
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>

---

## ๐ Trouble Shooting

| ๋ด์ฉ                                                       | ํด๊ฒฐ๋ฐฉ๋ฒ                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| React-query useMutation mutate fn params๊ฐ ์ธ์์ด ์ ์๋จ. | mutate๋ ํ๋์ ์ธ์๋ง ๋ฐ์ ์ ์์. ๊ฐ์ฒด์ ๋ฌถ์ด์ ์ ๋ฌํ๋ ๋ฐฉ์์ผ๋ก ํด๊ฒฐ     |
| git clone์ดํ React was conflicted between...์๋ฌ          | package.json์ name๊ณผ directory๋ช์ด ๋ฌ๋ผ ์๊ธฐ๋ ๋ฒ๊ทธ. repo์ด๋ฆ ๋ง์ถฐ์ค์ ํด๊ฒฐ. |

---

## ๐ ๊ฐ์ ์ ์ํ ๊ณ ๋ ค์ฌํญ

- ์๋ฌ ์ปจํธ๋กค ๋ฏธํก : ์๋ฒ์ ์ ํด์ง ์๋ฌ ์ฒ๋ฆฌ๋ ํน์  ์ปดํฌ๋ํธ๋ก ๋ณด์ฌ์ฃผ๊ณ , ๊ทธ ์ธ์ ๋น์ ์ ๋คํธ์ํฌ ์๋ฌ๋ ๋ฐ๋ก ์ฒ๋ฆฌ ํ์ํจ
  <br/>
- ์ด๊ธฐ API ๋ช์ธ์ ์ํต ๋ฏธํก : ๊ฐ์ด ์คํค๋ง๋ฅผ ์ ํ์ง ์์, ์๋ก ๋ค๋ฅธ key name์ผ๋ก ๊ฐ๋ฐ๋์์. ํ๋ก์ ํธ ์ด๊ธฐ ํ์ ๋ ๋ชํํ๊ฒ ์ ํ  ํ์๊ฐ ์์
  <br/>
- ๋คํฌ๋ชจ๋ <-> ๋ผ์ดํธ ๋ชจ๋ ์, svg icon ํ๋๋ฆฌ ์๊น : mui icons์์ ๋ถ๋ฌ์ ์ฐ๋ icon์ด๋ผ css๋ก ์ค์ ํด๋ ๋ด๋ถ path์ ๋ชจ์๋ง ๊ฑด๋๋ฆด ์๊ฐ ์์์. ์ถํ path์ code๋ฅผ ๋ฐ๊พธ๋ ํ์์ผ๋ก ๊ฐ์ ๋์ด์ผํจ.
  <br/>
- ๋ฌดํ ์คํฌ๋กค : ํ์ฌ๋ ๋ฐฑ์๋ pagination api์ ์ฐ๋ํ์ง ๋ชปํจ. ๊ทธ๋์ ํ๋ก ํธ ์ชฝ์์ data๋ฅผ ์๋ผ ๋ถํ๋ ๋ฐฉ์์ผ๋ก ๋น์ทํ๊ฒ ๋ฌดํ ์คํฌ๋กค์ ๊ตฌํํจ. ์ถํ pagination api์ react-query์ useInfiniteQuery๋ฅผ ์ด์ฉํ์ฌ ๋ฆฌํํ ๋ง ํ์.
  <br/>
- OAuth : ํ์ฌ refresh token api๊ฐ ์์ง๋ง, ์ฌ์ฉํ์ง ๋ชปํจ. access-token์ด ๋ง๋ฃ๋์์๋ refresh token์ ์ด์ฉํ์ฌ ์ฌ๋ก๊ทธ์ธ ์ ๋ ํ์.
