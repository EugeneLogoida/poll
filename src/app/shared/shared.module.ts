import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';

const MATERIAL = [
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatIconModule
]
@NgModule({
  declarations:[
    FilterPipe,
    SortPipe
  ],
  imports:[
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    SortPipe,
    FilterPipe
  ]
})
export class SharedModule {  }
