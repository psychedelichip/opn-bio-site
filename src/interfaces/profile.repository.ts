import { Profile } from '@/entities/profile.entity';

export interface ProfileRepository {
  create(profile: Profile): Promise<Profile>;
  findByUsername(username: string): Promise<Profile | null>;
  incrementVisit(username: string): Promise<number>;
  update(profile: Profile): Promise<Profile>;
}
