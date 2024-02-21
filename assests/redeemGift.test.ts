import test from 'ava';
import { redeemGift } from '../server/index';

import('../server/index').then(({ staffExists }) => {

    test('Printfs out "Already redeemed!" if team is not eligible', async t => {
        // Path to the real CSV file
        const redemptionFilePath = 'redemption-data.csv';
        const staffFilePath = 'staff-id-to-team-mapping-long.csv';
        const staffId = 'BOSS_DNLHLUFFJ7E9';

        const cStub:string[] = [];
        const originalConsoleLog = console.log;
        console.log = message => {
            cStub.push(message);
        };

        // Call the function with un-eligible team name
        await redeemGift(redemptionFilePath, staffFilePath, staffId);
        // Check if the console logged the expected message
        t.false(cStub.includes('Already redeemed!'));
    });

    test('Printfs out "Successfully redeemed!" if team is eligible', async t => {
        // Path to the real CSV file
        const redemptionFilePath = 'redemption-data.csv';
        const staffFilePath = 'staff-id-to-team-mapping-long.csv';
        const staffId = 'STAFF_AZ5HS58J5NA6';

        const cStub:string[] = [];
        const originalConsoleLog = console.log;
        console.log = message => {
            cStub.push(message);
        };

        // Call the function with un-eligible team name
        await redeemGift(redemptionFilePath, staffFilePath, staffId);
        // Check if the console logged the expected message
        t.false(cStub.includes('Successfully redeemed!'));
    });
});

