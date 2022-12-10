import fs from 'fs'
import _ from 'lodash'
import { exit } from 'process'

const data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(tree => tree.replace('\r', ''))
  .map(tree => tree.split('').map(Number))

const visibleTrees: number[] = []

const checkVisibility = (val: number, row: number, col: number) => {
  //? check every direction
  const top = data.map(row => row[col]).filter((_, idx) => idx < row)
  const left = data[row].filter((_, idx) => idx < col)
  const bottom = data.map(row => row[col]).filter((_, idx) => idx > row)
  const right = data[row].filter((_, idx) => idx > col)

  //!other trees are blocking its view
  let t = !top.map(num => num >= val).includes(true)
  let l = !left.map(num => num >= val).includes(true)
  let r = !right.map(num => num >= val).includes(true)
  let b = !bottom.map(num => num >= val).includes(true)
  return t || l || r || b
}

//!frame
visibleTrees.push(...data.map(row => row[0]))
visibleTrees.push(...data.map(row => row[visibleTrees.length - 1]))
visibleTrees.push(
  ...data[0].filter((_, idx) => idx !== 0 && idx !== data[0].length - 1)
)
visibleTrees.push(
  ...data[data.length - 1].filter(
    (_, idx) => idx !== 0 && idx !== data[0].length - 1
  )
)

for (let i = 1; i < data.length - 1; i++) {
  for (let j = 1; j < data[i].length - 1; j++) {
    if (checkVisibility(data[i][j], i, j)) visibleTrees.push(data[i][j])
  }
}

console.log(visibleTrees.length)
