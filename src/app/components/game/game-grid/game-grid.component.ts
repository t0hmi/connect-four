import { Component, Input, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { PlayerService } from 'src/app/services/player.service';
import { TimerService } from 'src/app/services/timer.service';
import { CellValue, Player } from 'src/app/shared/types';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss']
})
export class GameGridComponent implements OnInit {
  
  @Input('activePlayer')
  activePlayer!: Player;

  columns = this.gridService.getColumns();
  rows = this.gridService.getRows();

  CellValueEnum = CellValue;

  constructor(private timerService: TimerService, private gridService: GridService, private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  getCellValue(column: number, row:number): CellValue {
    return this.gridService.getCellType(column,row);
  }

  isWinningCell(column: number, row: number): boolean {
    return this.gridService.isWinningToken(column,row);
  }

  addToken(column: number, token: CellValue) {
    const isSuccess = this.gridService.addToken(column, token);
    if(isSuccess) {
      this.playerService.switchActivePlayer();
      this.timerService.resetTime();
    }
  }
  
}
