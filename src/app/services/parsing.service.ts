import { Injectable } from '@angular/core';

@Injectable()
export class ParsingService {
  constructor() { }

  public parseClipboardData(data: string): string[][] {
    const rows = data.split('\n');
    return rows.map(row => {
      return row.split(String.fromCharCode(9));
    });
  }
}
