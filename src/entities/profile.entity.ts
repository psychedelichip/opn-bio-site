export interface ProfileProps {
  createdAt?: Date;
  id?: number;
  isActive?: boolean;
  kudos?: number;
  updatedAt?: Date;
  username: string;
  visits?: number;
}

export class Profile {
  createdAt: Date;
  id?: number;
  isActive: boolean;
  updatedAt: Date;
  username: string;
  visits: number;
  kudos: number;

  constructor(props: ProfileProps) {
    this.createdAt = props.createdAt ?? new Date();
    this.id = props.id;
    this.isActive = props.isActive ?? true;
    this.updatedAt = props.updatedAt ?? new Date();
    this.username = props.username;
    this.visits = props.visits ?? 0;
    this.kudos = props.kudos ?? 0;
  }
}
