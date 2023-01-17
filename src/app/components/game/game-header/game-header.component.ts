import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { PlayerService } from 'src/app/services/player.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {

  constructor(private gridService: GridService, private userService: PlayerService, private timerService: TimerService) { }

  ngOnInit(): void {
  }

  restart(): void {
    this.gridService.initializeConnectFourBoard();
    this.timerService.clearTimerInterval();
    this.timerService.createTimer();
  }

}
