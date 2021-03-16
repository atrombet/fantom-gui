import { appendFilepaths, create1DTableFile, createNodeFromObject, flattenSections, boolToBin, createNodeFromValue } from '@functions';
import { XmlFile } from '@interfaces';
import format from 'xml-formatter';
import { XML_FORMATTER_OPTIONS } from '@constants';

export class EnvironmentXmlGenerator {
  public simulationName: string;

  constructor() {}

  public appendEnvXMLNodes(environments: any, xmlDoc: XMLDocument, rootNode: Element, simulationName: string): XmlFile[] {
    this.simulationName = simulationName;
    const allEnvFiles: XmlFile[] = [];

    environments.forEach(complexEnv => {
      const env = flattenSections(complexEnv);

      // Create environment node.
      const envNode = xmlDoc.createElement('environment');

      // Create name node and append to environment.
      const nameNode = xmlDoc.createElement('name');
      const nameText = xmlDoc.createTextNode(env.name);
      nameNode.appendChild(nameText);
      envNode.appendChild(nameNode);

      const customAtmoFiles: XmlFile[] = this.appendAtmoNode(env, xmlDoc, envNode);
      allEnvFiles.push(...customAtmoFiles);

      this.appendGravityNode(env, xmlDoc, envNode);
      const customBodyFiles = this.appendBodyNode(env, xmlDoc, envNode);
      allEnvFiles.push(...customBodyFiles);

      const customWindFiles: XmlFile[] = this.appendWindNode(env, xmlDoc, envNode);
      allEnvFiles.push(...customWindFiles);

      this.appendEpochNode(env, xmlDoc, envNode);

      // Append the environment node to the root node.
      rootNode.appendChild(envNode);
    });

    return allEnvFiles;
  }

  /**
   * Create atmosphere node and append to environment.
   */
  public appendAtmoNode(env: any, xmlDoc: XMLDocument, envNode: Element): XmlFile[] {
    const customAtmoFiles: XmlFile[] = [];
    const { atmosphere_on, atmospheric_model, rows } = env.atmosphere.general;
    const atmo = {
      enable: boolToBin(atmosphere_on),
      mode: atmospheric_model
    };
    const atmoNode = createNodeFromObject(atmo, xmlDoc, 'atmosphere');

    if (atmospheric_model === 0 && !!rows.length) {
      const atmoFileDict = this.generateAtmoFiles(rows);
      customAtmoFiles.push(...Object.values(atmoFileDict));
      appendFilepaths(atmoFileDict, atmoNode, xmlDoc);
    }

    envNode.appendChild(atmoNode);

    return customAtmoFiles;
  }

  /**
   * Creates custom atmosphere files.
   * @param rows - Row data to create custom atmosphere files from.
   */
  public generateAtmoFiles(rows: any): { [key: string]: XmlFile } {
    const filepath = `./environment/custom/atmosphere`;
    const deps = rows.map(row => row.dep);
    const density = rows.map(row => row.density_kg_per_m3);
    const pressure = rows.map(row => row.pressure_N_per_m2);
    const sos = rows.map(row => row.speed_of_sound_m_per_sec);
    const temp = rows.map(row => row.temperature_degrees_kelvin);

    const filenames: { [key: string]: XmlFile } = {
      density_kg_per_m3: { filepath: `${filepath}/density_kg_per_m3.xml`, content: create1DTableFile(deps, density) },
      pressure_N_per_m2: { filepath: `${filepath}/pressure_N_per_m2.xml`, content: create1DTableFile(deps, pressure) },
      speed_of_sound_m_per_sec: { filepath: `${filepath}/speed_of_sound_m_per_sec.xml`, content: create1DTableFile(deps, sos) },
      temperature_degrees_kelvin: { filepath: `${filepath}/temperature_degrees_kelvin.xml`, content: create1DTableFile(deps, temp) }
    };
    return filenames;
  }

