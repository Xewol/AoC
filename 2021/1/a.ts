import fs from 'fs'


const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((depth)=>depth.replace('\r','')).map((str)=>Number(str))

let submerges=0;
let currentThreshold = splitted[0];

for (let depth of splitted){
    if (depth > currentThreshold) submerges++;

    currentThreshold = depth;
}

console.log(submerges)