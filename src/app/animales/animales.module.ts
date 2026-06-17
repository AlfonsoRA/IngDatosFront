import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';

@NgModule({
  declarations: [AnimalListComponent, AnimalFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [AnimalListComponent, AnimalFormComponent],
})
export class AnimalesModule {}
