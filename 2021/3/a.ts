import fs from 'fs'
import _ from 'lodash'

const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((record)=>record.replace('\r',''))


const cols:number[][] = [[],[],[],[],[],[],[],[],[],[],[],[]]

for (let report of splitted){
    for (let [idx,value] of report.split('').entries()){
        cols[idx].push(Number(value));
    }
}

let gamma =cols.map((array)=>{
   const obj =  _.countBy(array)
   return obj['0'] > obj['1'] ? 0 : 1
}).join('')

//just negate gamma
let epsilon = gamma.split('').map((value)=>value ==='0' ? '1' : '0').join('')

console.log(parseInt(gamma,2)*parseInt(epsilon,2))

