import { Typography } from '~/components/ui/typography';
import type { ServicePackage } from '~/types/api';

type Props = {
  item: ServicePackage;
};

const PackageSummary = ({ item }: Props) => {
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
          }).format(item.price)}
        </Typography>
      </div>
      <div className='px-5'>
        <ul className='list-disc  text-gray-500 '>
          {item.comparable.map((comp) => (
            <li key={comp}>
              <Typography variant={'small'} appearance={'muted'}>
                {comp}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageSummary;
