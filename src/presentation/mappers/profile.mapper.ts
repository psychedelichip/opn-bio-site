import type { Profile } from '@/entities/profile.entity';
import type { ProfileVisitsResponseDTO } from '../dtos/profile.dto';

export class ProfileMapper {
  static toProfileVisitsResponseDTO(
    profile: Profile,
  ): ProfileVisitsResponseDTO {
    return { visits: profile.visits };
  }
}
