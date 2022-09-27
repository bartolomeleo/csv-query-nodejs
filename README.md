## Installations

`$ npm -g intall yarn`

`$ yarn install`

## Node Version Support

>node>12.x

## csv-query-nodejs

`$ node src/search.js ./file.csv 2 Alberto`

```
filePath: ./file.csv
columnIndex: 2
searchValue: Alberto
```

### CSV Format

```
1,Rossi,Fabio,01/06/1990;
2,Gialli,Alessandro,02/07/1989;
3,Verdi,Alberto,03/08/1987;
```

The number 2 represents the index of the column to search in (in the previous file the name) and Alberto represents the search key.

The output of the command must be the corresponding line, in our case: 

```
3, Verdi, Alberto,03/08/1987;
```
### Test Results

<img src="https://user-images.githubusercontent.com/98268101/192625224-37f18c26-f879-4639-bbe1-3b1ee0a74c7c.png" alt="test-result" width="600"/>
