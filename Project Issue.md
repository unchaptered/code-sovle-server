# Project Issue

프로젝트 이슈 관리용 문서입니다.
깃허브 관련 이슈는 제외되어 있습니다.

본 문서는 _2022년 4월 6일_ 에 작성되었습니다.

## Index

1. Heroku
2. Cloudflare

### Heroku

#### Heroku Deploy Error 503

Code Solve Server 를 main 에 병합한 후, 배포하려고 했을때 503 에러가 발생했습니다.

해당 에러를 발견하고 관련된 레퍼런스를 찾아봤으나 명확한 답을 찾지 못했습니다.

따라서 단순 누락에 의한 서버 실행 에러라고 생각하고 절차에 따라서 재 배포하였습니다.
_해당 문제를 해결하기 위해 24번의 배포가 이루어졌으며, 약 2일의 시간이 소요되었습니다._

1. cross-env, @nestjs/config, dotenv 종속성 설치
2. web, prestart:prod, prebuild 명령어 추가

```json
"start:dev":    "cross-env NODE_ENV=dev nest start --watch",
"start:debug":  "cross-env NODE_ENV=dev nest start --debug --watch",
"web":          "npm run start:prod",
"start:prod":   "cross-env NODE_ENV=prod node dist/main",
"prestart:prod":"rimraf dist && npm run build",
"build":        "nest build",
"prebuild":     "rimraf dist",
```

3. AppModule 에 ConfigModule 설치 후 내부 설정

```javascript
ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    ignoreEnvFile: process.env.NODE_ENV === 'prod',
}),
```

4. 루트 경로에 환경변수 파일 2개 설정
5. 제외 항목에 해당하는 prod 모드의 경우 Heroku 에 환경변수 설정
6. 루트 경로의 환경변수 파일에 있는 모든 환경변수를 설정 + 추가로 다음의 항목을 설정

```
NODE_ENV production
NPM_CONFIG_PRODUCTION false
```

7. 병견된 사항을 dev 브랜치로 배포 테스팅 후, 에러 수정 확인하고 main 브런치로 재배포

### Cloudflare

본 내용은 [Code Solve SSG](https://github.com/unchaptered/code-qna-website-sveltekit) 를 확인해주세요.

