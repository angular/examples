import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseEnv } from 'node:util';
import { fleetDb, FleetUnit, ServiceTicket } from './fleet-db';

if (existsSync('.env')) {
  Object.assign(process.env, parseEnv(readFileSync('.env', 'utf-8')));
}

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

// --- Fleet CRUD Operations ---
export function getAllFleetUnits(): FleetUnit[] {
  return fleetDb.getFleet();
}

export function getFleetUnit(id: string): FleetUnit | undefined {
  return fleetDb.getUnit(id);
}

export function updateFleetUnit(id: string, update: Partial<FleetUnit>): FleetUnit | undefined {
  return fleetDb.updateUnit(id, update);
}

export function getServiceQueue(): ServiceTicket[] {
  return fleetDb.getServiceQueue();
}

export function getServiceTicket(id: string): ServiceTicket | undefined {
  return fleetDb.getTicket(id);
}

export function addServiceTicket(ticket: Omit<ServiceTicket, 'id'>): ServiceTicket {
  return fleetDb.addTicket(ticket);
}

export function updateServiceTicket(id: string, update: Partial<ServiceTicket>): ServiceTicket | undefined {
  return fleetDb.updateTicket(id, update);
}

export function deleteServiceTicket(id: string): boolean {
  return fleetDb.deleteTicket(id);
}

// --- REST API ENDPOINTS ---
app.get('/api/tiles/:style/:z/:x/:y', async (req, res) => {
  try {
    const { style, z, x, y } = req.params;
    const key = process.env['CARTO_API_KEY'] ?? '';
    const basePath = style === 'voyager' ? 'rastertiles/voyager' : style;
    const cartoUrl = `https://basemaps.cartocdn.com/${basePath}/${z}/${x}/${y}?key=${key}`;

    const response = await fetch(cartoUrl);
    if (!response.ok) {
      res.status(response.status).end();
      return;
    }

    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch {
    res.status(500).end();
  }
});

app.get('/api/fleet', (req, res) => {
  res.json(getAllFleetUnits());
});

app.get('/api/fleet/:id', (req, res) => {
  const unit = getFleetUnit(req.params.id);
  if (unit) {
    res.json(unit);
  } else {
    res.status(404).json({ error: 'Unit not found' });
  }
});

app.patch('/api/fleet/:id', (req, res) => {
  const updatedUnit = updateFleetUnit(req.params.id, req.body);
  if (updatedUnit) {
    res.json(updatedUnit);
  } else {
    res.status(404).json({ error: 'Unit not found' });
  }
});

app.get('/api/service-queue', (req, res) => {
  res.json(getServiceQueue());
});

app.post('/api/service-queue', (req, res) => {
  const newTicket = addServiceTicket(req.body);
  res.status(201).json(newTicket);
});

app.get('/api/service-queue/:id', (req, res) => {
  const ticket = getServiceTicket(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

app.patch('/api/service-queue/:id', (req, res) => {
  const updatedTicket = updateServiceTicket(req.params.id, req.body);
  if (updatedTicket) {
    res.json(updatedTicket);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

app.delete('/api/service-queue/:id', (req, res) => {
  const deleted = deleteServiceTicket(req.params.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);