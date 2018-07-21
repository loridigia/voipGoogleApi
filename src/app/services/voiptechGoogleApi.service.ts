import {Injectable, Injector} from '@angular/core';
import GoogleAuth = gapi.auth2.GoogleAuth;
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';

export interface Group {
  resourceName: string;
  type: string;
  name: string;
  formattedName: string;
  memberCount?: number;
}

@Injectable()
export class VoiptechGoogleApiService {
  private baseUrl = 'https://people.googleapis.com/v1/';
  private personField = [
    'names',
    'nicknames',
    'ageRanges',
    'birthdays',
    'emailAddresses',
    'phoneNumbers',
    'organizations',
  ];
  private retGroups: Group[] = [];
  private retArray: any[] = []

  public constructor(){
  }

  public getMemberInfo(memberId: string){
    gapi.client.request({
      'path': this.baseUrl + memberId + '?personFields=' + this.personField.toString()
    }).then((res) => {
      this.retArray = res.result;
    });
    return this.retArray;
  }

  public getGroupMembers(resourceName: string, maxMembers: number= 100000): string[]{
    gapi.client.request({
      'path': this.baseUrl + resourceName + '?maxMembers=' + maxMembers
    }).then((res) => {
      this.retArray = res.result.memberResourceNames;
    });
    return this.retArray;
  }


  public getGroups(): Group[] {
    gapi.client.request({
      'path': this.baseUrl + 'contactGroups'
    }).then((res) => {
      const groups: any[] = res.result.contactGroups ;
      this.retGroups = groups.map(group => ({
        resourceName: group.resourceName,
        type: group.groupType,
        name: group.name,
        formattedName: group.formattedName,
        memberCount: group.memberCount || 0
      }));
    });
    return this.retGroups;
  }



}
