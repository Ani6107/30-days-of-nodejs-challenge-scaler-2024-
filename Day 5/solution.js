const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    // Get the file extension from the provided file path
    const actualExtension = path.extname(filePath);

    // Compare the actual extension with the expected extension
    if (actualExtension === expectedExtension) {
        console.log(`File has the expected extension: ${expectedExtension}`);
    } else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`);
    }
}

// Test Cases
checkFileExtension('../Day 5/File.txt', '.txt');
checkFileExtension('../Day 5/image.png', '.jpg');

