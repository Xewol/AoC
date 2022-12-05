import fs from 'fs'
import _ from 'lodash'

const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((record)=>record.replace('\r',''))


const ratio = (array:Array<number>,greed=true)=>{
    // console.log(array)
    let obj = _.countBy(array)
    // console.log(obj)
    if(greed){
        return obj['1'] >= obj['0'] ? 1 : 0;

    }
    return obj['0'] <= obj['1'] ? 0 : 1;

}





let OxygenRows=splitted;
for (let idx in OxygenRows[0].split('')){
    let col:number[] = []
    for (let row of OxygenRows){
        col.push(Number(row[idx]))
    }
 
 //!ox
   let determinantOx = ratio(col)
   OxygenRows=OxygenRows.filter(value=>value[idx] === String(determinantOx))
   if(OxygenRows.length===1)break;
}

let Co2Rows=splitted;
for (let idx in Co2Rows[0].split('')){
    let col:number[] = []
    for (let row of Co2Rows){
        col.push(Number(row[idx]))
    }
 
 //!co2
   let determinantCo2 = ratio(col,false)
   Co2Rows=Co2Rows.filter(value=>value[idx] === String(determinantCo2))
   if(Co2Rows.length===1)break;
}
console.log(parseInt(OxygenRows[0],2)*parseInt(Co2Rows[0],2))
