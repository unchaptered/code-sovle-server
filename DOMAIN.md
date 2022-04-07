// User

// 토큰

POST	/auth/join	        계정 생성
POST	/auth/login	        쿠키 생성

// O-auth 미구현

// 개인용

GET     /auth/profile/:_id	계정 자세히
PATCH	/auth/profile/:_id	계정 수정
DELETE	/auth/profile/:_id	계정 탈퇴

// 이메일, 비밀번호 리셋

GET	    /auth/reset/email?params	    아이디 찾기
GET	    /auth/reset/password?params 	비밀번호 찾기

// ROOM

방 생성(멘토)

방주인 초대하기
방주인 승낙하기

방손님 입장신청하기
방손님 수락하기