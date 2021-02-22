// tslint:disable: max-line-length
// tslint:disable: no-string-literal
import { createNodeFromObject, createNodeFromValue, appendArray } from '../functions/xml-helpers';
import { flattenSections } from '../functions/item-helpers';
import { CGFileNames, CGProps, CoefficientDependencies, CoefficientFileNames, MomentFileNames, MomentProps, PropTableFileNames, FileName } from '@interfaces';

export class EntityXmlGenerator {
  public entityName: string;
  public currentObjectName: string;

  constructor() {}

  /**************************
   * Entities
   **************************/

  /**
   * Formats and adds all the necessary props to the XMl for each entity.
   * @param entities - All entities to add to the XML.
   * @param xmlDoc - The xml doc.
   * @param rootNode - the root node of the xml doc.
   */
  public appendEntXMLNodes(entities: any, xmlDoc: XMLDocument, rootNode: Element): void {
    entities.forEach(entity => {
      // Create entity node.
      const entNode = xmlDoc.createElement('entity');

      // Create name node and append to entity.
      this.entityName = entity.name;
      const nameNode = createNodeFromValue(entity.name, xmlDoc, 'name');
      entNode.appendChild(nameNode);

      // Append the objects to this entity
      this.appendObjectXMLNodes(entity.objects, xmlDoc, entNode);

      // Append the entity node to the root node.
      rootNode.appendChild(entNode);
    });
  }

  /**************************
   * Objects
   **************************/

  /**
   * Formats and adds all the necessary props to the XMl for each object in an entity.
   * @param objects - All objects to add to the XML for an entity.
   * @param xmlDoc - The xml doc.
   * @param entNode - The top level node for this entity.
   */
  public appendObjectXMLNodes(objects: any, xmlDoc: XMLDocument, entNode: Element): void {
    objects.forEach(complexObj => {
      const obj = flattenSections(complexObj);

      // Create object node.
      const objNode = xmlDoc.createElement('object');

      // Create name node and append to object.
      this.currentObjectName = obj.name;
      const nameNode = createNodeFromValue(obj.name, xmlDoc, 'name');
      objNode.appendChild(nameNode);

      // Append section data to object.
      this.appendMetadata(obj, xmlDoc, objNode);
      this.appendInitNode(obj, xmlDoc, objNode);
      this.appendPropertiesNode(obj, xmlDoc, objNode);
      this.appendAeroNode(obj, xmlDoc, objNode);
      this.appendPropulsionNode(obj, xmlDoc, objNode);

      // Append the object to the entity
      entNode.appendChild(objNode);
    });
  }

  /**************************
   * Object Metadata
   **************************/

  private appendMetadata(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const { dof, parent_object, solver, hold_down, local_environment } = object.meta.general;
    const parentNode = createNodeFromValue(parent_object, xmlDoc, 'parent');
    const solverNode = createNodeFromValue(solver, xmlDoc, 'solver');
    const holdDownNode = createNodeFromValue(hold_down, xmlDoc, 'hold_down');
    const localEnvironmentNode = createNodeFromValue(local_environment, xmlDoc, 'local_environment');
    appendArray([ parentNode, solverNode, holdDownNode, localEnvironmentNode ], objNode);
  }

  /*********************************
   * Object Initial Conditions
   *********************************/

  private appendInitNode(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const initCondFromFormValue = ({ frame, value_1, value_2, value_3 }) => {
      return { frame, value: `${value_1}, ${value_2}, ${value_3}` };
    };
    const initCondNode = createNodeFromObject(object.initial.general, xmlDoc, 'initial_conditions');
    const positionNode = createNodeFromObject(initCondFromFormValue(object.initial.position), xmlDoc, 'position');
    const velocityNode = createNodeFromObject(initCondFromFormValue(object.initial.velocity), xmlDoc, 'velocity');
    const eulerAnglesNode = createNodeFromObject(initCondFromFormValue(object.initial.orientation), xmlDoc, 'euler_angles');
    const bodyRatesNode = createNodeFromObject(initCondFromFormValue(object.initial.bodyrates), xmlDoc, 'body_rates');
    appendArray([ positionNode, velocityNode, eulerAnglesNode, bodyRatesNode ], initCondNode);

    objNode.appendChild(initCondNode);
  }

  /*********************************
   * Object Properties
   *********************************/

