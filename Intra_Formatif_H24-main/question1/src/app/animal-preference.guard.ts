import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const animalPreferenceGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isPreferCat()){
    return true;
  }
  else
  return createUrlTreeFromSnapshot(route,['/dog']);
};
