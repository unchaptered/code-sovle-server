import LoginDto from './login.dto';

describe('LoginDto Test', () => {

    test('empty test', () => {

        let loginDto = new LoginDto();

        expect(loginDto).toEqual({});

    });

});