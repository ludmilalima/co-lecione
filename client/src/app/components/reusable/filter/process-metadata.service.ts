import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessMetadataService {

  buildFiltersList(filters: Array<any>): Array<FilterNode> {
    let filtersList: Array<FilterNode> = [];

    filters.forEach(item => {
      let filterKey = item.nodeInfo.key.replace('root.', '');
      let filterValue;
      switch (item.nodeInfo.nodeType) {
        case 'single-select':
          filterValue = item.value;
          filtersList.push({ key: filterKey, value: filterValue });
          break;
        case 'multi-select':
          item.value.forEach(element => {
            filterValue = element;
            filtersList.push({ key: filterKey, value: filterValue });
          });
          break;
        case 'langString-type':
          item.langString.forEach(element => {
            filterValue = JSON.stringify(element);
            filtersList.push({ key: filterKey, value: filterValue });
          });
          break;
        case 'characterString-type':
          item.content.forEach(element => {
            filterValue = element;
            filtersList.push({ key: filterKey, value: filterValue });
          });
          break;
        case 'custom-type':
          filterValue = item.value;
          filtersList.push({ key: filterKey, value: filterValue });
          break;
        case 'boolean-type':
          filterValue = item.content;
          break;
      }
    });

    return filtersList;
  }
}

interface FilterNode {
  key: string;
  value: string;
}
