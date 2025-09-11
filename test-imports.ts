// Simple test to identify compilation errors
import axios from 'axios';
import * as xml2js from 'xml2js';

console.log("Testing imports...");
console.log("Axios:", typeof axios);
console.log("xml2js:", typeof xml2js);
console.log("Process env:", process.env.NODE_ENV);
