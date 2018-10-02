// @flow
import React from 'react';
import Loadable from 'react-loadable';
import type { Node } from 'react';

type Props = {
  loader: Node,
  loading: ?Node,
};

const defaultLoading = (): Node => <div>Loading...</div>;

const CreateLoadable = ({
  loader,
  children: loading = defaultLoading,
}: Props): Node =>
  Loadable({
    loader,
    loading,
  });

export default CreateLoadable;
