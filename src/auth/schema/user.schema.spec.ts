import { MongoClient, Db } from 'mongodb';

describe('Mongoose Model Testing', () => {

    test('', ()=> {
        expect(global.ATLAS_URL).toBe('h');
    })
    let mongoConnection;

    beforeAll( async () => {
        
        mongoConnection = await MongoClient.connect(global.ATLAS_URL);

    });

    afterAll( async () => {
        
        await mongoConnection.close();

    });

    it('shoud insert a doc into collection', async () => {

        const userDB = mongoConnection.collection('Users');

        const mockingUserData = { email:'hello@email.com', password:'hi' };
        await userDB.insertOne(mockingUserData);

        const findUserData = await userDB.findOne({ email: 'hello@gmail.com' });
        expect(findUserData).toEqual(mockingUserData);

    });

});