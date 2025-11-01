import type { Source } from '@/entities/source.entity';

export interface SourceRepository {
  create(source: Source, ttl?: number): Promise<Source>;
  findByUsername(username: string): Promise<Source | null>;
}
