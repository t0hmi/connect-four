import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss']
})
export class GamePlayerComponent implements OnInit {

  @Input('score') score = 0;
  @Input('player-number') playerNumber = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
