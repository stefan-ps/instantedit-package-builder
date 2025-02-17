import { Typography } from '~/components/ui/typography';
import type { ServiceBundle } from '~/types/api';
import { calculateBundlePrice } from '../utils';
import { useAppSelector } from '~/store/hooks';
import { selectSection } from '~/store/config.selector';

type Props = {
  item: ServiceBundle;
};

const PackageSummary = ({ item }: Props) => {
  const { settings } = useAppSelector((state) => state.app.configuration);
  const eventSection = useAppSelector(selectSection('event'));

  return (
    <div key={item.id}>
      <div className='flex flex-row justify-between items-center gap-5  border-b mb-3'>
        <div>
          <Typography variant={'small'} appearance={'muted'}>
            {item.title}
          </Typography>
          <Typography variant={'h3'}>{item.title}</Typography>
        </div>
        <Typography variant={'h3'}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(
            calculateBundlePrice(item, eventSection?.events ?? [], settings)
          )}
        </Typography>
      </div>
      <div className='px-5'>
        <ul className='list-disc  text-gray-500 '>
          {item.comparables.map((comp) => (
            <li key={comp.title}>
              <Typography variant={'small'} appearance={'muted'}>
                {comp.title}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageSummary;
