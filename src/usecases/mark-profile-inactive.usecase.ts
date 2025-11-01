import type { ProfileRepository } from '@/interfaces/profile.repository';

export class MarkProfileInactive {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(username: string) {
    const profile = await this.repo.findByUsername(username);

    if (!profile) {
      throw new Error(`Profile with username "${username}" not found`);
    }

    profile.isActive = false;
    profile.updatedAt = new Date();

    const updated = await this.repo.update(profile);

    return updated;
  }
}
