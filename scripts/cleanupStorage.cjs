const { execSync } = require('child_process');

async function main() {
    try {
        console.log("Fetching all storage files...");
        const storageRaw = execSync('npx convex data _storage --format json', { encoding: 'utf-8' });
        
        const jsonMatch = storageRaw.match(/\[.*\]/s);
        if (!jsonMatch) {
            console.error("Failed to parse storage JSON", storageRaw);
            return;
        }
        const allFiles = JSON.parse(jsonMatch[0]);
        const allIds = allFiles.map(f => f._id);
        console.log(`Found ${allIds.length} files in storage.`);

        console.log("Fetching used storage IDs...");
        const usedRaw = execSync('npx convex run adminStorage:getAllUsedStorageIds --push', { encoding: 'utf-8' });
        const usedMatch = usedRaw.match(/\[.*\]/s);
        const usedIds = usedMatch ? JSON.parse(usedMatch[0]) : [];
        console.log(`Found ${usedIds.length} used storage IDs.`);

        const orphanedIds = allIds.filter(id => !usedIds.includes(id));
        console.log(`Found ${orphanedIds.length} orphaned files.`);

        if (orphanedIds.length === 0) {
            console.log("No orphaned files to delete.");
            return;
        }

        const chunkSize = 50;
        for (let i = 0; i < orphanedIds.length; i += chunkSize) {
            const chunk = orphanedIds.slice(i, i + chunkSize);
            console.log(`Deleting chunk ${Math.floor(i / chunkSize) + 1} of ${Math.ceil(orphanedIds.length / chunkSize)}...`);
            
            const argsStr = JSON.stringify({ ids: chunk });
            // Escape for Windows CMD: "{\"ids\":[\"id1\",\"id2\"]}"
            const escapedArgs = '"' + argsStr.replace(/"/g, '\\"') + '"';
            
            try {
                execSync(`npx convex run adminStorage:deleteStorageBulk ${escapedArgs}`, { stdio: 'inherit' });
            } catch (err) {
                console.error("Error during deletion:", err);
            }
        }

        console.log("Cleanup complete!");
    } catch (e) {
        console.error("Script failed:", e);
    }
}

main();
