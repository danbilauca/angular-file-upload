import {Component, isDevMode, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SingleFileUploadComponent} from "./single-file-upload/single-file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SingleFileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-file-upload';
  constructor() { }
  ngOnInit() {
    console.log(isDevMode());
    console.log("AppComponent initialized");
  }
}
