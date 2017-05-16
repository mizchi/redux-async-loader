/* @flow */
import { loadAsyncPropertyName } from './names';

export default function loadAsync(components: any, props: any, store: any) {
  return Promise.all(components.map((component) => component[loadAsyncPropertyName](props, store)));
}
