import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {HttpClient} from '@angular/common/http';
import GoogleAuth = gapi.auth2.GoogleAuth;
import {VoiptechGoogleApiService} from '../../services/voiptechGoogleApi.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-contacts-list',
  providers: [VoiptechGoogleApiService],
  template: `
    <a *ngIf="loaded" (click)="this.getGroupMembersInfo('contactGroups/family')">getMembersInGroup</a>

    <a *ngIf="loaded" (click)="this.getGroups()">getGroups</a>
    
    <div *ngIf="this.groups != []"> {{ this.groups}}</div>

  `
})
export class ListComponent implements OnInit {

  public groups = [];
  public loaded = false;
  private auth2: GoogleAuth;

  public constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
    private gapiAuthService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private zone: NgZone,
    private vGapi: VoiptechGoogleApiService) {

  }

  ngOnInit(): void {

    setTimeout(() => {
      this.gapiAuthService.getAuth().subscribe((auth) => {
        console.log('mi autentico');
        auth.signIn().then(() => {
          console.log('Carico il client');
          gapi.load('client', async () => {
            this.zone.run(() => this.loaded = true);
          });
        });
      });
    }, 500);
  }

  public getGroupMembersInfo(resourceName: string, maxMembers: number= 100000){
    const member = this.vGapi.getGroupMembersInfo(resourceName, maxMembers);
  }

  public getMember(personId: string){
    const member = this.vGapi.getPersonInfo(personId);
    console.log(member);
  }

  public getGroups(){
    this.groups = this.vGapi.getGroups();
    console.log(this.groups);
  }

  public getGroupMembers(resourceName: string, maxMembers: number= 100000){
    const groupMembers = this.vGapi.getGroupMembers(resourceName, maxMembers);
    console.log(groupMembers);
  }

  public testLoad() {

    gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses,names'
    }).then((res) => {
      console.log('processo la risposta');
      const apiReturn: { connections: any[], totalItems: number, totalPeople: number } =
        res.result as { connections: any[], totalItems: number, totalPeople: number };

      console.log(apiReturn.totalItems);
    });

  }

}

