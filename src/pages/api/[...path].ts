import { Hono } from 'hono';
import type { APIRoute } from 'astro';

import profileControllers from '@/presentation/controllers/profile.controller';

const app = new Hono().basePath('/api/');

app.route('/profile', profileControllers);

export const ALL: APIRoute = context => app.fetch(context.request);
