import { Injectable } from '@angular/core';

@Injectable()
export class ParsingService {
  constructor() { }

  public parseClipboardData(data): string[][] {
    // console.log(data);
    const rows = data.split('\n');
    return rows.map(row => {
      // const [n, x, y, z] = row.split(String.fromCharCode(9));
      return row.split(String.fromCharCode(9));
      // console.log(`[ n: ${n}, x: ${x}, y: ${y}, z: ${z}]`);
    });
  }
}
