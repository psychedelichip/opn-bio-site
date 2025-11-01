import type { InsertProfile, SelectProfile } from '@/database/schema';
import { Profile } from '@/entities/profile.entity';

export class ProfileMapper {
  static toPersistence(profile: Profile): InsertProfile {
    return {
      isActive: profile.isActive,
      username: profile.username,
      visits: profile.visits,
    };
  }

  static toDomain(props: SelectProfile) {
    return new Profile({
      createdAt: props.createdAt,
      id: props.id,
      isActive: props.isActive,
      updatedAt: props.updatedAt,
      username: props.username,
      visits: props.visits,
    });
  }
}
