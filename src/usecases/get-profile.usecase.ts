import type { ProfileRepository } from '@/interfaces/profile.repository';

export class GetProfile {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(username: string) {
    const profile = this.repo.findByUsername(username);

    return profile;
  }
}
