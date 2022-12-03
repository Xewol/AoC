import fs from 'fs'



const data = fs.readFileSync('./data.txt','utf8')

//*split on new line, replace mac's \r and return slices of 2 compartments 
let splitted=data.split('\n').map((pair)=>pair.replace('\r','')).map((item)=>[item.slice(0,item.length/2),item.slice(item.length/2)])

let sum = 0;

//!skipping idx 0
const priorityArray = ['',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

console.log(splitted)
