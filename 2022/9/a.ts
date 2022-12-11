import fs from 'fs'
import _, { tail, uniq } from 'lodash'
import { json } from 'stream/consumers'

const data = fs
  .readFileSync('./data.txt', 'utf8')
  .split('\n')
  .map(move => move.replace('\r', ''))
  .map(move => move.split(' '))
  .map(([value, count]) => [value, Number(count)])

type Coordinate = { x: number; y: number }

const Head: Coordinate = { x: 0, y: 0 }
let Tail: Coordinate = { x: 0, y: 0 }
const unique = new Set<string>()
unique.add(`${0}, ${0}`)
function moveTail() {
  let { x, y } = Tail
  //* if the head is ever two steps directly up, down, left, or right from the tail,
  //* the tail must also move one step in that direction so it remains close enough.
  let xMove = Head.x - Tail.x
  let yMove = Head.y - Tail.y
  if (
    (Math.abs(xMove) === 2 && [1, 2].includes(Math.abs(yMove))) ||
    (Math.abs(yMove) === 2 && [1, 2].includes(Math.abs(xMove)))
  ) {
    x += xMove > 0 ? 1 : -1
    y += yMove > 0 ? 1 : -1
  } else if (Math.abs(xMove) === 2) {
    x += xMove > 0 ? 1 : -1
  } else if (Math.abs(yMove) === 2) {
    y += yMove > 0 ? 1 : -1
  }
  unique.add(`${x}, ${y}`)
  Tail.x = x
  Tail.y = y
}
const makeMove = (move: string) => {
  switch (move) {
    case 'R':
      Head.x += 1
      break
    case 'L':
      Head.x -= 1
      break
    case 'U':
      Head.y += 1
      break
    case 'D':
      Head.y -= 1
      break
  }
}
for (const [move, value] of data) {
  for (let i = 0; i < value; i++) {
    makeMove(move as string)
    moveTail()
  }
}

console.log(unique.size)
