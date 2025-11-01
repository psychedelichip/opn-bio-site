import type { SourceRepository } from '@/interfaces/source.repository';

export class GetCachedSource {
  constructor(private readonly repo: SourceRepository) {}

  async execute(username: string) {
    const cachedSource = await this.repo.findByUsername(username);

    return cachedSource;
  }
}
