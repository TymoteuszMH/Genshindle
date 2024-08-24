import { Injectable, WritableSignal, signal } from '@angular/core';
import { Champ } from '../interfaces/champ';
import { champions } from './champs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuessingService {

  champion!: Champ;
  selected!: WritableSignal<Champ[]>;
  won!: WritableSignal<boolean>;
  
  constructor(public storage: StorageService,
  ){}

  private rNG(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getStorage(){
    this.selected = this.storage.parseSelected();
    this.won = this.storage.parseWon();
    this.champion = this.getChamp(this.storage.parseChamp());
  }

  getChamp(nr: number):Champ{
    if(nr == 0)
      nr = this.rNG(1, 73);
    let champ!:Champ;
    champions.filter( v => {
      if(v.id == nr){
        champ = v;
      }
    })
    this.storage.saveStorage(nr, this.selected(), this.won())
    return champ;
  }

  selectChamp(champ:Champ){
    this.selected().unshift(champ);
    if(this.champion == champ){
      this.won.set(true);
    }
    this.storage.saveStorage(this.champion.id, this.selected(), this.won())
  }

  reset(){
    this.champion = this.getChamp(0);
    this.selected.set([]);
    this.won.set(false)
    this.storage.resetStorage(this.champion.id)
  }
}  
