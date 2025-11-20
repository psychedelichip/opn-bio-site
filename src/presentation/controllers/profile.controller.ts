import { Hono } from 'hono';

import { ProfileDrizzleRepo } from '@/infrastructure/profile-drizzzle.repository';
import { GetProfile } from '@/usecases/profile/get-profile.usecase';
import { ProfileMapper } from '../mappers/profile.mapper';
import { errorResponse, successResponse } from '@/lib/response';
import { GetKudos } from '@/usecases/profile/get-kudos.usecase';

const app = new Hono();

app.get('/:username/visits', async c => {
  const username = c.req.param('username');

  const profileDrizzleRepo = new ProfileDrizzleRepo();
  const getProfile = new GetProfile(profileDrizzleRepo);

  const profile = await getProfile.execute(username);

  if (!profile) return c.json(errorResponse('Profile not found.'), 404);

  const response = ProfileMapper.toProfileVisitsResponseDTO(profile);

  return c.json(successResponse(response), 200);
});

app.get('/:username/kudos', async c => {
  const username = c.req.param('username');

  const profileDrizzleRepo = new ProfileDrizzleRepo();
  const getKudos = new GetKudos(profileDrizzleRepo);

  const kudos = await getKudos.execute(username);

  if (kudos === null) return c.json(errorResponse('Profile not found.'), 404);

  const response = ProfileMapper.toKudosResponseDTO(kudos);

  return c.json(successResponse(response), 200);
});

export default app;
