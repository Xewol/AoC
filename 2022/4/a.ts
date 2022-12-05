import fs from 'fs'
import _ from 'lodash'


const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((pair)=>pair.replace('\r',''))

let sum=0;
for (let pair of splitted){
    //*get access to single pair
    const array = pair.split(',')
   const range1 = array[0].split('-')
   const range2 = array[1].split('-')
   //! need to +1 cause range is not inclusive 
   const rangeArray1= _.range(Number(range1[0]),Number(range1[1])+1)
   const rangeArray2= _.range(Number(range2[0]),Number(range2[1])+1)
   //a
    // if(_.intersection(rangeArray2,rangeArray1).length===rangeArray1.length || _.intersection(rangeArray1,rangeArray2).length===rangeArray2.length )sum++;

    //b
    if(_.intersection(rangeArray1,rangeArray2).length>0 || _.intersection(rangeArray2,rangeArray1).length>0)sum++;

}

console.log(sum);