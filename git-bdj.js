const { exec } = require('child_process');
const cron = require('node-cron');

// Function to execute git commands
function executeGitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing git command: ${error}`);
                reject(error);
                return;
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

// Function to perform git operations
async function performGitOperations() {
    try {
        // Get current timestamp for commit message
        const timestamp = new Date().toISOString();

        // Add all changes
        await executeGitCommand('git add .');

        // Create commit with timestamp
        const commitMessage = `Auto-commit: Data warehouse update ${timestamp}`;
        await executeGitCommand(`git commit -m "${commitMessage}"`);

        // Push changes
        await executeGitCommand('git push');

        console.log(`Successfully pushed changes at ${timestamp}`);
    } catch (error) {
        console.error('Failed to perform git operations:', error);
    }
}

// Schedule git operations every 30 minutes
cron.schedule('*/30 * * * *', performGitOperations);

// Also perform initial git operations on startup
performGitOperations();

// Handle process termination
process.on('SIGINT', () => {
    console.log('Git automation stopped');
    process.exit(0);
});