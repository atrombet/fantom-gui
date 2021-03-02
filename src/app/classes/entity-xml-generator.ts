// tslint:disable: max-line-length
// tslint:disable: no-string-literal
import { createNodeFromObject, createNodeFromValue, appendArray, appendFilepaths } from '../functions/xml-helpers';
import { flattenSections } from '../functions/item-helpers';
import { CGFiles, CGProps, CoefficientDependencies, CoefficientFiles, MomentFiles, MomentProps, PropTableFiles, XmlFile, GncTableFiles } from '@interfaces';

export class EntityXmlGenerator {
  public simulationName: string;
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
  public appendEntXMLNodes(entities: any, xmlDoc: XMLDocument, rootNode: Element, simulationName: string): XmlFile[] {
    this.simulationName = simulationName;
    const allEntityFiles: XmlFile[] = [];

    entities.forEach(entity => {
      // Create entity node.
      const entNode = xmlDoc.createElement('entity');

      // Create name node and append to entity.
      this.entityName = entity.name;
      const nameNode = createNodeFromValue(entity.name, xmlDoc, 'name');
      entNode.appendChild(nameNode);

      // Append the objects to this entity
      const allObjectFiles: XmlFile[] = this.appendObjectXMLNodes(entity.objects, xmlDoc, entNode);
      allEntityFiles.push(...allObjectFiles);

      // Append the entity node to the root node.
      rootNode.appendChild(entNode);
    });

    return allEntityFiles;
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
  public appendObjectXMLNodes(objects: any, xmlDoc: XMLDocument, entNode: Element): XmlFile[] {
    const allObjectFiles: XmlFile[] = [];

    objects.forEach(complexObj => {
      const obj = flattenSections(complexObj);
      const allowSixDof = obj.meta.general.allow_six_dof;

      // Create object node.
      const objNode = xmlDoc.createElement('object');

      // Create name node and append to object.
      this.currentObjectName = obj.name;
      const nameNode = createNodeFromValue(obj.name, xmlDoc, 'name');
      objNode.appendChild(nameNode);

      // Append section data to object.
      this.appendMetadata(obj, xmlDoc, objNode);
      this.appendInitNode(obj, xmlDoc, objNode);
      if (allowSixDof) {
        const propertiesFiles = this.appendPropertiesNode(obj, xmlDoc, objNode);
        allObjectFiles.push(...propertiesFiles);
      }
      const aeroFiles = this.appendAeroNode(obj, xmlDoc, objNode);
      allObjectFiles.push(...aeroFiles);
      const propulsionFiles = this.appendPropulsionNode(obj, xmlDoc, objNode);
      allObjectFiles.push(...propulsionFiles);
      const scriptFiles = this.appendScriptNode(obj, xmlDoc, objNode);
      allObjectFiles.push(...scriptFiles);

      // Append the object to the entity
      entNode.appendChild(objNode);
    });

    return allObjectFiles;
  }

  /**************************
   * Object Metadata
   **************************/

  private appendMetadata(object: any, xmlDoc: XMLDocument, objNode: Element): void {
    const { parent_object, solver, hold_down, local_environment } = object.meta.general;
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

  private appendPropertiesNode(object: any, xmlDoc: XMLDocument, objNode: Element): XmlFile[] {
    const massPropNode = xmlDoc.createElement('mass_properties');

    // Center of gravity
    const cgFiles = this.generateCGFiles(object.mass.cg) as unknown as { [key: string]: XmlFile };
    const cgNode = xmlDoc.createElement('center_of_gravity_location_m');
    appendFilepaths(cgFiles, cgNode, xmlDoc);
    massPropNode.appendChild(cgNode);

    // Moments of intertia
    const momentFiles = this.generateMomentFiles(object.mass.inertia) as unknown as { [key: string]: XmlFile };
    const momentNode = xmlDoc.createElement('moment_of_inertia_kg_m2');
    appendFilepaths(momentFiles, momentNode, xmlDoc);
    massPropNode.appendChild(momentNode);

    objNode.appendChild(massPropNode);

    return [
      ...Object.values(cgFiles),
      ...Object.values(momentFiles)
    ];
  }

  /**
   * Generates XML files for the CG properties and returns the filenames.
   */
  private generateCGFiles({ cg_dependency, rows }: CGProps): CGFiles {
    const filepath = `${this.simulationName}/simulation/${this.entityName}/${this.currentObjectName}/mass_properties`;

    // TODO: Generate files.

    const filenames: CGFiles = {
      x: { filepath: `${filepath}/cg_x_m.xml`, content: '' },
      y: { filepath: `${filepath}/cg_y_m.xml`, content: '' },
      z: { filepath: `${filepath}/cg_z_m.xml`, content: '' }
    };
    return filenames;
  }

  /**
   * Generates XML files for the moment of inertia properties and returns the filenames.
   */
  private generateMomentFiles({ inertia_dependency, rows }: MomentProps): MomentFiles {
    const filepath = `${this.simulationName}/simulation/${this.entityName}/${this.currentObjectName}/moment_of_inertia`;

    // TODO: Generate files.

    const filenames: MomentFiles = {
      ixx: { filepath: `${filepath}/moi_ixx_m.xml`, content: '' },
      iyy: { filepath: `${filepath}/moi_iyy_m.xml`, content: '' },
      izz: { filepath: `${filepath}/moi_izz_m.xml`, content: '' },
      ixy: { filepath: `${filepath}/moi_ixy_m.xml`, content: '' },
      ixz: { filepath: `${filepath}/moi_ixz_m.xml`, content: '' },
      iyz: { filepath: `${filepath}/moi_iyz_m.xml`, content: '' }
    };
    return filenames;
  }

  /*********************************
   * Object Aerodynamics
   *********************************/

  private appendAeroNode(object: any, xmlDoc: XMLDocument, objNode: Element): XmlFile[] {
    const aeroNode = xmlDoc.createElement('aerodynamics');
    const allowSixDof = object.meta.general.allow_six_dof;
    const { aero_mode, aero_ref_area, aero_ref_length, aero_moment_ref_x, aero_moment_ref_y, aero_moment_ref_z } = object.aerodynamics.general;

    // Mode
    const modeNode = createNodeFromValue(aero_mode, xmlDoc, 'mode');
    aeroNode.appendChild(modeNode);

    // Reference
    let referenceObj: any = { area: aero_ref_area };
    if (allowSixDof) {
      referenceObj = {
        ...referenceObj,
        length: aero_ref_length,
        moment_reference_location: `${aero_moment_ref_x}, ${aero_moment_ref_y}, ${aero_moment_ref_z}`
      };
    }
    const referenceNode = createNodeFromObject(referenceObj, xmlDoc, 'reference');
    aeroNode.appendChild(referenceNode);

    // Coefficients
    const coFiles = this.generateCoefficientsFiles(object.aerodynamics, allowSixDof) as unknown as { [key: string]: XmlFile };
    const coefficientsNode = xmlDoc.createElement('coefficients');
    appendFilepaths(coFiles, coefficientsNode, xmlDoc);
    aeroNode.appendChild(coefficientsNode);

    // Coefficients Dependencies
    const coDepValues = this.generateCoefficientDependencies(object.aerodynamics, allowSixDof);
    const coDepNode = xmlDoc.createElement('coefficients_dependencies');
    Object.keys(coDepValues).forEach(key => {
      coDepNode.appendChild(
        createNodeFromObject(coDepValues[key], xmlDoc, key)
      );
    });
    aeroNode.appendChild(coDepNode);

    objNode.appendChild(aeroNode);

    return [
      ...Object.values(coFiles)
    ];
  }

  private generateCoefficientsFiles(aero: any, allowSixDof: boolean): CoefficientFiles {
    const filepath = `${this.simulationName}/simulation/${this.entityName}/${this.currentObjectName}/aerodynamics`;

    // TODO: Generate files.

    let filenames: CoefficientFiles = {
      force_1: { filepath: `${filepath}/force_1.xml`, content: '' },
      force_2: { filepath: `${filepath}/force_2.xml`, content: '' },
      force_3: { filepath: `${filepath}/force_3.xml`, content: '' }
    };
    if (allowSixDof) {
      filenames = {
        ...filenames,
        moment_1: { filepath: `${filepath}/moment_1.xml`, content: '' },
        moment_2: { filepath: `${filepath}/moment_2.xml`, content: '' },
        moment_3: { filepath: `${filepath}/moment_3.xml`, content: '' },
        moment_damping_1: { filepath: `${filepath}/moment_damping_1.xml`, content: '' },
        moment_damping_2: { filepath: `${filepath}/moment_damping_2.xml`, content: '' },
        moment_damping_3: { filepath: `${filepath}/moment_damping_3.xml`, content: '' }
      };
    }
    return filenames;
  }

  private generateCoefficientDependencies(aero: any, allowSixDof: boolean): CoefficientDependencies {
    const getCoDef = (coDefVal): string => {
      return coDefVal.size === 1 ? coDefVal.table_1D['dep'] : `${coDefVal.table_2D['row_dep']}, ${coDefVal.table_2D['col_dep']}`;
    };

    let vals;

    switch (aero.general.aero_mode) {
      case 1: vals = aero.bodyfixed; break;
      case 2: vals = aero.axisymmetric; break;
      case 3: vals = aero.wind; break;
    }

    let deps: CoefficientDependencies = {
      force_1: { dependency: getCoDef(vals.force_1)},
      force_2: { dependency: getCoDef(vals.force_2)},
      force_3: { dependency: getCoDef(vals.force_3)}
    };
    if (allowSixDof) {
      deps = {
        ...deps,
        moment_1: { dependency: getCoDef(vals.moment_1)},
        moment_2: { dependency: getCoDef(vals.moment_2)},
        moment_3: { dependency: getCoDef(vals.moment_3)},
        moment_damping_1: { dependency: getCoDef(vals.moment_damping_1)},
        moment_damping_2: { dependency: getCoDef(vals.moment_damping_2)},
        moment_damping_3: { dependency: getCoDef(vals.moment_damping_3)}
      };
    }
    return deps;
  }

  /*********************************
   * Object Propulsion
   *********************************/

  private appendPropulsionNode(object: any, xmlDoc: XMLDocument, objNode: Element): XmlFile[] {
    const propNode = xmlDoc.createElement('propulsion');
    const { sources } = object.propulsion.general;
    const allPropulsionFiles: XmlFile[] = [];

    // N Hardware
    const nHardwareNode = createNodeFromValue(sources.length, xmlDoc, 'n_hardware');
    propNode.appendChild(nHardwareNode);

    // Propulsion Sources
    sources.forEach(source => {
      const sourceNode = xmlDoc.createElement('hardware');
      const propSourceFiles = this.appendPropSourceNode(source, xmlDoc, sourceNode);
      allPropulsionFiles.push(...propSourceFiles);
      propNode.appendChild(sourceNode);
    });

    objNode.appendChild(propNode);

    return allPropulsionFiles;
  }

  private appendPropSourceNode(source: any, xmlDoc: XMLDocument, sourceNode: Element): XmlFile[] {
    const { name, position_x, position_y, position_z, orientation_roll, orientation_pitch, orientation_yaw, nozzle_exit_area } = source;
    const files: XmlFile[] = [];

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
      const propTableFiles = this.generatePropTables(source) as unknown as { [key: string]: XmlFile };
      appendFilepaths(propTableFiles, sourceNode, xmlDoc);
      files.push(...Object.values(propTableFiles));
    }
    return files;
  }

  private generatePropTables(source: any): PropTableFiles {
    const filepath = `${this.simulationName}/simulation/${this.entityName}/${this.currentObjectName}/propulsion/${source.name}`;
    let propTableFiles: PropTableFiles;
    // TODO: generate Thrust table file.

    const thrustFile: XmlFile = { filepath: `${filepath}/vaccum_thrust_N.xml`, content: '' };
    if (source.mode === 1) {
      // TODO: generate specific impulse table file.
      propTableFiles = {
        specific_impulse: { filepath: `${filepath}/specific_impulse.xml`, content: '' },
        vaccum_thrust_N: thrustFile
      };
    } else {
      // TODO: generate mass flow rate table file.
      propTableFiles = {
        mass_flow_rate_kg_per_sec: { filepath: `${filepath}/mass_flow_rate_kg_per_sec.xml`, content: '' },
        vaccum_thrust_N: thrustFile
      };
    }
    return propTableFiles;
  }

  /*********************************
   * Object Scripts
   *********************************/

  private appendScriptNode(object: any, xmlDoc: XMLDocument, objNode: Element): XmlFile[] {
    const scriptNode = xmlDoc.createElement('script');
    const segments = object.script.general.segments;
    const files: XmlFile[] = [];

    const nSegmentsNode = createNodeFromValue(segments.length, xmlDoc, 'n_segment');
    scriptNode.appendChild(nSegmentsNode);

    segments.forEach(segment => {
      const segmentNode = xmlDoc.createElement('segment');
      const { gnc, parameter, condition, value } = segment;

      // Main segment params
      this.appendMainSegmentParams(segment, xmlDoc, segmentNode);

      // GNC params
      const gncNode = xmlDoc.createElement('gnc');
      gncNode.appendChild(createNodeFromValue(gnc.mode, xmlDoc, 'mode'));
      gncNode.appendChild(createNodeFromValue(gnc.frame, xmlDoc, 'frame'));
      const gncFiles = this.generateGncTables(segment) as unknown as { [key: string]: XmlFile };
      appendFilepaths(gncFiles, gncNode, xmlDoc);
      files.push(...Object.values(gncFiles));
      segmentNode.appendChild(gncNode);

      // End Criteria params
      const endCriteria = { parameter, condition, value };
      const endCriteriaNode = createNodeFromObject(endCriteria, xmlDoc, 'end_criteria');
      segmentNode.appendChild(endCriteriaNode);

      scriptNode.appendChild(segmentNode);
    });

    objNode.appendChild(scriptNode);

    return files;
  }

  private appendMainSegmentParams(segment: any, xmlDoc: XMLDocument, segmentNode: Element): void {
    const { name, dof, print_dt, integration_dt, reset_user_time, reset_propulsion_time, active_propulsion_sources } = segment;
    segmentNode.appendChild(createNodeFromValue(name, xmlDoc, 'name'));
    segmentNode.appendChild(createNodeFromValue(dof, xmlDoc, 'dof'));
    segmentNode.appendChild(createNodeFromValue(print_dt, xmlDoc, 'print_dt'));
    segmentNode.appendChild(createNodeFromValue(integration_dt, xmlDoc, 'integration_dt'));
    segmentNode.appendChild(createNodeFromValue(reset_user_time ? 1 : 0, xmlDoc, 'reset_user_time'));
    segmentNode.appendChild(createNodeFromValue(reset_propulsion_time ? 1 : 0, xmlDoc, 'reset_propulsion_time'));

    const activeSourceNode = xmlDoc.createElement('enable');
    active_propulsion_sources.forEach(source => {
      activeSourceNode.appendChild(createNodeFromValue(source, xmlDoc, 'propulsion'));
    });
    segmentNode.appendChild(activeSourceNode);
  }

  private generateGncTables(segment: any): GncTableFiles {
    const filepath = `${this.simulationName}/simulation/${this.entityName}/${this.currentObjectName}/script/${segment.name}`;

    // TODO: actually generate the table xmls

    return {
      value_1: { filepath: `${filepath}/value_1.xml`, content: '' },
      value_2: { filepath: `${filepath}/value_2.xml`, content: '' },
      value_3: { filepath: `${filepath}/value_3.xml`, content: '' }
    };
  }

}
