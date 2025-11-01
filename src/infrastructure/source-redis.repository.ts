import { storage } from '@/database/redis';
import { Source } from '@/entities/source.entity';
import type { SourceRepository } from '@/interfaces/source.repository';

export class SourceRedisRepo implements SourceRepository {
  private createKey(username: string) {
    return `source:${username}`;
  }

  async create(source: Source, ttl: number = 60 * 60): Promise<Source> {
    const toInsert = { source: source.source };
    const key = this.createKey(source.username);

    await storage.setItem(key, toInsert, { ttl });

    return source;
  }

  async findByUsername(username: string) {
    const key = this.createKey(username);
    const result = await storage.getItem<{ source: string }>(key);

    return result ? new Source({ source: result.source, username }) : null;
  }
}
