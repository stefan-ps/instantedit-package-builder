import { Section } from './section';
import CartCard from './cart/cart-card';
import { useAppSelector } from '~/store/hooks';

export function Sidebar() {
  const { sections } = useAppSelector((state) => state.app.configuration);

  return (
    <div className='relative'>
      {sections.map((section) => {
        return <Section key={section.id} {...section} />;
      })}
      <div className='h-48'></div>
      <CartCard />
    </div>
  );
}
