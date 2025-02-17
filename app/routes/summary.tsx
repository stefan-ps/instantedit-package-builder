import { useAppSelector } from '~/store/hooks';
import type { Route } from './+types/home';
import { Typography } from '~/components/ui/typography';
import Summary from '~/pages/summary';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Summary - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export default function SummaryPage() {

  return (
    <Summary />
  );
}
