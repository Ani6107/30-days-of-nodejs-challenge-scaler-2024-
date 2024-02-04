const path = require('path');

function resolvePath(relativePath) {
    // Assume that the current user's home directory is /Users/username
    const homeDirectory = '/Users/username';
    
    // Resolve the relative path to an absolute path
    const absolutePath = path.resolve(homeDirectory, relativePath);

    // Print the resolved path to the console
    console.log('Resolved Path:', absolutePath);
}

// Test Cases
resolvePath('../Day 4/File1.txt');
resolvePath('../Day 4/File2.txt');

