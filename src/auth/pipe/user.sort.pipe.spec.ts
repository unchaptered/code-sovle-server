import { BadRequestException } from "@nestjs/common";
import UserSort from "../dto/user.sort.enum";
import UserSortValidatioPipe from "./user.sort.pipe";

describe('UserSortValidationPipe', () => {

    let userSort: string[] = undefined;
    let userSortValidationPipe: UserSortValidatioPipe = undefined;

    beforeAll(() => {

        userSort = [ 'test', 'admin', 'mentee', 'mento' ];
        userSortValidationPipe = new UserSortValidatioPipe();

    });

    it('test', () => {
        
        try{
            userSortValidationPipe.transform(userSort[0]);
        } catch(err) {
            expect(typeof err).toEqual(typeof new BadRequestException(`This ${userSort[0]} isnt' in the UserSort options`));
        }

        expect(userSortValidationPipe.transform(userSort[1])).toEqual(UserSort.ADMIN);
        expect(userSortValidationPipe.transform(userSort[2])).toEqual(UserSort.MENTEE);
        expect(userSortValidationPipe.transform(userSort[3])).toEqual(UserSort.MENTO);

    });

    afterAll(() => {
        
        userSort = undefined;
        userSortValidationPipe = undefined;

    });
});