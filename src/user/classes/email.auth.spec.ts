import EmailAuthentiaction from './email.auth';

describe('EmailAuthentication Test', () => {

    let eamilAuthentication = undefined;

    test('constructor test', () => {
        
        const isAuth: Boolean = true;
        const authDate: Date = new Date();

        eamilAuthentication = new EmailAuthentiaction(isAuth, authDate);
        
        expect(eamilAuthentication).toEqual({ isAuth, authDate });

    });

    test('setter getter test', () => {

        const updateIsAuth: Boolean = false;
        const updateAuthDate: Date = new Date();

        eamilAuthentication.setIsAuth = updateIsAuth;
        eamilAuthentication.setAuthDate = updateAuthDate;

        expect(eamilAuthentication).toEqual({
            isAuth: eamilAuthentication.getIsAuth,
            authDate: eamilAuthentication.getAuthDate
        })
    });
    
});