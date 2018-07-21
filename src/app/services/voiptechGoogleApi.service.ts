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
  public retGroups: Group[] = [];
  public retMembersGroup: string[] = [];

  public constructor(){
  }

  public getGroupMembers(resourceName: string, maxMembers: number= 100000): string[]{
    gapi.client.request({
      'path': 'https://people.googleapis.com/v1/' + resourceName + '?maxMembers=' + maxMembers
    }).then((res) => {
      this.retMembersGroup = res.result.memberResourceNames;
    });
    return this.retMembersGroup;
  }


  public getGroups(): Group[] {
    gapi.client.request({
      'path': 'https://people.googleapis.com/v1/contactGroups'
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
