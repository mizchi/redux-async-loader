/* @flow */
/* eslint-disable react/no-set-state */
/* eslint-disable react/sort-comp */

/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import computeChangedRoutes from './computeChangedRoutes';
import { beginAsyncLoad, endAsyncLoad, skipAsyncLoad } from './actions';
import flattenComponents from './flattenComponents';
import loadAsync from './loadAsync';
import { reducerName } from './names';

class ReduxAsyncLoaderContext extends Component<*, *, *> {
  defaultProps: any;
  loadCount: number;
  state: any;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      children: null,
    };
    this.loadCount = 0;
  }

  componentDidMount() {
    const { loading, loaded, onServer } = this.getAsyncLoaderState();
    if (loading) {
      return;
    }

    if (loaded && onServer) {
      const { dispatch } = this.context.store;
      dispatch(skipAsyncLoad(false));
      return;
    }

    this.loadAsync(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    // FIXME: Dirty check for stop by global
    // I want to take this flag by reducer, but dispatching action can not intercept at same request frame.
    if (global.FLAG_FOR_STOP_ASYNC_LOAD) {
      return;
    }

    if (nextProps.location === this.props.location) {
      return;
    }

    const enterRoutes = computeChangedRoutes(
      { routes: this.props.routes, params: this.props.params, location: this.props.location },
      { routes: nextProps.routes, params: nextProps.params, location: nextProps.location }
    );

    const indexDiff = nextProps.components.length - enterRoutes.length;
    const components = enterRoutes.map((route, index) => nextProps.components[indexDiff + index]);

    this.loadAsync(Object.assign({}, nextProps, { components }));
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const { loading } = this.getAsyncLoaderState();
    return !loading;
  }

  getAsyncLoaderState() {
    const { getAsyncLoaderState } = this.props;
    const { getState } = this.context.store;
    return getAsyncLoaderState(getState());
  }

  loadAsync(props: any) {
    const { children, components } = props;

    const flattened = flattenComponents(components);
    if (!flattened.length) {
      return;
    }

    const { store } = this.context;
    const { dispatch } = store;
    this.beginLoad(dispatch, children)
      .then(() => loadAsync(flattened, props, store))
      .then(() => this.endLoad(dispatch), (error) => this.endLoad(dispatch, error));
  }

  beginLoad(dispatch: any, children: any) {
    if (this.loadCount === 0) {
      dispatch(beginAsyncLoad());
    }

    ++this.loadCount;
    return new Promise((resolve) => {
      this.setState({ children }, () => resolve());
    });
  }

  endLoad(dispatch: Function, error: ?any) {
    if (error) {
      this.props.onError(error);
    }

    --this.loadCount;
    if (this.loadCount === 0) {
      dispatch(endAsyncLoad());
      this.setState({ children: null });
    }
  }

  render() {
    const { loading } = this.getAsyncLoaderState();
    return loading ? this.state.children : this.props.children;
  }
}

ReduxAsyncLoaderContext.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReduxAsyncLoaderContext.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getAsyncLoaderState: PropTypes.func,
  onError: PropTypes.func,
};

ReduxAsyncLoaderContext.defaultProps = {
  getAsyncLoaderState(state) {
    return state[reducerName];
  },
  onError(error) {
    // ignore
  },
};

export default ReduxAsyncLoaderContext;
