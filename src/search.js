import { parsedArgs, processLineByLine } from './utils/index.js';

(async function searchValue() {
    try {
        const args = parsedArgs(process.argv);
        const searchedValues = await processLineByLine(args);

        console.log(searchedValues)
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
})();