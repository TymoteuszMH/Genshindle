import { Component } from '@angular/core';
import { GuessingService } from '../../services/guessing.service';
import { FormBuilder } from '@angular/forms';
import { Champ } from '../../interfaces/champ';
import { champions } from '../../services/champs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  constructor(
    public guessingService: GuessingService
  ){}

  reset(){
    this.guessingService.reset();
  }
}
