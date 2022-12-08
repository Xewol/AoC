import fs from 'fs'
import _, { first, without } from 'lodash'
import util from 'util'



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


for (let command of data){
    if(command.startsWith('cd')){
        cd(command.split(' ')[1])
        continue;
    }
    //i don't think if ls is needed
    if(command.startsWith('ls')) continue;
    //ls does the following
    for (let entity of homeDir){
        //! we cant check subdirectories of file so we skip
        if(!entity.name.startsWith('dir')) continue;
        //*it's a main subdirectory of '/'
        if(entity.name.split(' ')[1] === cwd()){
            if(command.startsWith('dir')){
                //!subElements is know because its a dir not a file
                entity.subElements!.push({name:command,subElements:[],size:0})
            }
            else{
                const [size,name] =command.split(' ')
                entity.subElements!.push({name:name,size:Number(size)})
            }
        }
        //*need to search through every folder until dir is found
        else{
            let foundDir = entity.subElements!.find((val)=>val.name.split(' ')[1] === cwd())
            if(foundDir){
                if(command.startsWith('dir')){
                    //!subElements is know because its a dir not a file
                    foundDir.subElements!.push({name:command,subElements:[],size:0})
               }
               else{
                const [size,name] =command.split(' ')
                foundDir.subElements!.push({name:name,size:Number(size)})
               }
            }
        }
    }
    
}


//? :)
const goDepth = (arr:Dir[],depth=0)=>{
    if (!arr)return
    for (let entity of arr){
        
        console.log(`${'\t'.repeat(depth)}-${entity.name} ${!entity.name.startsWith('dir')  ? `${entity.size}` : ''}`)
        if(entity.subElements){
            goDepth(entity.subElements,depth+1)
        }
    }

}



goDepth(homeDir)