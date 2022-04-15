import * as faker from 'faker';

import UserProfileDetailDto from './user.profile.detail.dto';

describe('UserProfileDto', () => {

    let email: string, username: string, password: string;
    let userProfileDetailDto: UserProfileDetailDto;

    beforeAll(() => {
        
        email = faker.internet.email();
        password = faker.internet.password();
        username = faker.internet.userName();
        userProfileDetailDto = new UserProfileDetailDto({ email, username, password });

    });

    it('constructor test', () => {
        
        expect(userProfileDetailDto).toEqual({ username });

    });

    it('set/get test', () => {

        email = faker.internet.email();
        password = faker.internet.password();
        username = faker.internet.userName();

        userProfileDetailDto.setUsername = username;

        expect(userProfileDetailDto.getUsername).toBe(username);

    });

    afterAll(() => {

        email = undefined;
        password = undefined;
        username = undefined;
        userProfileDetailDto = undefined;
        
    });

});