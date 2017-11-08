import { AngularFireDatabase } from 'angularfire2/database';
import {Injectable} from '@angular/core';

@Injectable()

export class DatabaseService {

  constructor(public firebaseDatabase: AngularFireDatabase) {}

  getDataFrom(path: string) {
    return this.firebaseDatabase.object(path).valueChanges();
  }

  pushDataAt(path: string, data: any) {
    this.firebaseDatabase.object(path).update(data);
  }

  updateDataAt(path:string, key:string, data: any) {
    this.firebaseDatabase.object(path).set({[key]: data});
  }
}
