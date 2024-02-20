import csvParser from 'csv-parser';
import fs, { existsSync } from 'fs';
import path from 'path';


// Define the structure of each row in the CSV file
interface CSVRow {
    staff_pass_id: string;
    team_name: string;
    created_at: string;
}

// This function returns false if staff does not exists
function staffExists(filePath: string, staffId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // Results array to store the parsed CSV data
        const results: CSVRow[] = [];
        
        // Initialize a readable stream to read data from the CSV file
        const stream = fs.createReadStream(filePath);
        
        // Transform the stream into readable format
        stream.pipe(csvParser())
        // Event handler for each row of data parsed
        .on('data', (data: CSVRow) => {
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

// function canRedeem()

// const staffId1 = "MANAGER_T999888420B"
// const pathName = "assests/staff-id-to-team-mapping.csv"
const staffId = "BOSS_4QXV76PK8MM0"
const pathName = "assests/staff-id-to-team-mapping-long.csv"

staffExists(pathName, staffId).then(exists => {
    if (exists) {
        console.log("Staff Exists");
    } else {
        console.log("Staff don't exist");
    }
}).catch(error => {
    console.error('Error:', error);
});