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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemGift = exports.canRedeem = exports.getStaffTeam = exports.staffExists = void 0;
var csv_parser_1 = __importDefault(require("csv-parser"));
var fs_1 = __importDefault(require("fs"));
var csv_writer_1 = require("csv-writer");
// This function returns false if staff does not exists
function staffExists(filePath, staffId) {
    return new Promise(function (resolve, reject) {
        // Results array to store the parsed CSV data
        var results = [];
        // Initialize a readable stream to read data from the CSV file
        var stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', function (data) {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
            // Event handler when parsing is complete
            .on('end', function () {
            // Check if any of the elements in the results array matches the staffId
            var found = results.some(function (element) { return element.staff_pass_id === staffId; });
            resolve(found);
        })
            // Catch and handle error if it occurs
            .on('error', function (error) {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
exports.staffExists = staffExists;
// This function returns the team that the staff belongs to
function getStaffTeam(filePath, staffId) {
    return new Promise(function (resolve, reject) {
        // Results array to store the parsed CSV data
        var results = [];
        // Initialize a readable stream to read data from the CSV file
        var stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', function (data) {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
            // Event handler when parsing is complete
            .on('end', function () {
            // Check if any of the elements in the results array matches the staffId
            var matchTeam = results.find(function (element) { return element.staff_pass_id === staffId; });
            var team = matchTeam ? matchTeam.team_name : 'Error! Team does not exists!';
            resolve(team);
        })
            // Catch and handle error if it occurs
            .on('error', function (error) {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
exports.getStaffTeam = getStaffTeam;
function canRedeem(filePath, teamName) {
    return new Promise(function (resolve, reject) {
        // Results array to store the parsed CSV data
        var results = [];
        // Initialize a readable stream to read data from the CSV file
        var stream = fs_1.default.createReadStream(filePath);
        // Transform the stream into readable format
        stream.pipe((0, csv_parser_1.default)())
            // Event handler for each row of data parsed
            .on('data', function (data) {
            // Process each row of data by pushing it into an array
            results.push(data);
        })
            // Event handler when parsing is complete
            .on('end', function () {
            // Check if team exists in the redemption-data.csv
            var canRedeem = !results.some(function (element) { return element.team_name === teamName && element.claimed_at; });
            resolve(canRedeem);
        })
            // Catch and handle error if it occurs
            .on('error', function (error) {
            console.error('Error parsing the file!', error);
            reject(error);
        });
    });
}
exports.canRedeem = canRedeem;
function redeemGift(redemptionFilePath, staffFilePath, staff_pass_id) {
    return __awaiter(this, void 0, void 0, function () {
        var teamName, canRedeemResult, createCsvWriter, csvWriter, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getStaffTeam(staffFilePath, staff_pass_id)];
                case 1:
                    teamName = _a.sent();
                    return [4 /*yield*/, canRedeem(staffFilePath, teamName)];
                case 2:
                    canRedeemResult = _a.sent();
                    if (!canRedeemResult) {
                        console.log("Already redeemed!");
                        return [2 /*return*/, false]; // This will exit the redeemGift function
                    }
                    createCsvWriter = csv_writer_1.createObjectCsvWriter;
                    csvWriter = createCsvWriter({
                        path: redemptionFilePath,
                        header: [
                            { id: 'staff_pass_id', title: 'staff_pass_id' },
                            { id: 'team_name', title: 'team_name' },
                            { id: 'claimed_at', title: 'claimed_at' }
                        ]
                    });
                    data = [
                        {
                            staff_pass_id: staff_pass_id,
                            team_name: teamName,
                            claimed_at: Date.now()
                        }
                    ];
                    // Write data to the CSV file
                    csvWriter
                        .writeRecords(data)
                        .then(function () { return console.log('Successfully redeemed!'); })
                        .catch(function (err) { return console.error('Unable to redeem!', err); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.redeemGift = redeemGift;
var redemptionFilePath = 'redemption-data.csv';
var staffFilePath = 'staff-id-to-team-mapping-long.csv';
var staffId = 'BOSS_DNLHLUFFJ7E9';
redeemGift(redemptionFilePath, staffFilePath, staffId);
