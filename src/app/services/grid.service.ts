import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CellValue, ConnectFourBoard, Neighbours, Token } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private columns = 7;
  private rows = 6;

  private gameFinishSubject: BehaviorSubject<boolean>;
  isGameFinish$: Observable<boolean>;

  private connectFourBoard : ConnectFourBoard = [];
  private consecutiveToken: Token[] = [];

  getConsecutiveToken(): Token[] {
    return this.consecutiveToken;
  }

  getColumns(): number {
    return this.columns;
  } 

  getCellType(column: number, row: number): CellValue {
    return this.connectFourBoard[column][row];
  }

  getRows(): number {
    return this.rows;
  }

  canAddTokenToColumn(column: number): boolean {
    return this.connectFourBoard[column][0] === CellValue.Empty;
  }

  getFirstEmptyRowInColumn(column: number): number {
    for(let i = this.rows - 1; i >= 0; i--) {
      if(this.connectFourBoard[column][i] === CellValue.Empty) {
        return i;
      }
    }
    return -1;
  }

  private isValidPosition(column: number, row: number): boolean {
    return (column < this.columns && column >= 0) && (row < this.rows && row >= 0)
  }

  getNeighbours(token: Token): Neighbours {
    let neighbours : Neighbours = {} as Neighbours;

    if(this.isValidPosition(token.column+1, token.row) && this.connectFourBoard[token.column+1][token.row] != CellValue.Empty) {
      neighbours.right = {column: token.column+1, row: token.row, type: this.connectFourBoard[token.column+1][token.row]};
    }

    if(this.isValidPosition(token.column-1, token.row) && this.connectFourBoard[token.column-1][token.row] != CellValue.Empty) {
      neighbours.left = {column: token.column-1, row: token.row, type: this.connectFourBoard[token.column-1][token.row]}; 
    }

    if(this.isValidPosition(token.column, token.row-1) && this.connectFourBoard[token.column][token.row-1] != CellValue.Empty) {
      neighbours.top = {column: token.column, row: token.row-1, type: this.connectFourBoard[token.column][token.row-1]}; 
    }

    if(this.isValidPosition(token.column, token.row+1) && this.connectFourBoard[token.column][token.row+1] != CellValue.Empty) {
      neighbours.bottom = {column: token.column, row: token.row+1, type: this.connectFourBoard[token.column][token.row+1]}; 
    }

    if(this.isValidPosition(token.column-1, token.row-1) && this.connectFourBoard[token.column-1][token.row-1] != CellValue.Empty) {
      neighbours.topLeft = {column: token.column-1, row: token.row-1, type: this.connectFourBoard[token.column-1][token.row-1]};
    }

    if(this.isValidPosition(token.column+1, token.row-1) && this.connectFourBoard[token.column+1][token.row-1] != CellValue.Empty) {
      neighbours.topRight = {column: token.column+1, row: token.row-1, type: this.connectFourBoard[token.column+1][token.row-1]};
    }

    if(this.isValidPosition(token.column-1, token.row+1) && this.connectFourBoard[token.column-1][token.row+1] != CellValue.Empty) {
      neighbours.bottomLeft = {column: token.column-1, row: token.row+1, type: this.connectFourBoard[token.column-1][token.row+1]};
    }

    if(this.isValidPosition(token.column+1, token.row+1) && this.connectFourBoard[token.column+1][token.row+1] != CellValue.Empty) {
      neighbours.bottomRight = {column: token.column+1, row: token.row+1, type: this.connectFourBoard[token.column+1][token.row+1]};
    }

    return neighbours;
  }

  checkForWin(token: Token): Token[] {
   const neighbours = this.getNeighbours(token);
   
   for(const direction in neighbours) {
    
    let consecutiveToken : Token[] = [];

    if(direction === 'bottom' || direction === 'top') { // vertical
      for(let i = 0; i < this.rows; i++) {
        if(this.connectFourBoard[token.column][i] === token.type) {
          consecutiveToken.push({column: token.column, row: i, type : token.type});
        }else {
          consecutiveToken = []
        }
        if(consecutiveToken.length === 4) {
          return consecutiveToken;          
        }
      
      }
    }

    if(direction === 'left' || direction === 'right') { //horizontal
      consecutiveToken = [];
      for(let i = 0; i < this.columns; i++) {
        if(this.connectFourBoard[i][token.row] === token.type) {
          consecutiveToken.push({column: i, row: token.row, type: token.type});
        }else {
          consecutiveToken = []
        }

        if(consecutiveToken.length === 4) {
          return consecutiveToken;
        }
      }
    }

    if(direction === 'topLeft' || direction === 'bottomRight') {
        let currentRow = token.row;
        let currentColumn = token.column;

        while(currentRow > 0 && currentColumn > 0) { // get first x,y position 
          currentColumn--;
          currentRow--;
        }

        while(currentColumn < this.columns && currentRow < this.rows) { // get all token on the diagonal 
          if(this.connectFourBoard[currentColumn][currentRow] === token.type) {
            consecutiveToken.push({column: currentColumn, row: currentRow, type: token.type});
          }else {
            consecutiveToken = []
          }
          
          if(consecutiveToken.length === 4) {
            return consecutiveToken;
          }

          currentColumn++; 
          currentRow++;
        }
    }
    

    if(direction === 'topRight' || direction === 'bottomLeft') {
      consecutiveToken = [];

      let currentColumn = token.column;
      let currentRow = token.row;

      while (currentRow > 0 && currentColumn + 1 < this.columns ) { // get first x,y position
        currentRow--;
        currentColumn++;
      }

      while (currentRow < this.rows && currentColumn >= 0 ) { // get all token on the diagonal
        if(this.connectFourBoard[currentColumn][currentRow] === token.type) {
          consecutiveToken.push({column: currentColumn, row: currentRow, type: token.type});
        }else {
          consecutiveToken = []
        }
        
        if(consecutiveToken.length === 4) {
          return consecutiveToken;
        }
        currentRow++;
        currentColumn--;
      }

    }

   }

   return [];
  }

  addToken(column: number, token: CellValue): boolean {
    if(this.gameFinishSubject.value || !this.canAddTokenToColumn(column)) return false;

    const firstEmptyRow = this.getFirstEmptyRowInColumn(column);
    this.connectFourBoard[column][firstEmptyRow] = token;
    this.consecutiveToken = this.checkForWin({column: column, row:firstEmptyRow, type:token})
    
    if(this.consecutiveToken.length === 4) {
      this.stopGame();
      return false;
    }

    return true;
  } 

  isWinningToken(column: number, row: number): boolean {
    return this.consecutiveToken.filter(token => token.column === column && token.row === row).length > 0;
  }

  stopGame(): void {
    this.gameFinishSubject.next(true);
  }

  startGame(): void {
    this.initializeConnectFourBoard();
    this.gameFinishSubject.next(false);
  }

  initializeConnectFourBoard(): void {
    this.consecutiveToken = [];
    this.connectFourBoard =  Array.from({length: this.columns}, () => Array.from({length: this.rows}, () => CellValue.Empty));
  }

  constructor() {
    this.initializeConnectFourBoard();
    this.gameFinishSubject = new BehaviorSubject<boolean>(false);
    this.isGameFinish$ = this.gameFinishSubject.asObservable();
  }

}
