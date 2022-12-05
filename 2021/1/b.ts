import fs from 'fs'


const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((depth)=>depth.replace('\r','')).map((str)=>Number(str))

let submerges=0;
let currentThreshold = splitted[0]+splitted[1]+splitted[2];


for(let i=1;i<splitted.length-1;i++){
    let depth =splitted[i-1]+splitted[i] + splitted[i+1];

    if (depth > currentThreshold) submerges++;
    currentThreshold=depth;

}




console.log(submerges)