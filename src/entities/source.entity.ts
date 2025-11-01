export interface SourceProps {
  source: string;
  username: string;
}

export class Source {
  source: string;
  username: string;

  constructor(props: SourceProps) {
    this.source = props.source;
    this.username = props.username;
  }
}
