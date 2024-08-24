import { Component } from '@angular/core';
import { GuessingService } from './services/guessing.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Genshindle';
  constructor(spinner: NgxSpinnerService,
    guessingService: GuessingService
  ){
    spinner.show();
    guessingService.getStorage();
    spinner.hide();
  }
}
