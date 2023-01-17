import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridService } from './grid.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timeSubject: BehaviorSubject<number>;
  time$ : Observable<number>;
  subscription: Subscription = new Subscription;
  interval: any;

  constructor(private playerService: PlayerService, private gridService: GridService) {
    this.timeSubject = new BehaviorSubject(30);
    this.time$ = this.timeSubject.asObservable();
  }

  clearTimerInterval(): void {
    clearInterval(this.interval);
  }


  createTimer(): void {
    this.timeSubject.next(30);

    this.interval = setInterval(() => {

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
