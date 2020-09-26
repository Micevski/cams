import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";
import {Document} from "../../interfaces/document-interface";
import {DocumentService} from "../../service/document.service";

@Component({
  templateUrl: './gallery-dialog.html',
  styleUrls: ['./gallery-dialog.scss']
})
export class GalleryDialog implements OnInit {

  selectedIndex = 0;
  documents: Document[];
  NO_PREVIEW_PATH = '../../../assets/no-image.jpg';

  constructor(private _dialogRef: MatDialogRef<GalleryDialog>,
              private _sanitizer: DomSanitizer,
              private _service: DocumentService,
              @Inject(MAT_DIALOG_DATA) public data: { documents: Document[] }) {
  }

  ngOnInit() {
    this.documents = this.data.documents;
  }

  onCancel() {
    this._dialogRef.close();
  }

  getImagePath(doc: Document) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(doc.document);
  }

  getImagePathForSelectedIndex() {
    return this.getImagePath(this.data.documents[this.selectedIndex]);
  }

  deleteDocument(accidentDocument: Document) {
    this._service.deleteAccidentDocument(accidentDocument.documentId, accidentDocument.accidentId)
      .subscribe(docs => this.documents = docs);
  }

  changeSource($event) {
    $event.target.src = this.NO_PREVIEW_PATH;
  }

}
