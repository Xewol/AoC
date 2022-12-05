import fs from 'fs'


enum Opponent {
    //ROCK //PAPER //SCISSORS
    A=1,B=2,C=3
}


enum Player {
    //ROCK //PAPER //SCISSORS
    X=1,Y=2,Z=3
}


enum State{
    WIN=6,
    LOSE=0,
    DRAW=3,
}






const data = fs.readFileSync('./data.txt','utf8')


let splitted=data.split('\n')
splitted = splitted.map((pair)=>pair.replace('\r',''))
let sum = 0;


const evaluate = (opponentMove:string,playerMove:string):number=>{
    let playerPoint = Player[playerMove as keyof typeof Player]
    let opponentPoint = Opponent[opponentMove as keyof typeof Opponent]
    if(playerPoint - opponentPoint === 1 || opponentPoint - playerPoint ===2){
        console.log('outcome Win')
        return State.WIN+playerPoint
    }
    else if(playerPoint - opponentPoint===0){
        console.log('outcome Draw')
        return State.DRAW+playerPoint
    }
    else{
        console.log('outcome Lose')
        return State.LOSE+playerPoint
    }



}



for (let round of splitted){
    const points = round.split(' ')
    sum+= evaluate(points[0],points[1])

   
}
console.log(sum)
