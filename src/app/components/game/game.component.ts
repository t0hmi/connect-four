import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { PlayerService } from 'src/app/services/player.service';
import { TimerService } from 'src/app/services/timer.service';
import { Player } from 'src/app/shared/types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  activePlayer$ = this.playerService.activePlayer$;
  isGameFinish$ = this.gridService.isGameFinish$;
  players = this.playerService.players;
  countdown = 30;

  time$ = this.timeService.time$; 

  constructor(private timeService: TimerService,private gridService: GridService,private playerService: PlayerService) { }

  ngOnInit(): void {  
    this.timeService.createTimer();
  }

  continueGame(activePlayer: Player): void {
    this.players = this.playerService.updateScoreForWin(activePlayer);
    this.gridService.startGame();
    this.timeService.resetTime();
  }





}
