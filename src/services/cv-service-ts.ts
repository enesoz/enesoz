import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PersonalInfo} from '../app/models/PersonalInfoInterfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private http: HttpClient) {
  }

  getCvData(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>('assets/data.json');
  }
}
