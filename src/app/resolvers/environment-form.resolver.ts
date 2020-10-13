import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Environment } from '@interfaces';
import { EnvironmentService } from '@services';

@Injectable()
export class EnvironmentFormResolver implements Resolve<FormGroup> {
  constructor(private envService: EnvironmentService) {}

  public resolve(route: ActivatedRouteSnapshot): FormGroup {
    const id = parseInt(route.params.id, 10);
    const env = this.envService.getEnvById(id);
    const [ section, subsection ] = route.url[0].path.split('_');
    return env
      .sections
      .find(sec => sec.name === section)
      .subsections
      .find(subsec => subsec.name === subsection)
      .form;
  }
}
