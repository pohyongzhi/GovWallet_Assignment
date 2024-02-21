"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const csv_writer_1 = require("csv-writer");
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
function redeemGift(staff_pass_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = 'assests/redemption-data.csv';
        const staffTeamPath = 'assests/staff-id-to-team-mapping-long.csv';
        // Get the team name
        const teamName = yield getStaffTeam(staffTeamPath, staff_pass_id);
        // Do nothing and send the representative away if the team is not eligible for redemption
        const canRedeemResult = yield canRedeem(teamName);
        if (!canRedeemResult) {
            console.log("Already redeemed!");
            return; // This will exit the redeemGift function
        }
        const createCsvWriter = csv_writer_1.createObjectCsvWriter;
        // Specify the path to the CSV file and the headers
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                { id: 'staff_pass_id', title: 'staff_pass_id' },
                { id: 'team_name', title: 'team_name' },
                { id: 'claimed_at', title: 'claimed_at' }
            ]
        });
        // Data to be written to the CSV file
        const data = [
            {
                staff_pass_id: staff_pass_id,
                team_name: teamName,
                claimed_at: Date.now()
            }
        ];
        // Write data to the CSV file
        csvWriter
            .writeRecords(data)
            .then(() => console.log('Successfully redeemed!'))
            .catch(err => console.error('Unable to redeem!', err));
    });
}
redeemGift("BOSS_DNLHLUFFJ7E9");