  /**
   * Create Gravity node and append to environment.
   */
  public appendGravityNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
    const grav = {
      enable: env.gravity.general.gravity_on ? 1 : 0,
      mode: env.gravity.general.gravity_model
    };
    const gravNode = createNodeFromObject(grav, xmlDoc, 'gravity');
    envNode.appendChild(gravNode);
  }

  /**
   * Create Body node and append to environment.
   */
  public appendBodyNode(env: any, xmlDoc: XMLDocument, envNode: Element): XmlFile[] {
    const { body_rotation_on, body_model } = env.body.general;
    let bodyFile = null;
    const body = {
      rotation_enable: boolToBin(body_rotation_on),
      mode: body_model
    };
    const bodyNode = createNodeFromObject(body, xmlDoc, 'body');
    if (body_model === 0) {
      bodyFile = this.generateBodyFile(env);
      appendFilepaths({ custom: bodyFile }, bodyNode, xmlDoc);
    }
    envNode.appendChild(bodyNode);
    return bodyFile ? [ bodyFile ] : [];
  }

  /**
   * Generates a Custom Body file.
   * @param env - The environment.
   */
  public generateBodyFile(env: any): XmlFile {
    const filepath = `./environment/custom/body`;
    const { sea_level_gravitational_acceleration_m_per_s2, gravitational_parameter_m3_per_sec2, eccentricity, rotation_rate_rad_per_sec, equatorial_radius_m } = env.body.general;

    // Create a new xml doc.
    const doc = document.implementation.createDocument(null, 'custom_body', null);
    // Grab the root node.
    const root = doc.querySelector('custom_body');
    // Add all custom body param nodes to the document.
    root.appendChild(createNodeFromValue(sea_level_gravitational_acceleration_m_per_s2, doc, 'sea_level_gravitational_acceleration_m_per_s2'));
    root.appendChild(createNodeFromValue(gravitational_parameter_m3_per_sec2, doc, 'gravitational_parameter_m3_per_sec2'));
    root.appendChild(createNodeFromValue(eccentricity, doc, 'eccentricity'));
    root.appendChild(createNodeFromValue(equatorial_radius_m, doc, 'equatorial_radius_m'));
    root.appendChild(createNodeFromValue(rotation_rate_rad_per_sec, doc, 'rotation_rate_rad_per_sec'));

    // Create serializer.
    const serializer = new XMLSerializer();
    // Serialize the xml doc to string.
    const xmlString = format(serializer.serializeToString(doc), XML_FORMATTER_OPTIONS);

    return { filepath: `${filepath}/custom_body.xml`, content: xmlString };
  }

  /**
   * Create wind node and append to environment.
   */
  public appendWindNode(env: any, xmlDoc: XMLDocument, envNode: Element): XmlFile[] {
    const customWindFiles: XmlFile[] = [];
    const { wind_on, wind_profile, rows } = env.wind.general;
    const wind = {
      enable: boolToBin(wind_on),
      mode: wind_profile
    };
    const windNode = createNodeFromObject(wind, xmlDoc, 'wind');

    if (wind_profile === 0 && !!rows.length) {
      const windFileDict = this.generateWindFiles(rows);
      customWindFiles.push(...Object.values(windFileDict));
      appendFilepaths(windFileDict, windNode, xmlDoc);
    }

    envNode.appendChild(windNode);

    return customWindFiles;
  }

  /**
   * Creates custom wind files.
   * @param rows - Row data to create custom wind files from.
   */
  public generateWindFiles(rows: any): { [key: string]: XmlFile } {
    const filepath = `./environment/custom/wind`;
    const deps = rows.map(row => row.dep);
    const north = rows.map(row => row.north);
    const east = rows.map(row => row.east);
    const up = rows.map(row => row.up);

    const filenames: { [key: string]: XmlFile } = {
      north: { filepath: `${filepath}/north.xml`, content: create1DTableFile(deps, north) },
      east: { filepath: `${filepath}/east.xml`, content: create1DTableFile(deps, east) },
      up: { filepath: `${filepath}/up.xml`, content: create1DTableFile(deps, up) },
    };
    return filenames;
  }

  /**
   * Create epoch node and append to environment.
   */
  public appendEpochNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
    const { epoch_on, epoch_date, epoch_time } = env.epoch.general;
    const date = epoch_date ? new Date(epoch_date) : new Date('1/1/2000');
    const epoch = {
      enable: epoch_on ? 1 : 0,
      gregorian_date: {
        value: date ? `${date.getMonth() + 1}, ${date.getDate()}, ${date.getFullYear()}` : ''
      },
      utc: {
        value: epoch_time?.split(':').join(', ') || '17, 17, 17.3518'
      }
    };

    const epochNode = xmlDoc.createElement('epoch');

    const enableNode = xmlDoc.createElement('enable');
    const enableText = xmlDoc.createTextNode(epoch.enable.toString());
    enableNode.appendChild(enableText);

    epochNode.appendChild(enableNode);
    epochNode.appendChild(createNodeFromObject(epoch.gregorian_date, xmlDoc, 'gregorian_date'));
    epochNode.appendChild(createNodeFromObject(epoch.utc, xmlDoc, 'utc'));

    envNode.appendChild(epochNode);
  }
}











