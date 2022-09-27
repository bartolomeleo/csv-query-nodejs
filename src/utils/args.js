import { existsSync } from 'fs';
import { extname } from 'path'

const formatArgs = (argv) => ({
    filePath: argv[2],
    columnIndex: argv[3],
    searchValue: argv[4],
})

const validateArgs = (args) => {
    let errorMessage = '';
    for (let key in args) {
        if (args.hasOwnProperty(key)) {
            if(!args[key]) {
                errorMessage+= `Missing ${key} arguement\n`;                
            } else {
                if(key === 'filePath' && extname(args[key]) !== '.csv') {                
                    errorMessage+= `Invalid ${key} extension\n`;
                }else if(key === 'filePath' && !existsSync(args[key])) {
                    errorMessage+= 'No such file in the directory\n'
                }
                if(key === 'columnIndex' && isNaN(parseInt(args[key]))) {
                    errorMessage+='Index Column should be an integer'
                }
            }                    
        }
    }
    if (errorMessage.length > 0) throw errorMessage.trim();
}

export const parsedArgs = (argv) => {
    const args = formatArgs(argv);
    validateArgs(args)
    return args
}