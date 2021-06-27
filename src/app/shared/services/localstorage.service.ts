import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'Ber1g0';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  //SECURE LOCAL STORAGE
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(environment.StorageConfig.SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, environment.StorageConfig.SECRET_KEY);
      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, environment.StorageConfig.SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });
  clearToken() {
    return this.secureStorage.clear();
  }
  public getStorage(item: string) {
    return this.secureStorage.getItem(item);
  }

  public setStorage(key: string, value: any): void {
    this.secureStorage.setItem(key, value);
  }
  public validateStorage(item: string) {
    return ((this.secureStorage.getItem(item))) ? true : false;
  }
}
