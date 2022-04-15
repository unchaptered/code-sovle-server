import UserCardDto from "./user.card.dto";
import * as faker from 'faker';

describe('UserCardDto', ()=>{
    
    let _id: string = undefined;
    let username: string = undefined;
    let userCardDto: UserCardDto = undefined;

    beforeAll(() => {
        
        _id = faker.lorem.word();
        username = faker.internet.userName();
        userCardDto = new UserCardDto({ _id, username });

    });

    it('constructor test', () => {
        expect(userCardDto).toEqual({ _id, username });
    });

    afterAll(() => {
        _id = undefined;
        username = undefined;
        userCardDto = undefined;
    });
});