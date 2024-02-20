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
// function canRedeem()
// const staffId1 = "MANAGER_T999888420B"
// const pathName = "assests/staff-id-to-team-mapping.csv"
const staffId = "BOSS_4QXV76PK8MM0";
const pathName = "assests/staff-id-to-team-mapping-long.csv";
staffExists(pathName, staffId).then(exists => {
    if (exists) {
        console.log("Staff Exists");
    }
    else {
        console.log("Staff don't exist");
    }
}).catch(error => {
    console.error('Error:', error);
});
