import fs from 'fs'



const data = fs.readFileSync('./data.txt','utf8')


let splitted=data.split('\n')
splitted = splitted.map((pair)=>pair.replace('\r',''))

console.log(splitted)