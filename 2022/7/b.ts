import fs from 'fs'
import _ from 'lodash'
import { exit } from 'process'

interface Dir {
  name: string
  subElements?: Dir[]
  size: number
}

//*split on new line and remove mac's \r
const homeDir: Dir[] = []
let data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(element => element.replace('\r', ''))
  .map(element => element.replace('$ ', ''))
let path: string[] = []

//? :)
const goDepth = (arr = homeDir, depth = 0) => {
  if (!arr) return
  for (let entity of arr) {
    console.log(`${'\t'.repeat(depth)}-${entity.name} ${entity.size}`)
    if (entity.subElements) {
      goDepth(entity.subElements, depth + 1)
    }
  }
}

const cwd = (dir = homeDir, currPos = 0): Dir | undefined => {
  //!call find at least once
  let res = dir.find(
    ent =>
      ent.name.startsWith('dir') && ent.name.split(' ')[1] === path[currPos]
  )
  if (res)
    if (currPos === path.length - 1) {
      return res
    } else {
      //*dig deeper
      return cwd(res.subElements, currPos + 1)
    }
}

const cd = (dest: string) => {
  //not '/'
  if (dest === '..' && path.length !== 0) {
    path.pop()
  } else {
    path.push(dest)
  }
}

for (let command of data) {
  if (command.startsWith('cd')) {
    cd(command.split(' ')[1])
    continue
  }

  //i don't think if ls is needed
  if (command.startsWith('ls')) continue

  //ls does the following
  let dir = cwd()
  //!no dir -> we are in '/'
  if (!dir) {
    if (command.startsWith('dir')) {
      homeDir.push({ name: command, subElements: [], size: 0 })
    } else {
      const [size, name] = command.split(' ')
      homeDir.push({ name: name, size: Number(size) })
    }
  } else {
    if (command.startsWith('dir')) {
      //!subElements is known because its a dir not a file
      //* thats why not null assertion
      dir.subElements!.push({ name: command, subElements: [], size: 0 })
    } else {
      const [size, name] = command.split(' ')

      dir.subElements!.push({ name: name, size: Number(size) })
    }
  }
}

//* return sizes of every dir based on their subdirectories
for (let entity of homeDir) {
  if (entity.name.startsWith('dir')) {
    //! only dir has subelements
    entity.size = entity.subElements!.reduce(function recur(
      sum: number,
      child: Dir
    ): number {
      return (
        sum + (child.size = (child.subElements ?? []).reduce(recur, child.size))
      )
    },
    0)
  }
}

const usedSpace = homeDir.reduce((a, b) => a + b.size, 0)

const MAX_STORAGE = 70_000_000
const currentSpace = MAX_STORAGE - usedSpace
const requiresSpace = 30_000_000 - currentSpace

let allDirs: Dir[] = []

for (let entity of homeDir) {
  if (entity.name.startsWith('dir')) {
    //! only dir has subelements

    //*check main dir
    if (entity.name.startsWith('dir')) {
      allDirs.push(entity)
    }
    //*serach through it
    entity.subElements!.reduce(function recur(acc: Dir[], child: Dir): Dir[] {
      if (child.name.startsWith('dir')) {
        allDirs.push(child)
      }
      if (child.subElements)
        return child.subElements.reduce(recur, child.subElements)

      return acc
    }, [])
  }
}
//!sort ascending and get >= requires space
console.log(
  allDirs.sort((a, b) => a.size - b.size).find(ent => ent.size >= requiresSpace)
    ?.size
)
