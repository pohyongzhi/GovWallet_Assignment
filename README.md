# GovWallet Assignment

## This project includes 3 basic functions for checking of Staff ID a CSV file, verifying if a team can redeem their gift, and adding new redemption data for eligible teams.

## Set-Up
1. npm init -y (Creates a package.json file quickly, -y flag is to accept the default values).
2. touch index.ts (At this point, node only understands JavaScript. We need to get it to understand TypeScript).
3. npm install typescript (This command is used to install TypeScript locally to the project).
4. npx tsc --init (Initializes a TypeScript config file).
5. sudo npm install -g typescript (Grant admin rights to install TypeScript globally on the device).
6. mkdir server and mkdir dist (To create server and dist file).
7. Go to tsconfig.json file and find “outDir” and change the path to “./dist”.
8. npm i @types/node (Dependency that TypeScript relies on to provide type information for Node.js modules and APIs).
9. Go to package.json file and convert the “test” line to “start”: “tsc && node dist/index.js”. (This allows us to run npm run start, which compiles and run the runs the code).
10. npm install csv-parser @types/node to read into CSV file.
11. npm install csv-writer to write into CSV file.
12. npm install --save-dev mocha chai @types/mocha @types/chai

