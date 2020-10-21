import { AbstractControl, ValidationErrors } from '@angular/forms';

export function bodyShapeValidator(group: AbstractControl): ValidationErrors {
  const bodyShapeControlNames = [ 'equatorial_radius', 'polar_radius', 'eccentricity' ];
  let count = 0;
  bodyShapeControlNames.forEach(name => {
    if (!!group.get(name).value) {
      count = count + 1;
    }
  });
  return count >= 2 ? null : { bodyShapeControls: true };
}
