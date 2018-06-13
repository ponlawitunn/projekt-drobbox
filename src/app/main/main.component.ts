import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FilterPipe } from '../filter.pipe';

const key = "H9c8bkAnoVAAAAAAAAAALWUY05P41wCf5HakHe0B3AXsxS21ysKJ71gZyPyBYx7g"

require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: key });
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  
})
export class MainComponent implements OnInit {
  entries = [];
  term = "";
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.url.subscribe(() => {
      console.log(this.router.url)
      let url = this.router.url;
      if (url == "/") {
        url = ""
      }
      dbx.filesListFolder({path: url})
      .then((response) => {
        console.log(response);
        this.entries = response.entries;
      })
    })
  }

}
