import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocumentService} from "../../service/document.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  myFiles: FileList;
  filesForm: FormGroup;
  accidentId: number;

  constructor(private _builder: FormBuilder,
              private _service: DocumentService,
              private _route: ActivatedRoute) {
    this.filesForm = this._builder.group({
      file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accidentId = +this._route.snapshot.paramMap.get('id');

  }

  get f() {
    return this.filesForm.controls;
  }

  onFileChange(event) {
    this.myFiles = event.target.files;
  }

  onSubmit() {
    for (let i = 0; i < this.myFiles.length; i++) {
      this._uploadFile(i, this.myFiles.item(i));
    }
  }

  private _uploadFile(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this._service.upload(formData, this.accidentId).subscribe(
      event => console.log(file.name, 'Uploaded'),
      err => {
        console.log('Error occurred');
      });
  }

  getFiles() {
    const filesInfo = [];
    for (let i = 0; i < this.myFiles?.length; i++) {
      filesInfo.push({name: this.myFiles.item(i).name, index: i});
    }
    return filesInfo;

  }
}
