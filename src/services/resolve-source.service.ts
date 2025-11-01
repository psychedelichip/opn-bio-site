import type { CacheSource } from '@/usecases/cache-source.usecase';
import type { FetchSource } from '@/usecases/fetch-source.usecase';
import type { GetCachedSource } from '@/usecases/get-cached-source.usecase';
import type { IncrementOrCreateVisit } from '@/usecases/increment-or-create-visit.usecase';
import type { MarkProfileInactive } from '@/usecases/mark-profile-inactive.usecase';

export class ResolveSourceService {
  constructor(
    private readonly getCachedSource: GetCachedSource,
    private readonly incrementOrCreateVisit: IncrementOrCreateVisit,
    private readonly markProfileInactive: MarkProfileInactive,
    private readonly cacheSource: CacheSource,
    private readonly fetchSource: FetchSource,
  ) {}

  async execute(username: string) {
    const cached = await this.getCachedSource.execute(username);

    if (cached) {
      await this.incrementOrCreateVisit.execute(username);

      return cached.source;
    }

    const main = await this.fetchSource.execute(username, 'main');

    if (main.status === 200) {
      await this.cacheSource.execute(username, main.url);
      await this.incrementOrCreateVisit.execute(username);

      return main.url;
    } else if (main.status === 429) {
      return main.url;
    }

    const master = await this.fetchSource.execute(username, 'master');

    if (master.status === 200) {
      await this.cacheSource.execute(username, master.url);
      await this.incrementOrCreateVisit.execute(username);

      return master.url;
    }

    if (main.status === 404 && master.status === 404) {
      await this.markProfileInactive.execute(username);

      return null;
    }

    return main.url;
  }
}
