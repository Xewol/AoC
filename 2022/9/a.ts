import fs from 'fs'
import _ from 'lodash'

const data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(move => move.replace('\r', ''))
  .map(move => move.split(' '))
  .map(([value, count]) => [value, Number(count)])

type Coordinate = { x: number; y: number }

function getTailPosition(head: Coordinate, tail: Coordinate): Coordinate {
  if (Math.abs(head.x - tail.x) === 2 || Math.abs(head.y - tail.y) === 2) {
    // if the head is ever two steps directly up, down, left, or right from the tail,
    // the tail must also move one step in that direction so it remains close enough.
    return {
      x: tail.x + (head.x - tail.x) / Math.abs(head.x - tail.x),
      y: tail.y + (head.y - tail.y) / Math.abs(head.y - tail.y),
    }
  } else if (head.x !== tail.x && head.y !== tail.y) {
    // Otherwise, if the head and tail aren't touching and aren't in the same row or column,
    // the tail always moves one step diagonally to keep up.
    return {
      x: tail.x + (head.x - tail.x) / Math.abs(head.x - tail.x),
      y: tail.y + (head.y - tail.y) / Math.abs(head.y - tail.y),
    }
  } else {
    // If none of the above conditions are met, the tail does not move.
    return tail
  }
}

const Head: Coordinate = { x: 0, y: 0 }
let Tail: Coordinate = { x: 0, y: 0 }

const makeMove = (move: string) => {
  switch (move) {
    case 'R':
      Head.x++
      break
    case 'L':
      Head.x--
      break
    case 'U':
      Head.y++
      break
    case 'D':
      Head.y--
      break
  }
}
const tailMoves: Coordinate[] = []
for (const [move, value] of data) {
  for (let i = 0; i < value; i++) {
    makeMove(move as string)
    Tail = getTailPosition(Head, Tail)
    tailMoves.push(Tail)
  }
}

console.log(tailMoves.length)