  private appendPropertiesNode(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const massPropNode = xmlDoc.createElement('mass_properties');

    // Center of gravity
    const cgFileNames: CGFileNames = this.generateCGFiles(object.mass.cg);
    const cgNode = xmlDoc.createElement('center_of_gravity_location_m');
    Object.keys(cgFileNames).forEach(key => {
      cgNode.appendChild(
        createNodeFromObject(cgFileNames[key], xmlDoc, key)
      );
    });
    massPropNode.appendChild(cgNode);

    // Moments of intertia
    const momentFileNames = this.generateMomentFiles(object.mass.inertia);
    const momentNode = xmlDoc.createElement('moment_of_inertia_kg_m2');
    Object.keys(momentFileNames).forEach(key => {
      momentNode.appendChild(
        createNodeFromObject(momentFileNames[key], xmlDoc, key)
      );
    });
    massPropNode.appendChild(momentNode);

    objNode.appendChild(massPropNode);
  }

  /**
   * Generates XML files for the CG properties and returns the filenames.
   */
  private generateCGFiles({ cg_dependency, rows }: CGProps): CGFileNames {
    const filepath = `./simulation/${this.entityName}/${this.currentObjectName}/mass_properties`;

    // TODO: Generate files.

    const filenames: CGFileNames = {
      x: { filename: `${filepath}/cg_x_m.xml` },
      y: { filename: `${filepath}/cg_y_m.xml` },
      z: { filename: `${filepath}/cg_z_m.xml` }
    };
    return filenames;
  }

  /**
   * Generates XML files for the moment of inertia properties and returns the filenames.
   */
  private generateMomentFiles({ inertia_dependency, rows }: MomentProps): MomentFileNames {
    const filepath = `./simulation/${this.entityName}/${this.currentObjectName}/moment_of_inertia`;

    // TODO: Generate files.

    const filenames: MomentFileNames = {
      ixx: { filename: `${filepath}/moi_ixx_m.xml` },
      iyy: { filename: `${filepath}/moi_iyy_m.xml` },
      izz: { filename: `${filepath}/moi_izz_m.xml` },
      ixy: { filename: `${filepath}/moi_ixy_m.xml` },
      ixz: { filename: `${filepath}/moi_ixz_m.xml` },
      iyz: { filename: `${filepath}/moi_iyz_m.xml` }
    };
    return filenames;
  }

  /*********************************
   * Object Aerodynamics
   *********************************/

  private appendAeroNode(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const aeroNode = xmlDoc.createElement('aerodynamics');
    const { aero_mode, aero_ref_area, aero_ref_length, aero_moment_ref_x, aero_moment_ref_y, aero_moment_ref_z } = object.aerodynamics.general;

    // Mode
    const modeNode = createNodeFromValue(aero_mode, xmlDoc, 'mode');
    aeroNode.appendChild(modeNode);

    // Reference
    const referenceNode = createNodeFromObject({
      area: aero_ref_area,
      length: aero_ref_length,
      moment_reference_location: `${aero_moment_ref_x}, ${aero_moment_ref_y}, ${aero_moment_ref_z}`
    }, xmlDoc, 'reference');
    aeroNode.appendChild(referenceNode);

    // Coefficients
    const coFileNames = this.generateCoefficientsFiles(object.aerodynamics);
    const coefficientsNode = xmlDoc.createElement('coefficients');
    Object.keys(coFileNames).forEach(key => {
      coefficientsNode.appendChild(
        createNodeFromObject(coFileNames[key], xmlDoc, key)
      );
    });
    aeroNode.appendChild(coefficientsNode);

    // Coefficients Dependencies
    const coDepValues = this.generateCoefficientDependencies(object.aerodynamics);
    const coDepNode = xmlDoc.createElement('coefficients_dependencies');
    Object.keys(coDepValues).forEach(key => {
      coDepNode.appendChild(
        createNodeFromObject(coDepValues[key], xmlDoc, key)
      );
    });
    aeroNode.appendChild(coDepNode);

    objNode.appendChild(aeroNode);
  }

  private generateCoefficientsFiles(aero: any): CoefficientFileNames {
    const filepath = `./simulation/${this.entityName}/${this.currentObjectName}/aerodynamics`;

    // TODO: Generate files.

    const filenames: CoefficientFileNames = {
      force_1: { filename: `${filepath}/force_1.xml` },
      force_2: { filename: `${filepath}/force_2.xml` },
      force_3: { filename: `${filepath}/force_3.xml` },
      moment_1: { filename: `${filepath}/moment_1.xml` },
      moment_2: { filename: `${filepath}/moment_2.xml` },
      moment_3: { filename: `${filepath}/moment_3.xml` },
      moment_damping_1: { filename: `${filepath}/moment_damping_1.xml` },
      moment_damping_2: { filename: `${filepath}/moment_damping_2.xml` },
      moment_damping_3: { filename: `${filepath}/moment_damping_3.xml` }
    };
    return filenames;
  }

