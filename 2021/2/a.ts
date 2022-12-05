import fs from 'fs'


const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((depth)=>depth.replace('\r',''))


let depth =0;
let horizontal=0;

for (let move of splitted){
   let [command,value] = move.split(' ')
   if (command === 'forward') horizontal += Number(value);
   if(command ==='up') depth -=Number(value);
   if(command ==='down') depth +=Number(value);
}
console.log(horizontal*depth)