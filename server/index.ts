import csvParser from 'csv-parser';
import fs, { existsSync } from 'fs';
import path from 'path';


// Define the structure of each row in the CSV file
interface StaffCSVRow {
    staff_pass_id: string;
    team_name: string;
    created_at: string;
}

interface RedemptionCSVRow {
    staff_pass_id: string;
    team_name: string;
    claimed_at: string;
}

// This function returns false if staff does not exists
function staffExists(filePath: string, staffId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results: StaffCSVRow[] = [];
        
        // Initialize a readable stream to read data from the CSV file
        const stream = fs.createReadStream(filePath);
        
        // Transform the stream into readable format
        stream.pipe(csvParser())
        // Event handler for each row of data parsed
        .on('data', (data: StaffCSVRow) => {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
        // Event handler when parsing is complete
        .on('end', () => {
            // Check if any of the elements in the results array matches the staffId
            const found = results.some(element => element.staff_pass_id === staffId);
            resolve(found);
        })
        // Catch and handle error if it occurs
        .on('error', (error: Error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}

// This function returns the team that the staff belongs to
function getStaffTeam(filePath: string, staffId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results: StaffCSVRow[] = [];
        
        // Initialize a readable stream to read data from the CSV file
        const stream = fs.createReadStream(filePath);
        
        // Transform the stream into readable format
        stream.pipe(csvParser())
        // Event handler for each row of data parsed
        .on('data', (data: StaffCSVRow) => {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
        // Event handler when parsing is complete
        .on('end', () => {
            // Check if any of the elements in the results array matches the staffId
            const matchTeam = results.find(element => element.staff_pass_id === staffId);
            const team = matchTeam ? matchTeam.team_name : 'Error! Team does not exists!';
            resolve(team);
        })
        // Catch and handle error if it occurs
        .on('error', (error: Error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}


function canRedeem(teamName: string): Promise<boolean> {
    const filePath = 'assests/redemption-data.csv';

    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results: RedemptionCSVRow[] = [];
        
        // Initialize a readable stream to read data from the CSV file
        const stream = fs.createReadStream(filePath);
        
        // Transform the stream into readable format
        stream.pipe(csvParser())
        // Event handler for each row of data parsed
        .on('data', (data: RedemptionCSVRow) => {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
        // Event handler when parsing is complete
        .on('end', () => {
            // Check if team exists in the redemption-data.csv
            const canRedeem = !results.some(element => element.team_name === teamName && element.claimed_at);
            resolve(canRedeem);
        })
        // Catch and handle error if it occurs
        .on('error', (error: Error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}

function redeemGift(staff_pass_id: string): Promise<boolean> {
    const filePath = 'assests/redemption-data.csv';
    const staffTeamPath = 'assests/staff-id-to-team-mapping-long.csv';

    // Get the team name
    const teamName = getStaffTeam(staffTeamPath, staff_pass_id);

    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results: RedemptionCSVRow[] = [];
        
        // Initialize a readable stream to read data from the CSV file
        const stream = fs.createReadStream(filePath);
        
        // Transform the stream into readable format
        stream.pipe(csvParser())
        // Event handler for each row of data parsed
        .on('data', (data: RedemptionCSVRow) => {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
        // Event handler when parsing is complete
        .on('end', () => {
            // Check if team exists in the redemption-data.csv
            const canRedeem = !results.some(element => element.team_name === teamName && element.claimed_at);
            resolve(canRedeem);
        })
        // Catch and handle error if it occurs
        .on('error', (error: Error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}

// Staff test
// const staffId = "BOSS_4QXV76PK8MM0"
// const pathName = "assests/staff-id-to-team-mapping-long.csv"

// staffExists(pathName, staffId).then(exists => {
//     if (exists) {
//         console.log("Staff Exists");
//     } else {
//         console.log("Staff don't exist");
//     }
// }).catch(error => {
//     console.error('Error:', error);
// });

// Find a team with unredeemed gift
// const teamName = "GRYFFIsNDOR";
// const teamName = "GRYFFINDOR";

// canRedeem(teamName).then(exists => {
//     if (exists) {
//         console.log("Can redeem!");
//     } else {
//         console.log("Already redeem!");
//     }
// }).catch(error => {
//     console.error('Error:', error);
// });

// Test getTeam()
// getStaffTeam("assests/staff-id-to-team-mapping-long.csv", "BOSS_ZMKJUMC03BJP").then(exists => {
//     if (exists) {
//         console.log(exists);
//     } else {
//         console.log("Does not exists!");
//     }
// }).catch(error => {
//     console.error('Error:', error);
// });