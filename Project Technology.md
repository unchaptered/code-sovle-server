# Project Technology

프로젝트 기술 관리용 문서입니다.
깃허브 관련 이슈는 제외되어 있습니다.

본 문서는 _2022년 4월 6일_ 에 작성되었습니다.

## Index

### 테스트

프로젝트의 모든 *.ts 파일을 3 종류로 분류하여 테스트 코드를 작성하였습니다.

```
옵션파일        테스트 진행하지 않음
클래스파일      독립된 유닛 테스트 진행
종속성파일      Controller, Service, Mongoose 관련 파일은 종속성 테스트 진행
미들웨어        미결정
```

### 기술스텍 총정리

프로젝트에는 다음과 같은 기술스텍을 적용하였습니다.

```
Stacks
├ Middleware/Secure
│ ├ Throttler           동일 IP 로 반복된 호스팅 시 차단 (적용)
│ ├ Helmet              통신 Headers 에 관여하여 다양한 옵션 부여 (미적용)
│ └ Cors                CORS 설정 및 화이트리스트 (미적용)
│
├ Middleware/Validator
│ └ Guards      
│   ├ Class-validator   라이브러리를 활용한 유효성 검사 진행
│   └ Pipeline
│     ├ ParseInt        라이브러리를 활용한 숫자 유효성 검사 진행
│     ├ Customs         커스텀 라이브러리를 활용한 각 타입 유효성 검사 진행
│     └ UserSortValidationPipe
│
├ Decorator
│ └ Role                SetMetaData 와 UserSort 열거형을 이용한 역할 기반 Authorization
│
├ Authentication
│ ├ Passport            인증형 라이브러리
│ ├ JWT                 Json Web Token 관련 라이브러리
│ └ bcrypt              단방향 해쉬 암호기
│
├ Logger
│ ├ @nestjs/logger      로그 라이브러리 (개발용)
│ └ winston             로그 라이브러리 (제품용) 가공 후 MongoDB 업로드
│
└ Schedule
  ├ @nestjs/Schedule    스케쥴 설정 라이브러리
  └ @types/cron (dev)   스케쥴 설정 라이브러리 - cron 표기법에 의한 시간 설정
```


