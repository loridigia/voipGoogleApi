import {Injectable} from '@angular/core';



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
  private retGroups: Group[] = [];
  private retArray: any[] = [];
  private personFields = [
    'names',
    'nicknames',
    'ageRanges',
    'birthdays',
    'emailAddresses',
    'phoneNumbers',
    'organizations',
  ];

  public constructor() {}


  // ritorna array di oggetti persona con i campi ( se settati ) personFields

  public getGroupMembersInfo(resourceName: string , maxMembers: number= 50): any[]{
    const membersId = this.getGroupMembers(resourceName, maxMembers);
    let idCustom = '';
    for (const client of membersId)
      idCustom += 'resourceNames=' + client + '&';

    gapi.client.request({
      'path': this.baseUrl + 'people:batchGet?' + idCustom + 'personFields=' + this.personFields.toString()
    }).then((res) => {
      console.log(res.result);
      this.retArray = res.result;
    });
    return this.retArray;
  }


  // ritorna un oggetto con i campi ( se settati ) personFields

  public getPersonInfo(personId: string): any[]{
    gapi.client.request({
      'path': this.baseUrl + personId + '?personFields=' + this.personFields.toString()
    }).then((res) => {
      this.retArray = res.result;
    });
    return this.retArray;
  }


  // ritorna array di memberId, uno per ogni membro del gruppo in input

  public getGroupMembers(resourceName: string, maxMembers: number= 100000): any[]{
    gapi.client.request({
      'path': this.baseUrl + resourceName + '?maxMembers=' + maxMembers
    }).then((res) => {
      this.retArray = res.result.memberResourceNames;
    });
    return this.retArray;
  }


  // ritorna un array di oggetti di tipo Group

  public getGroups(): any {
      gapi.client.request({
        'path': this.baseUrl + 'contactGroups'
      }).then((res) => {
        this.retGroups = res.result.contactGroups.map(group => ({
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
