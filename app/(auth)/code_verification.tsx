import { Redirect } from 'expo-router';
import React from 'react';

import { routes } from '@/constants/routes.constants';
import { useSession } from '@/store/react.ctx';

export default function Login(): React.JSX.Element {
  const { token } = useSession();
  return !token ? <Redirect href={routes.LOGIN} /> : <Redirect href={routes.CODE_VERIFICATION} />;
}
