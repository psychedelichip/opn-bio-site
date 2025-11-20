import type { ProfileRepository } from '@/interfaces/profile.repository';

export class IncrementKudos {
  constructor(private readonly repo: ProfileRepository) {}

  async execute(username: string) {
    const profile = this.repo.findByUsername(username);

    if (!profile) return null;

    const updatedKudos = this.repo.incrementKudos(username);

    return updatedKudos;
  }
}
