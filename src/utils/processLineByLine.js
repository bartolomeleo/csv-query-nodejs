import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import events from 'events';


export const processLineByLine = async (args) => {
    let searchValues = '';
    try{
        const rl = createInterface({
            input: createReadStream(args.filePath),
            crlfDelay: Infinity
        });
    
        rl.on('line', async (line) => {
            const row = line.slice(0, line.length-1).split(',')
            
            if(row[args.columnIndex] === args.searchValue) {
                searchValues+= line + '\n';
            }
        });
        await events.once(rl, 'close');
        return searchValues.trim();
    }catch(err) {
        throw err
    }
}