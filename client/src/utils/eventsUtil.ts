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
