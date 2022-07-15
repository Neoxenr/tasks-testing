import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function Result(): ReactElement {
  const result = useSelector((state: RootState) => state.result.json);

  return <div><pre>{JSON.stringify(result, null, 4)}</pre></div>;
}
