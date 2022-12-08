import fs from 'fs'
import _ from 'lodash'




interface Dir{
    name:string,
    subElements?:Dir[]
    size:number
}

//*split on new line and remove mac's \r
const homeDir:Dir[] = []
let data = fs.readFileSync('./data.txt','utf8').split('\n').map((element)=>element.replace('\r','')).map((element)=>element.replace('$ ',''))
let dirHist:string[] =[]

const cwd = ()=>dirHist[dirHist.length-1]

const cd = (dest:string)=>{
    //not '/'
    if(dest ==='..' && dirHist.length !== 1){
        dirHist.pop()
    }
    dirHist.push(dest)
}



//getting homeDir
for (let [idx,command] of data.entries()){
    if(command.startsWith('cd')){
        data.splice(0,idx)
        break;
    }

    if(command.startsWith('dir')){
         homeDir.push({name:command,subElements:[],size:0})
    }
    else{
        const [size,name] =command.split(' ')
        homeDir.push({name:name,size:Number(size)})
    }
    
}

console.log("Home dir",homeDir)

for (let command of data){
    if(command.startsWith('cd')){
        cd(command.split(' ')[1])
    }
       //i dont think if ls is needed
    if(command.startsWith('ls')) continue;

    
}


// console.log(data)