import * as faker from 'faker';

import UserProfile from "./user.profile";
import { UserSort } from "../types/user.sort.enum";
import { BadGatewayException, BadRequestException } from '@nestjs/common';

describe('UserProfile Test', () => {
    
    const spaceRegex = / /g;
    let userProfile = undefined;

    test('constructor test', () => {

        const _id = 'temp';
        const sort = UserSort.MENTEE;
        const username = faker.lorem.word().replace(spaceRegex, '');

        userProfile = new UserProfile({ _id, sort, username });
        
        expect(userProfile).toEqual({ _id, sort, username });
        
    });

    test('setter getter test', () => {

        const _id = 'temp2';
        const sort = UserSort.MENTO;
        const username = faker.lorem.word().replace(spaceRegex, '');

        try {
            userProfile.setId = _id;
        } catch (err) {
            expect(typeof err).toBe(typeof new BadRequestException('_id can\'t change!'));
        }

        try {
            userProfile.setSort = sort;
        } catch(err) {
            expect(typeof err).toBe(typeof new BadRequestException('UserSort can\'t change!'));
        }

        userProfile.setUsername = username;

        expect(userProfile).toEqual({
            _id: userProfile.getId,
            sort: userProfile.getSort,
            username: userProfile.getUsername
        });

    });
});