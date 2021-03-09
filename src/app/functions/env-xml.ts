import { createNodeFromObject } from './xml-export-helpers';
import { flattenSections } from './item-helpers';

export function appendEnvXMLNodes(environments: any, xmlDoc: XMLDocument, rootNode: Element): void {
  environments.forEach(complexEnv => {
    const env = flattenSections(complexEnv);

    // Create environment node.
    const envNode = xmlDoc.createElement('environment');

    // Create name node and append to environment.
    const nameNode = xmlDoc.createElement('name');
    const nameText = xmlDoc.createTextNode(env.name);
    nameNode.appendChild(nameText);
    envNode.appendChild(nameNode);

    appendAtmoNode(env, xmlDoc, envNode);
    appendGravityNode(env, xmlDoc, envNode);
    appendBodyNode(env, xmlDoc, envNode);
    appendWindNode(env, xmlDoc, envNode);
    appendEpochNode(env, xmlDoc, envNode);

    // Append the environment node to the root node.
    rootNode.appendChild(envNode);
  });
}

/**
 * Create atmosphere node and append to environment.
 */
function appendAtmoNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
  const atmo = {
    enable: env.atmosphere.general.atmosphere_on ? 1 : 0,
    mode: env.atmosphere.general.atmospheric_model
  };
  const atmoNode = createNodeFromObject(atmo, xmlDoc, 'atmosphere');
  envNode.appendChild(atmoNode);
}

/**
 * Create Gravity node and append to environment.
 */
function appendGravityNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
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
function appendBodyNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
  const body = {
    rotation_enable: env.body.general.body_rotation_on ? 1 : 0,
    mode: env.body.general.body_model
  };
  const bodyNode = createNodeFromObject(body, xmlDoc, 'body');
  envNode.appendChild(bodyNode);
}

/**
 * Create wind node and append to environment.
 */
function appendWindNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
  const wind = {
    enable: env.wind.general.wind_on ? 1 : 0,
    mode: env.wind.general.wind_profile
  };
  const windNode = createNodeFromObject(wind, xmlDoc, 'wind');
  envNode.appendChild(windNode);
}

/**
 * Create epoch node and append to environment.
 */
function appendEpochNode(env: any, xmlDoc: XMLDocument, envNode: Element): void {
  const { epoch_on, epoch_date, epoch_time } = env.epoch.general;
  const date = epoch_date ? new Date(epoch_date) : null;
  const epoch = {
    enable: epoch_on ? 1 : 0,
    gregorian_date: {
      value: date ? `${date.getMonth()}, ${date.getDay()}, ${date.getFullYear()}` : ''
    },
    utc: {
      value: epoch_time?.split(':').join(', ') || ''
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
