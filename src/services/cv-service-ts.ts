import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PersonalInfo} from '../app/models/PersonalInfoInterfaces';
import {HttpClient} from '@angular/common/http';

import * as jsonData from '../assets/cv-data.json';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private http: HttpClient) {
  }

  getCvData(): Observable<PersonalInfo> {
    return new Observable<PersonalInfo>(observer => {
      observer.next(jsonData as any);
      observer.complete();
    });
  }
}