  private generateCoefficientDependencies(aero: any): CoefficientDependencies {
    const getCoDef = (coDefVal): string => {
      return coDefVal.size === 1 ? coDefVal.table['dep'] : `${coDefVal.table['row_dep']}, ${coDefVal.table['col_dep']}`;
    };

    let vals;

    switch (aero.general.aero_mode) {
      case 1: vals = aero.bodyfixed; break;
      case 2: vals = aero.axisymmetric; break;
      case 3: vals = aero.wind; break;
    }

    const deps: CoefficientDependencies = {
      force_1: { dependency: getCoDef(vals.force_1)},
      force_2: { dependency: getCoDef(vals.force_2)},
      force_3: { dependency: getCoDef(vals.force_3)},
      moment_1: { dependency: getCoDef(vals.moment_1)},
      moment_2: { dependency: getCoDef(vals.moment_2)},
      moment_3: { dependency: getCoDef(vals.moment_3)},
      moment_damping_1: { dependency: getCoDef(vals.moment_damping_1)},
      moment_damping_2: { dependency: getCoDef(vals.moment_damping_2)},
      moment_damping_3: { dependency: getCoDef(vals.moment_damping_3)}
    };
    return deps;
  }

  /*********************************
   * Object Propulsion
   *********************************/

  private appendPropulsionNode(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const propNode = xmlDoc.createElement('propulsion');
    const { sources } = object.propulsion.general;

    // N Hardware
    const nHardwareNode = createNodeFromValue(sources.length, xmlDoc, 'n_hardware');
    propNode.appendChild(nHardwareNode);

    // Propulsion Sources
    sources.forEach(source => {
      const sourceNode = xmlDoc.createElement('hardware');
      this.appendPropSourceNode(source, xmlDoc, sourceNode);
      propNode.appendChild(sourceNode);
    });

    objNode.appendChild(propNode);
  }

  private appendPropSourceNode(source: any, xmlDoc: XMLDocument, sourceNode: Element): void {
    const { name, position_x, position_y, position_z, orientation_roll, orientation_pitch, orientation_yaw, nozzle_exit_area } = source;

    // Name
    const nameNode = createNodeFromValue(name, xmlDoc, 'name');
    sourceNode.appendChild(nameNode);

    // Mode
    const modeNode = createNodeFromValue(0, xmlDoc, 'mode');
    sourceNode.appendChild(modeNode);

    // Position
    const positionNode = createNodeFromValue(
      `${position_x}, ${position_y}, ${position_z}`,
      xmlDoc,
      'position'
    );
    sourceNode.appendChild(positionNode);

    // Orientation Node
    const orientationNode = createNodeFromValue(
      `${orientation_pitch}, ${orientation_roll}, ${orientation_yaw}`,
      xmlDoc,
      'orienation_deg'
    );
    sourceNode.appendChild(orientationNode);

    // Nozzle Exit Area
    const nozzleNode = createNodeFromValue(nozzle_exit_area, xmlDoc, 'nozzle_exit_area_m2');
    sourceNode.appendChild(nozzleNode);

    // Propulsion Tables
    if (source.mode !== 0) {
      const propTableFileNames = this.generatePropTables(source);
      Object.keys(propTableFileNames).forEach(key => {
        const fileNode = createNodeFromObject(propTableFileNames[key], xmlDoc, key);
        sourceNode.appendChild(fileNode);
      });
    }
  }

  private generatePropTables(source: any): PropTableFileNames {
    const filepath = `./simulation/${this.entityName}/${this.currentObjectName}/propulsion/${source.name}`;
    let propTableFileNames: PropTableFileNames;
    // TODO: generate Thrust table file.

    const thrustFileName: FileName = { filename: `${filepath}/vaccum_thrust_N.xml` };
    if (source.mode === 1) {
      // TODO: generate specific impulse table file.
      propTableFileNames = {
        specific_impulse: { filename: `${filepath}/specific_impulse.xml` },
        vaccum_thrust_N: thrustFileName
      };
    } else {
      // TODO: generate mass flow rate table file.
      propTableFileNames = {
        mass_flow_rate_kg_per_sec: { filename: `${filepath}/mass_flow_rate_kg_per_sec.xml` },
        vaccum_thrust_N: thrustFileName
      };
    }
    return propTableFileNames;
  }

  /*********************************
   * Object Scripts
   *********************************/

  private appendScriptNode(object: any, xmlDoc: XMLDocument, objNode: Element): void {}
}
