import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import { Section } from './section';
import CartCard from './cart/cart-card';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { insertAddon, insertBundle, resetConfig } from '~/store/builder-slice';
import { setActivePreview } from '~/store/app.slice';

export function Sidebar() {
  const [searchParams] = useSearchParams();
  const { sections } = useAppSelector((state) => state.app.configuration);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParams.size > 0) {
      sections.forEach((section) => {
        if (section.type === 'event') {
          const eventPackage = searchParams.get('eventPackage');
          const events = searchParams.getAll('events');

          section.metadata.bundles.forEach((bundle) => {
            if (bundle.id === Number(eventPackage)) {
              const allEvents = section.metadata.bundles
                .map((b) => b.events)
                .flat();
              const uniqueEvents = Array.from(
                new Map(allEvents.map((event) => [event.id, event])).values()
              );
              dispatch(
                insertBundle({
                  title: section.title,
                  slug: section.slug,
                  package: bundle,
                  events: uniqueEvents.filter((event) =>
                    events.includes(`${event.id}`)
                  ),
                })
              );

              if (bundle.preview) {
                dispatch(setActivePreview(bundle.preview));
              }
            }
          });
        } else if (section.type === 'service') {
          const packages = searchParams.getAll('packages');
          const addons = searchParams.getAll('addons');
          section.metadata.bundles.forEach((bundle) => {
            if (packages.includes(`${bundle.id}`)) {
              dispatch(
                insertBundle({
                  title: section.title,
                  slug: section.slug,
                  package: bundle,
                })
              );
            }
          });

          section.metadata.addons
            .map((a) => a.service)
            .flat()
            .concat(
              section.metadata.bundles
                .map((b) => b.addons)
                .flat()
                .filter((addon) => addon.isAddon)
            )
            .forEach((addon) => {
              if (addons.includes(`${addon.id}`)) {
                dispatch(
                  insertAddon({
                    title: section.title,
                    slug: section.slug,
                    addon,
                  })
                );
              }
            });
        } else if (section.type === 'extra') {
          const addons = searchParams.getAll('addons');

          section.metadata.addons.forEach((addon) => {
            if (addons.includes(`${addon.id}`)) {
              dispatch(
                insertAddon({
                  title: section.title,
                  slug: section.slug,
                  addon: addon.service,
                })
              );
            }
          });
        }
      });
    }
  }, [searchParams, sections]);

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
