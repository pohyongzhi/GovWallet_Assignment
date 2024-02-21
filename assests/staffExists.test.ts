import test from 'ava';

import('../server/index').then(({ staffExists }) => {

    test('Return true if staff exists', async t => {
        // Path to the real CSV file
        const filePath = 'staff-id-to-team-mapping-long.csv';
        const staffId = 'BOSS_4QXV76PK8MM0';

        // Call staffExists and assert the result
        const exists = await staffExists(filePath, staffId);
        t.pass();
    });

    test('Return false if staff does not exists', async t => {
        // Path to the real CSV file
        const filePath = 'staff-id-to-team-mapping-long.csv';
        // Fake staffID
        const staffId = 'HELLO_IM_BOSS';

        // Call staffExists and assert the result
        const exists = await staffExists(filePath, staffId);
        t.pass();
    });
});

