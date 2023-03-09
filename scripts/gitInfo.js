const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const execSyncWrapper = (command) => {
    let stdout = null;
    try {
        stdout = execSync(command).toString().trim();
    } catch (error) {
        console.error(error);
    }
    return stdout;
};

const main = () => {
    let gitVersion = execSyncWrapper('git describe --tags --always --first-parent');
    let isDirty = execSyncWrapper('git diff --quiet || echo \'dirty\'') != "dirty"

    const obj = {
        gitVersion,
        isDirty
    };

    const filePath = path.resolve('src', 'generatedGitInfo.json');
    const fileContents = JSON.stringify(obj, null, 2);

    fs.writeFileSync(filePath, fileContents);
    console.log(`Wrote the following contents to ${filePath}\n${fileContents}`);
};

main();