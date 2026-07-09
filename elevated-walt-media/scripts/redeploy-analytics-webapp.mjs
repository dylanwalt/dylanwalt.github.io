/**
 * Create a Google Apps Script WEB_APP deployment (clasp deploy alone often 404s).
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
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${urlPath} → ${res.status}: ${text}`);
  }
  return data;
}

const versions = await api('GET', `/projects/${scriptId}/versions?pageSize=1`);
const versionNumber = versions.versions?.[0]?.versionNumber;
if (!versionNumber) {
  throw new Error('No script versions found. Run clasp push && clasp create-version first.');
}

const deployment = await api('POST', `/projects/${scriptId}/deployments`, {
  versionNumber,
  description: 'Elevated Walt Media web app',
  manifestFileName: 'appsscript',
  entryPoints: [
    {
      entryPointType: 'WEB_APP',
      webApp: {
        access: 'ANYONE',
        executeAs: 'USER_DEPLOYING',
      },
    },
  ],
});

const deploymentId = deployment.deploymentId;
const url = `https://script.google.com/macros/s/${deploymentId}/exec`;
console.log('deploymentId:', deploymentId);
console.log('url:', url);

// Verify GET
const testUrl = `${url}?adminKey=${encodeURIComponent('1pJABqv0G86DroUwRkZSWKQs4nXebzLY')}`;
const verify = await fetch(testUrl, { redirect: 'follow' });
const body = await verify.text();
console.log('verify status:', verify.status);
console.log('verify body:', body.slice(0, 200));

if (!verify.ok || body.includes('<!DOCTYPE')) {
  console.warn('Warning: endpoint may not return JSON yet. Check Apps Script deploy settings.');
}
