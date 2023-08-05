'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Loading() {
  return (
    <ProgressBar
      height="4px"
      color="#D44059"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
