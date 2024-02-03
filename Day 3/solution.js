const { exec } = require('child_process');

function executeCommand(command) {
    // Execute the shell command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        // Print the output to the console
        console.log(`Command Output:\n${stdout}`);

        // Print any error to the console
        if (stderr) {
            console.error(`Command Error:\n${stderr}`);
        }
    });
}

// Test cases
executeCommand('dir /a');
executeCommand('echo "Hello, Node.js!');
