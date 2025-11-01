import { Source } from '@/entities/source.entity';
import type { SourceRepository } from '@/interfaces/source.repository';

export class CacheSource {
  constructor(private readonly repo: SourceRepository) {}

  async execute(username: string, source: string) {
    this.repo.create(new Source({ source, username }));
  }
}
