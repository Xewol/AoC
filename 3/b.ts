import { log } from 'console'
import fs from 'fs'



const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r and return slices of 2 compartments 
let splitted=data.split('\n').map((pair)=>pair.replace('\r',''))

let splittedTrios:string[][] = []

for(let i=0;i<splitted.length;i+=3){
splittedTrios.push(splitted.slice(i,i+3))
}

let sum = 0;

//!skipping idx 0
const priorityArray = ['',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const badges:string[] = []

console.log(splittedTrios.length)

for (let chunk of splittedTrios){
    let firstRucksack = chunk[0].split('')
    let secondRucksack = chunk[1].split('')
    let thirdRucksack = chunk[2].split('')
    let badge = firstRucksack.filter((letter)=>secondRucksack.includes(letter) && thirdRucksack.includes(letter))

    badges.push(badge[0])
    
}

for (let letter of badges){

    sum+=priorityArray.indexOf(letter)
}

console.log(sum)