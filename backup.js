const { exec } = require("child_process");
const databaseName = process.env.DATABASE_NAME;
const backupDirectory = "./";
const backupCommand = `mongodump --db ${databaseName} --out ${backupDirectory}`;

exports.getBackup = () => {
    exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Backup failed: ${error.message}`);
    } else {
        console.log(`Backup successful:\n${stdout}`);
    }
    });
};