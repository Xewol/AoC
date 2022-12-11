import fs from 'fs'
import _ from 'lodash'

const data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(move => move.replace('\r', ''))
  .map(move => move.split(' '))
  .map(([value, count]) => [value, Number(count)])

type Coordinate = { x: number; y: number }

function moveTail() {
  const tailWatch = { ...Tail }
  //* if the head is ever two steps directly up, down, left, or right from the tail,
  //* the tail must also move one step in that direction so it remains close enough.
  let xMove = Head.x - Tail.x
  let yMove = Head.y - Tail.y
  if (
    (Math.abs(xMove) === 2 && yMove >= 2) ||
    (Math.abs(yMove) === 2 && xMove >= 2)
  ) {
    Tail.x += xMove > 0 ? 1 : -1
    Tail.y += yMove > 0 ? 1 : -1
    return !_.isEqual(Tail, tailWatch) && tailMoves.push({ ...Tail })
  }
  if (Math.abs(xMove) === 2) {
    Tail.x += xMove > 0 ? 1 : -1
    return !_.isEqual(Tail, tailWatch) && tailMoves.push({ ...Tail })
  }
  if (Math.abs(yMove) === 2) {
    Tail.y += yMove > 0 ? 1 : -1
    return !_.isEqual(Tail, tailWatch) && tailMoves.push({ ...Tail })
  }
}

const Grid: string[][] = Array(8)
  .fill('.')
  .map(x => Array(10).fill('.'))

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
    moveTail()
  }
}
console.log(tailMoves.length)
console.log(tailMoves)

for (let move of tailMoves) {
  Grid[move.y][move.x] = '#'
}
console.log(Grid.reverse().map(x => x.join('')))

function test() {
  Head.x = 3
  Head.y = 1
  Tail.x
}
