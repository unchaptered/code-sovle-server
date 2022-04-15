import * as faker from 'faker';

import UserProfileDescriptionDto from './user.profile.description.dto';

describe('UserProfileDto', () => {

    let email: string, username: string, password: string, description: string;
    let userPorfileDescriptioonDto: UserProfileDescriptionDto;

    beforeAll(() => {
        
        email = faker.internet.email();
        password = faker.internet.password();
        username = faker.internet.userName();
        description = faker.lorem.text();
        userPorfileDescriptioonDto = new UserProfileDescriptionDto({ email, username, password, description });

    });

    it('constructor test', () => {
        
        expect(userPorfileDescriptioonDto).toEqual({ description });

    });

    it('set/get test', () => {

        email = faker.internet.email();
        password = faker.internet.password();
        username = faker.internet.userName();
        description = faker.lorem.text();

        userPorfileDescriptioonDto.setDescription = username;

        expect(userPorfileDescriptioonDto.getDescription).toBe(username);

    });

    afterAll(() => {

        email = undefined;
        password = undefined;
        username = undefined;
        description = undefined;
        userPorfileDescriptioonDto = undefined;
        
    });

});