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
exports.scanForPatterns = scanForPatterns;
const fs = __importStar(require("fs"));
/**
 * Scan multiple files for the given patterns and return all matches.
 * @param patterns Array of string patterns to search for.
 * @param filePaths Array of file paths to scan.
 * @returns Array of PatternMatch objects.
 */
function scanForPatterns(patterns, filePaths) {
    const results = [];
    const timestamp = new Date().toISOString();
    filePaths.forEach((filePath) => {
        try {
            const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
            lines.forEach((line, lineIndex) => {
                patterns.forEach((pattern) => {
                    const regex = new RegExp(pattern, 'i');
                    const match = regex.exec(line);
                    if (match) {
                        results.push({
                            filePath,
                            content: line,
                            line: lineIndex + 1,
                            column: match.index + 1,
                            pattern,
                            snippet: line.trim(),
                            timestamp,
                        });
                    }
                });
            });
        }
        catch (err) {
            console.error(`Failed to read file ${filePath}:`, err);
        }
    });
    return results;
}
//# sourceMappingURL=fileScanner.js.map