import { Component, OnInit, Signal, computed } from '@angular/core';
import { GuessingService } from '../../services/guessing.service';
import { Champ } from '../../interfaces/champ';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  champions: Signal<Champ[]> = computed(()=>{
    return this.service.selected();
  });

  constructor(public spinner: NgxSpinnerService,
    public service: GuessingService){
  }

  public giveClass(cl: string='', color: boolean, i: number, el: number): string{
    if(i==0)
      return `new${el} ${cl} ${color}`;
    return `${cl} ${color}`;
    }
}
