import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { champions } from '../../services/champs';
import { Champ } from '../../interfaces/champ';
import { GuessingService } from '../../services/guessing.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent implements OnInit {
  options: Champ[] = champions;
  control = new FormControl<string | Champ>("");
  filteredOptions?: Observable<Champ[]>;
  
  constructor(
    public formBuilder: FormBuilder,
    public guessingService: GuessingService
  ){}

  ngOnInit() {
    this.resetFilter()
  }

  displayFn(champ: Champ): string {
    return champ && champ.name ? champ.name : '';
  }

  private _filter(name: string): Champ[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  select(option: Champ){
    this.guessingService.selectChamp(option);
    this.resetFilter();
    this.control.reset();
  }

  removeSelected(){
    let champs:Champ[] = [];
    this.options.forEach(v=>{
      if(!this.guessingService.selected().includes(v))
        champs.push(v)
    })
    this.options = champs;
  }

  resetFilter(){
    this.removeSelected();
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
}