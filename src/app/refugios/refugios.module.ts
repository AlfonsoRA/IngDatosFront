import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RefugioListComponent } from './refugio-list/refugio-list.component';
import { RefugioFormComponent } from './refugio-form/refugio-form.component';

@NgModule({
  declarations: [RefugioListComponent, RefugioFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [RefugioListComponent, RefugioFormComponent],
})
export class RefugiosModule {}
