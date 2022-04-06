import JoinDto from './join.dto';

describe('JoinDto Test', () => {

    test('empty test', () => {

        let joinDto = new JoinDto();

        expect(joinDto).toEqual({});

    });

});