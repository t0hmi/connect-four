import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CellValue, Player } from '../shared/types';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private activePlayerSubject: BehaviorSubject<Player>;

  players = {
    player1: 
    {
      name: 'player1',
      token: CellValue.Player1,
      score: 0
    },
    player2:
    {
      name: 'player2',
      token: CellValue.Player2,
      score: 0
    } 
  }

  activePlayer$: Observable<Player>;

  constructor() { 
    this.activePlayerSubject = new BehaviorSubject<Player>(this.players.player1);
    this.activePlayer$ = this.activePlayerSubject.asObservable();
  }

  switchActivePlayer(): void {
    const currentActivePlayer = this.activePlayerSubject.value;
    if(currentActivePlayer === this.players.player1) {
      this.activePlayerSubject.next(this.players.player2);
    }else {
      this.activePlayerSubject.next(this.players.player1);
    }
  }

  updateScoreForWin(player: Player): any {
    player = {...player, score: player.score+1};
    this.players = {...this.players,  [player.name] : player };
    return this.players;
  }
}
