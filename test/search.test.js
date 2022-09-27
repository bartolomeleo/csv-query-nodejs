import { parsedArgs, processLineByLine } from '../src/utils/index.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('parsedArgs', () => {
  const filePath = join(__dirname, './csv/file.csv');

  it('should expect data object', () => {
    const input = ['', '', filePath, '2', 'Alberto'];

    const result = {"columnIndex": "2", "filePath": filePath, "searchValue": "Alberto"}
    
    const args = parsedArgs(input)
    expect(args).toEqual(result)
  })

  it('should throw error File does not exist', () => {
    const input = ['', '', '/test.csv', '2', 'Alberto']

    expect(() => {
      parsedArgs(input)
    }).toThrowError('File does not exist')
  })

  it('should throw error Invalid filePath extension', () => {
    const input = ['', '', filePath + 's', '2', 'Alberto']

    expect(() => {
      parsedArgs(input)
    }).toThrowError('Invalid filePath extension')
  })

  it('should throw error Index Column should be an integer', () => {
    const input = ['', '', filePath, 'dlh', 'Alberto']

    expect(() => {
      parsedArgs(input)
    }).toThrowError('Index Column should be an integer')
  })

  it('should throw error missing arguements', () => {
    const input = ['','']

    expect(() => {
      parsedArgs(input)
    }).toThrowError('Missing filePath arguement\nMissing columnIndex arguement\nMissing searchValue arguement')
  })
});

describe('csv query search', () => {
  it('should return searchValues',async () => {
    const filePath = join(__dirname, './csv/file.csv');
    const input = ['', '', filePath, '2', 'Fabio FDGJDF'];    
    const args = parsedArgs(input)
    const searchValues = await processLineByLine(args);

    expect(searchValues).toEqual("1,Rossi,Fabio FDGJDF,01/06/1990;");
  })

  it('should return multiple searchValues',async () => {
    const filePath = join(__dirname, './csv/multipleValues.csv');
    const input = ['', '', filePath, '2', 'Fabio FDGJDF'];    
    const args = parsedArgs(input)
    const searchValues = await processLineByLine(args);
    expect(searchValues).toEqual("1,Rossi,Fabio FDGJDF,01/06/1990;\n5,ben,Fabio FDGJDF,01/06/1997;");
  })

  it('should throw an error Invalid csv format',async () => {
    const filePath = join(__dirname, './csv/invalidCsvFormat.csv');
    const input = ['', '', filePath, '1000', 'Fabio FDGJDF'];    
    try{
      const args = parsedArgs(input)
      await processLineByLine(args)
    }catch(err) {
      expect(err).toBe('Invalid csv format');
    }
  })
})