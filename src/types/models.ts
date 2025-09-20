export type PatternMatch = {
    filePath: string;
    content: string;
    line: number;
    column:number;
    pattern: string;
    snippet: string;
    timestamp: string;
};