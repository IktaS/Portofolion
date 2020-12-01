export const propagateEvent = function(
  //eslint-disable-next-line
  component: any,
  event: string,
  value: string
) {
  let vm = component.$parent;

  while (vm) {
    vm.$emit(event, value);
    vm = vm.$parent;
  }
};

export class Debounce {
  private time: number;
  private callback: Function;
  private _pending = 0;

  constructor(callback: Function, time: number) {
    this.time = time;
    this.callback = callback;
  }

  public trigger(obj: unknown) {
    clearTimeout(this._pending);

    this._pending = setTimeout(() => {
      this.callback(obj);
    }, this.time);
  }
}
