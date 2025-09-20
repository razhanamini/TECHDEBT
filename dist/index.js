"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const configLoader_1 = require("./services/configLoader");
const fileUtils_1 = require("./utils/fileUtils");
const fileScanner_1 = require("./services/fileScanner");
const githubClient_1 = require("./services/githubClient");
async function run() {
    try {
        // 1. Load the user-defined patterns
        const patterns = (0, configLoader_1.getConfigPatterns)();
        core.info(`Patterns to scan: ${patterns.join(', ')}`);
        // 2. Get all file paths in the repository
        const filePaths = await (0, fileUtils_1.getAllFilePaths)();
        core.info(`Scanning ${filePaths.length} files...`);
        // 3. Scan files for matches
        const matches = (0, fileScanner_1.scanForPatterns)(patterns, filePaths);
        core.info(`Found ${matches.length} matches.`);
        // 4. If matches found, create a GitHub issue
        if (matches.length > 0) {
            const issueBody = matches
                .map(m => `File: ${m.filePath}, Line: ${m.line}, Match: ${m.pattern}`)
                .join('\n');
            const issue = await (0, githubClient_1.createIssueForPatterns)(matches);
            core.info(`Created issue #${issue?.number} at ${issue?.html_url}`);
        }
        else {
            core.info('No patterns found. Nothing to report.');
        }
    }
    catch (error) {
        // 5. Handle errors
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}
// Run the main function
run();
//# sourceMappingURL=index.js.map