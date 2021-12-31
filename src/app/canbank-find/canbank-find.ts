export class Find {
  constructor(
    public findString: string
  ) {}
}

export interface Can {
  model: string;
  price: number;
  id?: number;
}
