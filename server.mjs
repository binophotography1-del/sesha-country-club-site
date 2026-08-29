import { createServer } from 'node:http';
import { appendFile, mkdir, readFile, stat } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT || '8798', 10);
const inquiryPath = process.env.INQUIRY_DATA_PATH || path.join(root, 'data', 'inquiries.jsonl');
const maxBodyBytes = 50 * 1024;

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon']
]);

const limits = {
  name: 120,
  email: 254,
  phone: 40,
  organization: 160,
  eventDate: 30,
  location: 240,
  eventType: 120,
  service: 80,
  serviceLabel: 160,
  guestCount: 10,
  details: 4000,
  sourcePage: 300,
  website: 300
};

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(value));
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeInquiry(input) {
  const record = {};
  for (const [key, maxLength] of Object.entries(limits)) record[key] = clean(input[key], maxLength);
  return record;
}

function validationError(record) {
  if (!record.name || !record.email || !record.details) return 'Name, email, and event details are required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) return 'Enter a valid email address.';
  if (record.guestCount && (!/^\d+$/.test(record.guestCount) || Number(record.guestCount) < 1)) return 'Guest count must be a positive number.';
  return '';
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) throw new Error('PAYLOAD_TOO_LARGE');
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('INVALID_JSON');
  }
}

async function captureInquiry(request, response) {
  let input;
  try {
    input = await readJsonBody(request);
  } catch (error) {
    const statusCode = error.message === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
    return sendJson(response, statusCode, { ok: false, error: 'The submitted form data is invalid.' });
  }

  const inquiry = normalizeInquiry(input);
  const error = validationError(inquiry);
  if (error) return sendJson(response, 422, { ok: false, error });

  const createdAt = new Date().toISOString();
  const id = `inq_${createdAt.slice(0, 10).replaceAll('-', '')}_${randomUUID().slice(0, 8)}`;

  if (!inquiry.website) {
    const { website, ...fields } = inquiry;
    const storedRecord = { id, createdAt, ...fields };
    await mkdir(path.dirname(inquiryPath), { recursive: true });
    await appendFile(inquiryPath, `${JSON.stringify(storedRecord)}\n`, { encoding: 'utf8', mode: 0o600 });
  }

  return sendJson(response, 201, { ok: true, id, createdAt });
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const relativePath = decoded === '/' ? 'variation-c.html' : decoded.replace(/^\/+/, '');
  const resolved = path.resolve(root, relativePath);
  const blocked = relativePath.startsWith('.') || relativePath === 'server.mjs' || relativePath.startsWith('data/') || relativePath.startsWith('test-artifacts/');
  if (blocked || !resolved.startsWith(`${root}${path.sep}`)) return null;
  return resolved;
}

async function serveStatic(request, response, pathname) {
  let filePath;
  try {
    filePath = safeStaticPath(pathname);
  } catch {
    response.writeHead(400);
    return response.end('Bad request');
  }
  if (!filePath) {
    response.writeHead(404);
    return response.end('Not found');
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error('NOT_FILE');
    const body = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}

const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'SAMEORIGIN');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  try {
    if (request.method === 'GET' && url.pathname === '/api/health') return sendJson(response, 200, { ok: true });
    if (request.method === 'POST' && url.pathname === '/api/inquiries') return await captureInquiry(request, response);
    if (url.pathname.startsWith('/api/')) return sendJson(response, 404, { ok: false, error: 'Not found.' });
    if (request.method !== 'GET' && request.method !== 'HEAD') return sendJson(response, 405, { ok: false, error: 'Method not allowed.' });
    return await serveStatic(request, response, url.pathname);
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, { ok: false, error: 'The request could not be saved. Please try again.' });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Sesha event site: http://127.0.0.1:${port}`);
  console.log(`Inquiry records: ${inquiryPath}`);
});
