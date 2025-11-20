import { Profile } from '@/entities/profile.entity';
import type { ProfileRepository } from '@/interfaces/profile.repository';
import { db } from '@/database/drizzle';
import { profilesTable } from '@/database/schema';
import { eq, sql } from 'drizzle-orm';
import { ProfileMapper } from './mappers/profile.mapper';

export class ProfileDrizzleRepo implements ProfileRepository {
  async create(profile: Profile): Promise<Profile> {
    const toInsert = ProfileMapper.toPersistence(profile);

    const [created] = await db
      .insert(profilesTable)
      .values(toInsert)
      .returning();

    return ProfileMapper.toDomain(created);
  }

  async findByUsername(username: string): Promise<Profile | null> {
    const result = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.username, username))
      .limit(1);

    const record = result[0];

    return record ? ProfileMapper.toDomain(record) : null;
  }

  async incrementVisits(username: string): Promise<number> {
    const [updated] = await db
      .update(profilesTable)
      .set({ isActive: true, visits: sql`${profilesTable.visits} + 1` })
      .where(eq(profilesTable.username, username))
      .returning({ visits: profilesTable.visits });

    if (!updated)
      throw new Error(`Profile with username ${username} not found`);

    return updated.visits;
  }

  async incrementKudos(username: string): Promise<number> {
    const [updated] = await db
      .update(profilesTable)
      .set({ kudos: sql`${profilesTable.kudos} + 1` })
      .where(eq(profilesTable.username, username))
      .returning({ kudos: profilesTable.kudos });

    if (!updated)
      throw new Error(`Profile with username ${username} not found`);

    return updated.kudos;
  }

  async update(profile: Profile): Promise<Profile> {
    const toUpdate = ProfileMapper.toPersistence(profile);
    const [updated] = await await db
      .update(profilesTable)
      .set(toUpdate)
      .where(eq(profilesTable.id, profile.id!))
      .returning();

    if (!updated)
      throw new Error(`Profile with username ${profile.username} not found`);

    return updated;
  }
}
