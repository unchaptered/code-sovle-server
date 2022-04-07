

AppModule

AuthController // 토큰 생성 기반
AuthModule, AuthService, JwtService

UserController // 유저 기반
UserModulde, UserService

RoomController // 채팅방 기반
RoomModule, RoomService, RoomModel


/
POST /auth/account
POST /auth/account/token
PUT /auth/account/
PATCH /auth/account/level?sort=MENTO&sort=MENTEE