import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { FieldComponent } from './components/field/field.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'table', component: TableComponent},
  {path: 'field', component: FieldComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
