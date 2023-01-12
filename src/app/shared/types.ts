export type ConnectFourBoard = CellValue[][]

export enum CellValue {
    Empty = 0,
    Player1 = 1,
    Player2 = 2
}

export type Token = {
    row: number,
    column: number,
    type: CellValue
}

export type Neighbours = {
    top: Token,
    bottom: Token,
    left: Token,
    right: Token,
    topLeft: Token,
    topRight: Token,
    bottomLeft: Token,
    bottomRight: Token
}

export type Player = {
    score: number,
    token: CellValue,
    name: string
}