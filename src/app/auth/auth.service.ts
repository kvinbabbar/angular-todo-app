import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private session: SessionService) { }

  isSignedIn(): boolean {
    return !!this.session.accessToken;
  }

  doSignOut(): void {
    this.session.destroy();
  }

  doSignIn(accessToken: string, name: string) {
    if((!accessToken) || (!name)) {
      return;
    }

    this.session.accessToken = accessToken;
    this.session.name = name;
  }
}
