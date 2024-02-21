import test from 'ava';

import('../server/index').then(({ getStaffTeam }) => {

    test('Return team name if staff exists', async t => {
        // Path to the real CSV file
        const filePath = 'staff-id-to-team-mapping-long.csv';
        const staffId = 'BOSS_4QXV76PK8MM0';

        // Call staffExists and assert the result
        const teamName = await getStaffTeam(filePath, staffId);
        t.is(teamName, 'HUFFLEPUFF');
    });

    test('Return error message if staff does not exist', async t => {
        const filePath = 'staff-id-to-team-mapping-long.csv';
        const staffId = 'HELLO_IM_BOSS';

        const teamName = await getStaffTeam(filePath, staffId);
        t.is(teamName, 'Error! Team does not exists!');
    });
});

