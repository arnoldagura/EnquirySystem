export class SetToken {
  public static readonly type = '[App] Set Token';
  constructor(public payload: string) { }
}
