import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertByTypeService {

  constructor() { }

  convertType(value: string): String[] | Object | String {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      } else if (typeof parsedValue === 'object') {
        return parsedValue;
      }
    } catch (e) {
      return value;
    }
    return value;
  }
}
