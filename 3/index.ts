import fs from 'fs'



const data = fs.readFileSync('./data.txt','utf8')

//*split on new line, replace mac's \r and return slices of 2 compartments 
let splitted=data.split('\n').map((pair)=>pair.replace('\r','')).map((item)=>[item.slice(0,item.length/2),item.slice(item.length/2)])


console.log(splitted)
