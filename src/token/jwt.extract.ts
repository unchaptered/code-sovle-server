export const extractTokenFromBearer = (bearerToken: Object): string => bearerToken.toString().split(' ')[1];