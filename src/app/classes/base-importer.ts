import convert from 'xml-js';
import { CONVERTER_OPTIONS } from '@constants';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// tslint:disable: no-string-literal
export class BaseImporter {
  constructor(public files: FileList) {}

  /**
   * Imports and converts the content of a table xml doc to a js object.
   * @param filepath - All or part of the webkitRelativePath of the file to import.
   */
  public importTableFromFile(filepath: string): Observable<any> {
    filepath = filepath.slice(2); // remove the './'
    const file = Object.values(this.files).find((f: File) => {
      return f['webkitRelativePath'].includes(filepath);
    });
    return from(file.text()).pipe(
      map((text: string) => {
        return convert.xml2js(text, CONVERTER_OPTIONS);
      })
    );
  }


  /**
   * Converts the contents of a 1D table file to an array of { dep: any, value: any }
   * @param table - The result of an import of the contents of a 1 dimension table file.
   */
  public map1DTableToForm(table: any): any[] {
    let { row_breakpoint, data } = table;
    row_breakpoint = row_breakpoint._.split(',').map(_ => _.trim());
    data = data._.split(',').map(_ => _.trim());
    return row_breakpoint.map((rb, i) => ({ dep: rb, value: data[i] }));
  }
}
