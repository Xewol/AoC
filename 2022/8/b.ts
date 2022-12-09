import fs from 'fs'
import _ from 'lodash'
import { exit } from 'process'

let data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(tree => tree.replace('\r', ''))
  .map(tree => tree.split('').map(Number))

const getVisionScore = (val: number, row: number, col: number) => {
  //? check every direction
  //!.reverse() where needed ->iterating from begin of array to given element,
  //! but values are checked from element to sides
  const top = data
    .map(row => row[col])
    .filter((_, idx) => idx < row)
    .reverse()
  const left = data[row].filter((_, idx) => idx < col).reverse()
  const bottom = data.map(row => row[col]).filter((_, idx) => idx > row)
  const right = data[row].filter((_, idx) => idx > col)

  const t: number[] = []
  const l: number[] = []
  const r: number[] = []
  const b: number[] = []
  for (let el of top) {
    if (el < val) {
      t.push(el)
    } else {
      t.push(el)
      break
    }
  }
  for (let el of left) {
    if (el < val) {
      l.push(el)
    } else {
      l.push(el)
      break
    }
  }
  for (let el of right) {
    if (el < val) {
      r.push(el)
    } else {
      r.push(el)
      break
    }
  }
  for (let el of bottom) {
    if (el < val) {
      b.push(el)
    } else {
      b.push(el)
      break
    }
  }

  return (
    (t.length ? t.length : 1) *
    (l.length ? l.length : 1) *
    (b.length ? b.length : 1) *
    (r.length ? r.length : 1)
  )
}

const visionScores: number[] = []
for (let i = 1; i < data.length - 1; i++) {
  for (let j = 1; j < data[i].length - 1; j++) {
    let score = getVisionScore(data[i][j], i, j)
    visionScores.push(score)
  }
}

console.log(_.max(visionScores))
