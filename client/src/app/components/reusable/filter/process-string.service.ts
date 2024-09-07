import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessStringService {

  constructor() { }

  getLastToken(input: string): string {
    const tokens = input.split('.');
    return this.convertString(tokens[tokens.length - 1]);
  }

  convertString(input: string): string {
    const words = input.replace(/([A-Z])/g, ' $1').trim().split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  }
}
