/**
 * Create a Google Apps Script WEB_APP deployment with public access.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptDir = path.resolve(__dirname, '../analytics/apps-script');
const claspJson = JSON.parse(
  fs.readFileSync(path.join(scriptDir, '.clasp.json'), 'utf8'),
);
const claspRc = JSON.parse(
  fs.readFileSync(path.join(os.homedir(), '.clasprc.json'), 'utf8'),
);
const token =
  claspRc.tokens?.default?.access_token ||
  claspRc.token?.access_token ||
  Object.values(claspRc.tokens || {})[0]?.access_token;

if (!token) {
  console.error('No clasp access token. Run: clasp login');
  process.exit(1);
}

const scriptId = claspJson.scriptId;

async function api(method, urlPath, body) {
  const res = await fetch(`https://script.googleapis.com/v1${urlPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${urlPath} → ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : {};
}

const versions = await api('GET', `/projects/${scriptId}/versions?pageSize=1`);
const versionNumber = versions.versions?.[0]?.versionNumber;
if (!versionNumber) {
  throw new Error('No script versions found.');
}

const deployment = await api('POST', `/projects/${scriptId}/deployments`, {
  versionNumber,
  description: 'Elevated Walt Media public web app',
  manifestFileName: 'appsscript',
  deploymentConfig: {
    scriptId,
    versionNumber,
    manifestFileName: 'appsscript',
    description: 'Elevated Walt Media public web app',
  },
  entryPoints: [
    {
      entryPointType: 'WEB_APP',
      webApp: {
        entryPointConfig: {
          access: 'ANYONE_ANONYMOUS',
          executeAs: 'USER_DEPLOYING',
        },
      },
    },
  ],
});

const deploymentId = deployment.deploymentId;
const url = `https://script.google.com/macros/s/${deploymentId}/exec`;
console.log('deploymentId:', deploymentId);
console.log('url:', url);
