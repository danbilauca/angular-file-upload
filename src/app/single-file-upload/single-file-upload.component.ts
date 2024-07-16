import {Component} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ListObjectsCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {environment} from "../../environment/enfironment";

@Component({
  selector: 'app-single-file-upload',
  standalone: true,
  imports: [NgSwitch, NgIf, NgSwitchCase, NgSwitchDefault],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss'
})
export class SingleFileUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {

    console.log(environment);

    const client = new S3Client({
      region: environment.Region,
      credentials: fromCognitoIdentityPool({
        clientConfig: {region: environment.Region},
        identityPoolId: environment.identityPoolId
      })
    });

    const listCommand = new ListObjectsCommand({Bucket: environment.Bucket});
    client.send(listCommand).then(({Contents}) => {
      console.log(Contents);
    });

    const putCommand = new PutObjectCommand({
      Bucket: environment.Bucket,
      Key: this.file?.name,
      Body: this.file!
    });

    client.send(putCommand).then(function () {
      console.log("File uploaded successfully");
    });
  }
}
