import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import { Section } from './section';
import CartCard from './cart/cart-card';
import { useAppSelector } from '~/store/hooks';

export function Sidebar() {
  const { sections } = useAppSelector((state) => state.app.configuration);

  return (
    <div className='relative'>
      <div className='flex flex-row justify-between items-center bg-white p-5 '>
        <Typography variant={'h2'}>Welcome!</Typography>
        <Button>
          <Typography>Save progress</Typography>
        </Button>
      </div>

      {sections.map((section) => {
        return <Section key={section.id} {...section} />;
      })}
      <div className='h-48'></div>
      <CartCard />
    </div>
  );
}
