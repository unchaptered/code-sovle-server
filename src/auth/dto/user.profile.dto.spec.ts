import * as faker from 'faker';
import UserProfileDto from './user.profile.dto';

describe('UserProfileDto', () => {

    let email: string = undefined;
    let password: string = undefined;
    let userProfileDto: UserProfileDto = undefined;

    beforeAll(() => {
        
        email = faker.internet.email();
        password = faker.internet.password();
        userProfileDto = new UserProfileDto({email, password});

    });


    it('constructor test', () => {

        expect(userProfileDto).toEqual({ email, password });
        
    });

    it('set/get test', () => {

        email = faker.internet.email();
        password = faker.internet.password();

        userProfileDto.setEmail = email;
        userProfileDto.setPassword = password;

        expect(userProfileDto.getEmail).toBe(email);
        expect(userProfileDto.getPassword).toBe(password);

    });

    afterAll(() => {

        email = undefined;
        password = undefined;
        userProfileDto = undefined;
        
    });

});