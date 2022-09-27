import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import events from 'events';
import { avrg } from './index.js';

export const processLineByLine = async (args) => {
    let searchValues = '';
    let errorMessage = '';
    let numberOfColumns = [];

    try {
        const rl = createInterface({
            input: createReadStream(args.filePath),
            crlfDelay: Infinity
        });
    
        rl.on('line', async (line) => {
            const row = line.slice(0, line.length-1).split(',');
            numberOfColumns.push(row.length)                       
                       
            if(row[args.columnIndex] === args.searchValue) {
                searchValues+= line + '\n';
            }
        });
        await events.once(rl, 'close');
        
        if(avrg(numberOfColumns) !== numberOfColumns[0]) {
            errorMessage+= 'Invalid csv format\n'
        }
        if(errorMessage.length > 0) throw errorMessage.trim();
        return searchValues.trim();
    } catch (err) {        
        throw err
    }
}