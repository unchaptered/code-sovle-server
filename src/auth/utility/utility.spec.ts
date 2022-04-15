import * as faker from 'faker';

import { emailRegex } from './utility';

describe('Utility', () => {

    let emails: string[] = [];

    beforeAll(() => {

        emails.push(faker.internet.email());

    });

    it('emailRegex', () => {
        
        for (const email of emails) {
            expect(emailRegex.test(email)).toBeTruthy();
        }

    });

    afterAll(() => {

        emails = [];

    })
});