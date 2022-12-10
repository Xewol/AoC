import fs from 'fs'
import _, { values } from 'lodash'
import { stringify } from 'querystring'

const data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(move => move.replace('\r', ''))
  .map(move => move.split(' '))
  .map(([value, count]) => [value, Number(count)])

const gridSize = { w: 1, h: 1 }
for (const [move, value] of data) {
  switch (move as string) {
    case 'R':
      gridSize.w += value as number
      break
    case 'U':
      gridSize.h += value as number
      break
  }
}

const Grid: string[][] = Array(gridSize.w)
  .fill('.')
  .map(x => Array(gridSize.h).fill('.'))
Grid[0].map(arr => (arr[arr[0].length - 1] = 's'))
console.log(Grid)
