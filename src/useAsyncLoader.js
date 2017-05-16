/* @flow */
import React from 'react';
import ReduxAsyncLoaderContext from './ReduxAsyncLoaderContext';

export default function useAsyncLoader() {
  return {
    renderRouterContext: (child: any, renderProps: any) => (
      <ReduxAsyncLoaderContext {...renderProps}>{child}</ReduxAsyncLoaderContext>
    ),
  };
}
