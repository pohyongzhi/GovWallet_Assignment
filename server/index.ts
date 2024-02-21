import csvParser from 'csv-parser';
import fs, { existsSync } from 'fs';
import { createObjectCsvWriter } from 'csv-writer';


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
export function staffExists(filePath: string, staffId: string): Promise<boolean> {
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
export function getStaffTeam(filePath: string, staffId: string): Promise<string> {
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


export function canRedeem(filePath: string, teamName: string): Promise<boolean> {

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

export async function redeemGift(redemptionFilePath: string, staffFilePath: string, staff_pass_id: string) {

    // Get the team name
    const teamName = await getStaffTeam(staffFilePath, staff_pass_id);

    // Do nothing and send the representative away if the team is not eligible for redemption
    const canRedeemResult = await canRedeem(staffFilePath, teamName);
    if (!canRedeemResult) {
        console.log("Already redeemed!");
        return false; // This will exit the redeemGift function
    }

    const createCsvWriter = createObjectCsvWriter;
    
    // Specify the path to the CSV file and the headers
    const csvWriter = createCsvWriter({
        path: redemptionFilePath,
        header: [
            {id: 'staff_pass_id', title: 'staff_pass_id'},
            {id: 'team_name', title: 'team_name'},
            {id: 'claimed_at', title: 'claimed_at'}
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
}