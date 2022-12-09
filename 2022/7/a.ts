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
const goDepth = (arr: Dir[], depth = 0) => {
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

//getting homeDir
for (let [idx, command] of data.entries()) {
  if (command.startsWith('cd')) {
    data.splice(0, idx)
    break
  }

  if (command.startsWith('dir')) {
    homeDir.push({ name: command, subElements: [], size: 0 })
  } else {
    const [size, name] = command.split(' ')
    homeDir.push({ name: name, size: Number(size) })
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
  if (dir) {
    if (command.startsWith('dir')) {
      //!subElements is know because its a dir not a file
      dir.subElements?.push({ name: command, subElements: [], size: 0 })
    } else {
      const [size, name] = command.split(' ')

      dir.subElements?.push({ name: name, size: Number(size) })
    }
  }
}

for (let entity of homeDir) {
  console.log(entity)
}

goDepth(homeDir)
