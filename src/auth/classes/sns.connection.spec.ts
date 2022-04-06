import * as faker from 'faker';

import SnsConnection from "./sns.connection";
import { TokenSort } from "../types/token.sort.enum";

describe('EmailAuthentication Test', () => {

    const spaceRegex = / /g;
    let snsConnection = undefined;
    
    test('constructor test', () => {

        const googleToken = TokenSort.GOOGLE;
        const word =  faker.lorem.sentence().replace(spaceRegex, '');

        snsConnection = new SnsConnection(googleToken, word);

        expect(snsConnection).toEqual({ tokenSort:googleToken, tokenValue:word });

    });

    test('setter getter test', () => {

        const googleToken = TokenSort.GOOGLE;
        const kakaoToken = TokenSort.KAKAO;
        const naverToken = TokenSort.NAVER;
        const githubToken = TokenSort.GITHUB;

        let word = faker.lorem.sentence().replace(spaceRegex, '');
        snsConnection.setTokenSort = googleToken;
        snsConnection.setTokenValue = word;
        expect(snsConnection).toEqual({
            tokenSort: snsConnection.getTokenSort,
            tokenValue: snsConnection.getTokenValue
        });

        word = faker.lorem.sentence().replace(spaceRegex, '');
        snsConnection.setTokenSort = kakaoToken;
        snsConnection.setTokenValue = word;
        expect(snsConnection).toEqual({
            tokenSort: snsConnection.getTokenSort,
            tokenValue: snsConnection.getTokenValue
        });

        word = faker.lorem.sentence().replace(spaceRegex, '');
        snsConnection.setTokenSort = naverToken;
        snsConnection.setTokenValue = word;
        expect(snsConnection).toEqual({
            tokenSort: snsConnection.getTokenSort,
            tokenValue: snsConnection.getTokenValue
        });

        word = faker.lorem.sentence().replace(spaceRegex, '');
        snsConnection.setTokenSort = githubToken;
        snsConnection.setTokenValue = word;
        expect(snsConnection).toEqual({
            tokenSort: snsConnection.getTokenSort,
            tokenValue: snsConnection.getTokenValue
        });

    });
});