import UserSort from "./user.sort.enum";

describe('UserSort', () => {

    let userSort: UserSort[] = [];

    beforeAll(() => {
        userSort = [ UserSort.ADMIN, UserSort.MENTEE, UserSort.MENTO ];
    });

    it('test', () => {

        expect(userSort).toEqual([ UserSort.ADMIN, UserSort.MENTEE, UserSort.MENTO ]);
        
    });

    afterAll(() => {
        userSort = [];
    })
});