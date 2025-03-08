import { CanDeactivate } from '@angular/router';
import { Check } from '../interface/check';

export class ExitGuard implements CanDeactivate<Check> {
  canDeactivate(component: Check): boolean {
    console.log('ExitGuard: check() llamado');
    const puedeSalir = component.check();
    console.log('ExitGuard: Resultado de check():', puedeSalir);
    return puedeSalir;
  }
}