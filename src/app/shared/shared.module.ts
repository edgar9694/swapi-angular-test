import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SpinnerLoadingComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [SpinnerLoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
