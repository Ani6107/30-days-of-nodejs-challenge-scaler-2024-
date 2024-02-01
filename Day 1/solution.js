const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error reading file: ${err.code}: ${err.path} - File not found`);
            } else {
                console.error(`Error reading file: ${err.message}`);
            }
        } else {
            console.log(`File Content:\n${data}`);
        }
    });
}

// Test Cases
readFileContent('./content.txt');
readFileContent('./empty.txt');
readFileContent('test-files/nonexistent-file.txt');
