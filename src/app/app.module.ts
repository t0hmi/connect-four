import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { GameGridComponent } from './components/game/game-grid/game-grid.component';
import { MenuComponent } from './components/menu/menu.component';
import { GamePlayerComponent } from './components/game/game-player/game-player.component';
import { RangePipe } from './pipes/range.pipe';
import { GameHeaderComponent } from './components/game/game-header/game-header.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameGridComponent,
    MenuComponent,
    GamePlayerComponent,
    RangePipe,
    GameHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
