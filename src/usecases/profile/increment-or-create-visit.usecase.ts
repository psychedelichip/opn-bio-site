import { Profile } from '@/entities/profile.entity';
import type { ProfileRepository } from '@/interfaces/profile.repository';

export class IncrementOrCreateVisit {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(username: string) {
    const profile = await this.repo.findByUsername(username);

    if (!profile) {
      const newProfile = new Profile({
        username,
        visits: 1,
      });

      await this.repo.create(newProfile);
    } else {
      await this.repo.incrementVisits(username);
    }
  }
}
