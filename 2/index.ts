import fs from 'fs'


enum Opponent {
    //ROCK //PAPER //SCISSORS
    A=1,B=2,C=3
}

enum Outcome{
    Z=6,
    Y=3,
    X=0,
}

//a
// enum Player {
    //ROCK //PAPER //SCISSORS
//     X=1,Y=2,Z=3
// }

//a
// enum State{
//     WIN=6,
//     LOSE=0,
//     DRAW=3,
// }






const data = fs.readFileSync('./data.txt','utf8')


let splitted=data.split('\n')
splitted = splitted.map((pair)=>pair.replace('\r',''))
let sum = 0;

//a
// const evaluate = (opponentMove:string,playerMove:string):number=>{
//     let playerPoint = Player[playerMove as keyof typeof Player]
//     let opponentPoint = Opponent[opponentMove as keyof typeof Opponent]
//     if(playerPoint - opponentPoint === 1 || opponentPoint - playerPoint ===2){
//         console.log('outcome Win')
//         return State.WIN+playerPoint
//     }
//     else if(playerPoint - opponentPoint===0){
//         console.log('outcome Draw')
//         return State.DRAW+playerPoint
//     }
//     else{
//         console.log('outcome Lose')
//         return State.LOSE+playerPoint
//     }



// }

// for (let round of splitted){
//     const points = round.split(' ')
//     sum+= evaluate(points[0],points[1])
// }
// console.log(sum)



//b
const evaluate = (opponentMove:string,state:string):number=>{
    console.log(`${opponentMove}, ${state}`)
    let opponentPoint = Opponent[opponentMove as keyof typeof Opponent]
    let points =0
    let neededPoints = 0
    switch(state){
        case 'Z':
            neededPoints = (opponentPoint +1)>3 ?(opponentPoint +1)%3: (opponentPoint+1)
            console.log("moj ruch",neededPoints)
            points=Outcome.Z + neededPoints
            break;
        case 'Y':
            neededPoints = opponentPoint
            console.log("moj ruch",neededPoints)
            points=Outcome.Y + neededPoints
            break;
        case 'X':
            neededPoints = (opponentPoint-1) < 1 ? 3 : (opponentPoint-1)
            console.log("moj ruch",neededPoints)
            points=Outcome.X + neededPoints
            break;
    }

    return points
}


for (let round of splitted){
    const points = round.split(' ')
    sum+= evaluate(points[0],points[1])

   
}
console.log(sum)