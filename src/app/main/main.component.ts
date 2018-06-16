import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { LoginService } from '../login.service';
import { Location } from '@angular/common';


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
  constructor(
    private route: ActivatedRoute, private router: Router,
    private location: Location
  ) { }

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
uploadFile() {
  var fileInput = (<HTMLInputElement> document.getElementById('file-upload'));
  var file = fileInput.files[0];
  dbx.filesUpload({path: '/' + file.name, contents: file})
    .then((response)=> {
      console.log(response);
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
    .catch(function(error) {
      console.error(error);
    });
  return false;
}
//downloadFile(entri.path_lower)
downloadFile(entri) {
  dbx.filesDownload({path: entri})
    .then(function(data) {
      // NOTE: The Dropbox SDK specification does not include a fileBlob
      // field on the FileLinkMetadataReference type, so it is missing from
      // the TypeScript type. This field is injected by the Dropbox SDK.
      var downloadUrl = URL.createObjectURL((<any> data).fileBlob);
      var downloadButton = document.createElement('a');
      downloadButton.setAttribute('href', downloadUrl);
      downloadButton.setAttribute('download', data.name);
      downloadButton.setAttribute('class', 'button');
      downloadButton.innerText = 'Download: ' + data.name;
      downloadButton.click();
    })
    .catch(function(error) {
      console.error(error);
    });
  return false;
}

logout(){
  localStorage.removeItem('token'); // Removes your token but changes remain
  this.router.navigate(['login']);

}

  goBack(): void {
    this.location.back();
  }

}
