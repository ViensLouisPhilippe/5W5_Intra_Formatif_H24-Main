import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';

export const guardGuard: CanActivateFn = (route, state) => {

  if(inject(UserService).isLoggedIn()){
    return true;
  }
  return createUrlTreeFromSnapshot(route,['/login'])
};
