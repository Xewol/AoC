import fs from 'fs'

const data = fs.readFileSync('./data.txt','utf8')
   
const numOfCalories:number[] = []


const newData = data.split('\n')


let sum = 0;
for (let data of newData){

   
   sum+=Number(data)
   if (data ==='\r'){
    
    numOfCalories.push(sum);
    sum=0;
   }



    
}
let sorted = numOfCalories.sort((a,b)=>b-a)

let best3 = sorted[0]+sorted[1]+sorted[2];

console.log(best3)