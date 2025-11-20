import type { ProfileRepository } from '@/interfaces/profile.repository';

export class GetKudos {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(username: string) {
    const profile = await this.repo.findByUsername(username);

    return profile ? profile.kudos : null;
  }
}
