import fs from 'fs'



enum Outcome{
    Z=6,
    Y=3,
    X=0,
}

enum Opponent {
    //ROCK //PAPER //SCISSORS
    A=1,B=2,C=3
}

const data = fs.readFileSync('./data.txt','utf8')


let splitted=data.split('\n')
splitted = splitted.map((pair)=>pair.replace('\r',''))


let sum=0; 

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
