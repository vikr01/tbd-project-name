import React from 'react';
import renderer from 'react-test-renderer';
import Header from 'toms-shuttles-frontend/src/components/Header';

describe('Header', () => {
  test('has nothing for now', () => {
    const header = <Header />;
    const tree = renderer.create(header);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
