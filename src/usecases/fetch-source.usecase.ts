export class FetchSource {
  private getSourceUrl(username: string, branch: string) {
    return `https://raw.githubusercontent.com/${username}/.opn/refs/heads/${branch}/bio.json`;
  }

  async execute(username: string, branch: string) {
    const url = this.getSourceUrl(username, branch);
    const res = await fetch(url);

    return { status: res.status, url };
  }
}
