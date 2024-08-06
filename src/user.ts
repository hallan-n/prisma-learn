export class User {
  public publicId?: string;
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}
