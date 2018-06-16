import { Component } from '@angular/core';
const key = "H9c8bkAnoVAAAAAAAAAALWUY05P41wCf5HakHe0B3AXsxS21ysKJ71gZyPyBYx7g"

require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: key });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  entries = [];
  constructor () {
    dbx.filesListFolder({path: ''})
  .then((response) => {
    console.log(response);
    this.entries = response.entries;
  })
  .catch(function(error) {
    console.log(error);
  });
  }
  onClick () {

  }
}
