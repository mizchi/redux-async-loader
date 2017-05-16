/* @flow */
import { loadAsyncPropertyName } from './names';

export default function asyncLoader(loader: Function) {
  return (Component: any) => {
    Component[loadAsyncPropertyName] = loader;
    return Component;
  };
}
