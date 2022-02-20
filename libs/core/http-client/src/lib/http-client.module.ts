import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from './http-client.service';
import { HttpClientModule as HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClient],
  providers: [HttpClientService],
})
export class HttpClientModule {}
