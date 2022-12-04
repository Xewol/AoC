import fs from 'fs'



const data = fs.readFileSync('./data.txt','utf8')

//*split on new line, replace mac's \r and return slices of 2 compartments 
let splitted=data.split('\n').map((pair)=>pair.replace('\r','')).map((item)=>[item.slice(0,item.length/2),item.slice(item.length/2)])

let sum = 0;

//!skipping idx 0
const priorityArray = ['',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


const types:string[] = []


for (let data of splitted){
    
    let first = data[0].split('');
    let second = data[1].split('');

   const intersection = first.filter((letter)=>second.indexOf(letter) !== -1)

    //*we only care about 1 element since filter may return two or more the same letter
   types.push(intersection[0])
}

//?probably not need to check if we find indexOf since priorityArray has all the letters.
types.forEach((letter)=>sum+=priorityArray.indexOf(letter) === -1 ? 0 : priorityArray.indexOf(letter))

console.log