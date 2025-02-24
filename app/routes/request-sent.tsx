import type { Route } from './+types/home';
import RequestSuccess from '~/pages/requested/success';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Request Sent - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export default function RequestSentPage() {

  return (
    <RequestSuccess />
  );
}
