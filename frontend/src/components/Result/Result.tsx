import React, { ReactElement, useEffect, useState } from 'react';

export function Result(): ReactElement {
  const [result, setResult] = useState({});

  const getResult = async () => {
    setResult(
      await fetch('/var/tmp/code-example/output.json').then((response) => {
        console.log(response.json());
        return response.json();
      }),
    );
  };

  useEffect(() => {
    getResult();
  }, [result]);

  return <div>{JSON.stringify(result)}</div>;
}
