import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridService } from './grid.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timeSubject: BehaviorSubject<number>;
  time$ : Observable<number>;


  constructor(private playerService: PlayerService, private gridService: GridService) {
    this.timeSubject = new BehaviorSubject(30);
    this.time$ = this.timeSubject.asObservable();
  }

  createTimer(): void {
    this.timeSubject.next(30);

    setInterval(() => {

      this.gridService.isGameFinish$.subscribe(isGameFinish => {
        if(!isGameFinish) {
          this.timeSubject.next(this.timeSubject.value - 1);
          if(this.timeSubject.value === 0) {
            this.timeSubject.next(30);
            this.playerService.switchActivePlayer();
          }
        } 
      }) 
    }, 1000);
  }

  resetTime(): void {
    this.timeSubject.next(30);
  }
}
