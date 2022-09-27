import { createReadStream } from 'fs';

// php src/search.php ./file.csv 2 Alberto
console.log(process.argv)
const readableStream = createReadStream('file.csv');
let data = '';
let chunk;

readableStream.on('readable', function() {
    while ((chunk=readableStream.read()) != null) {
        data += chunk;
    }
});

readableStream.on('end', function() {
    console.log(data)
});