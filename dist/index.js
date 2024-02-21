"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
// This function returns false if staff does not exists
function staffExists(filePath, staffId) {
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results = [];
        // Initialize a readable stream to read data from the CSV file
        const stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', (data) => {
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
            .on('error', (error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
// This function returns the team that the staff belongs to
function getStaffTeam(filePath, staffId) {
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results = [];
        // Initialize a readable stream to read data from the CSV file
        const stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', (data) => {
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
            .on('error', (error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
function canRedeem(teamName) {
    const filePath = 'assests/redemption-data.csv';
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results = [];
        // Initialize a readable stream to read data from the CSV file
        const stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', (data) => {
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
            .on('error', (error) => {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
// funciton redeemGift(staff_pass_id)
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
getStaffTeam("assests/staff-id-to-team-mapping-long.csv", "BOSS_ZMKJUMC03BJP").then(exists => {
    if (exists) {
        console.log(exists);
    }
    else {
        console.log("Does not exists!");
    }
}).catch(error => {
    console.error('Error:', error);
});
