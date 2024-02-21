import test from 'ava';

import('../server/index').then(({ canRedeem }) => {

    test('Returns true if team is able to claim the gift.', async t => {
        // Team Name
        const teamName = 'GRYFFINDOR';
        const filePath = 'redemption-data.csv';

        // Call staffExists and assert the result
        const result = await canRedeem(filePath, teamName);
        t.pass();
    });

    test('Returns false if team have already claimed their gift.', async t => {
        // Team Name
        const teamName = 'HUFFLEPUFF';
        const filePath = 'redemption-data.csv';

        // Call staffExists and assert the result
        const result = await canRedeem(filePath, teamName);
        t.pass();
    });
});

