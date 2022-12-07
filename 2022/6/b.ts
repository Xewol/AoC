import fs from 'fs'
import _ from 'lodash'


const nonRepeated = (array:string[],testValue:string)=>{

   return array.filter((value)=>value === testValue).length ===1

}


//*split on every letter
let data = fs.readFileSync('./data.txt','utf8').split('')
const DIFFERENT_CHARACTERS=14


for(let i=0;i<data.length-13;i++){

let result:boolean[] =[]     
let testingArray:string[] = []

for (let j=i;j<i+DIFFERENT_CHARACTERS;j++){
    testingArray.push(data[j])

}

for (let letter of testingArray){

    result.push(nonRepeated(testingArray,letter))
}

if(!result.includes(false)){
    //!need the +4 because of index returns first element and is counting from 0
console.log(i+DIFFERENT_CHARACTERS)
break;
}


}