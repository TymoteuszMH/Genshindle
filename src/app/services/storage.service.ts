import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, WritableSignal, signal } from '@angular/core';
import { Champ } from '../interfaces/champ';
import { champions } from './champs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  lS: WritableSignal<any> = signal(null);

  constructor(@Inject(DOCUMENT) document: Document) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) 
      this.lS.set(localStorage)
  }

  parseChamp():number{
    let champ:string|null = this.lS() != null  ? this.lS().getItem('champ') : null;
    if(champ == null || champ == "undefined"){
      return 0;
    }else{
      return parseInt(JSON.parse(champ));
    }
  }

  parseSelected():WritableSignal<Champ[]>{
    let selected: string = this.lS() != null ? this.lS().getItem('selected') : '';
    if(selected == '' || selected == undefined){
      return signal<Champ[]>([])
    }else{
      let list:Champ[] = JSON.parse(selected ? selected : ''),
      endList: Champ[] = [];
      list.filter(v1=>{
        champions.filter(v2=>{
          if(v1.id==v2.id)
            endList.push(v2)
        })
      })
      return signal<Champ[]>(endList)
    }
  }

  parseWon(): WritableSignal<boolean>{
    let won: string|null = this.lS() != null  ? this.lS().getItem('won') : null;
    if(won == null || won == undefined || won == '0'){
      return signal(false);
    }else{
      return signal(true);
    }
  }

  saveStorage(champId:number, selected: Champ[], won: boolean){  
    if(this.lS() != null){
      this.lS().setItem('champ', champId);
      this.lS().setItem('selected', JSON.stringify(selected));
      this.lS().setItem('won', won ? '1':'0');
    }
  }

  resetStorage(newChampId: number){
    this.lS().clear();
    this.saveStorage(newChampId, [], false);
  }
}
