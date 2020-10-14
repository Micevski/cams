import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../service/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Document } from '../../interfaces/document-interface';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDialog } from '../../dialogs/gallery-dialog/gallery-dialog';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  myFiles: FileList;
  filesForm: FormGroup;
  accidentId: number;
  documents: Document[];

  constructor(private _builder: FormBuilder,
              private _service: DocumentService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _sanitizer: DomSanitizer,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.accidentId = +this._route.snapshot.paramMap.get('id');
    this._service.findAllDocumentsForAccident(this.accidentId).subscribe(docs => this.documents = docs);
    this.filesForm = this._builder.group({
      file: ['', Validators.required]
    });
  }

  get f() {
    return this.filesForm.controls;
  }

  onFileChange(event) {
    this.myFiles = event.target.files;
    this.onSubmit();
  }

  onSubmit() {
    for (let i = 0; i < this.myFiles.length; i++) {
      this._uploadFile(i, this.myFiles.item(i));
    }
    this._service.findAllDocumentsForAccident(this.accidentId).subscribe(docs => this.documents = docs);
  }

  private _uploadFile(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this._service.upload(formData, this.accidentId).subscribe(
      event => {
        console.log(file.name, 'Uploaded');
        this._service.findAllDocumentsForAccident(this.accidentId).subscribe(docs => this.documents = docs);
      },
      err => {
        console.log('Error occurred');
      });
  }

  getImagePath(doc: Document) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(doc.document);
  }

  onGalleryOpen() {
    this._dialog.open(GalleryDialog, { data: { documents: this.documents }, width: '50%', height: '70%' });
  }

  getPreviewGallery() {
    if (this.documents.length > 5) {
      return this.documents.slice(0, 5);
    } else { return this.documents; }
  }

  onFinish() {
    this._router.navigateByUrl('/home');
  }
}
