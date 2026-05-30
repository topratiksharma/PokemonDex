import React from 'react';

test('App module loads without throwing', () => {
  expect(() => require('./App')).not.toThrow();
});
