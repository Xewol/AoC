import fs from 'fs'


// [M] [H]         [N]                
// [S] [W]         [F]     [W] [V]    
// [J] [J]         [B]     [S] [B] [F]
// [L] [F] [G]     [C]     [L] [N] [N]
// [V] [Z] [D]     [P] [W] [G] [F] [Z]
// [F] [D] [C] [S] [W] [M] [N] [H] [H]
// [N] [N] [R] [B] [Z] [R] [T] [T] [M]
// [R] [P] [W] [N] [M] [P] [R] [Q] [L]
//  1   2   3   4   5   6   7   8   9 

 const crates = [
    []
 ,['R','N','F','V','L','J','S','M']
 ,['P','N','D','Z','F','J','W','H']
 ,['W','R','C','D','G']
 ,['N','B','S']
 ,['M','Z','W','P','C','B','F','N']
 ,['P','R','M','W']
 ,['R','T','N','G','L','S','W']
 ,['Q','T','H','F','N','B','V']
 ,['L','M','H','Z','N','F']]


const data = fs.readFileSync('./data.txt','utf8')
//*split on new line, replace mac's \r 
let splitted=data.split('\n').map((command)=>command.replace('\r',''))

let commands = splitted.map(commands=>commands.split(' ').filter((_,idx)=>idx%2 !== 0).map(Number))

//how many //from //to

const moveCrate = (qty:number,from:number,to:number)=>{

    for (let i=0;i<qty;i++){
       let removed =  crates[from].pop()
       if(removed)
       crates[to].push(removed)
    }
}


for (let command of commands){
    const [qty,from,to] = command;
    moveCrate(qty,from,to);
}


let anwser=''
for (let col of crates){
    if(col[col.length-1])
    anwser+=col[col.length-1]
}

console.log(anwser)