import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import { cn } from '~/lib/utils';
import { insertAddon, removeAddon } from '~/store/builder-slice';
import {
  getSelectedSectionsLength,
  selectSection,
} from '~/store/config.selector';
import { useAppSelector } from '~/store/hooks';
import type { ExtraSection, Section, Service } from '~/types/api';
import LearnMore from './learn-more';

type Props = ExtraSection & { slug: Section['slug'] };

const ExtraConfigurator = ({ title, description, slug, metadata }: Props) => {
  const section = useAppSelector(selectSection(slug));
  const sectionsLength = useAppSelector(getSelectedSectionsLength);
  const dispatch = useDispatch();

  useEffect(() => {
    metadata.addons.forEach((addon) => {
      if (sectionsLength && addon.defaultYes) {
        dispatch(insertAddon({ title, slug, addon: addon.service }));
      }
    });
  }, [sectionsLength]);

  const onAddonClickHandler = useCallback(
    (service: Service) => {
      if (section?.addons?.find((addon) => addon.id === service.id)) {
        dispatch(removeAddon({ slug: slug, addon: service }));
      } else {
        dispatch(insertAddon({ title, slug: slug, addon: service }));
      }
    },
    [section]
  );

  return (
    <div>
      <div className='py-5 flex flex-row justify-between'>
        <div>
          <Typography variant={'h3'}>{title}</Typography>
          <Typography appearance={'muted'}>{description}</Typography>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div>
          {metadata.title && (
            <Typography variant={'h4'} className='mb-3'>
              {metadata.title}
            </Typography>
          )}
          <ul className={cn('flex flex-col gap-2')}>
            {metadata.addons.map((element) => (
              <li key={element.id} className={cn('flex flex-col gap-3 py-3')}>
                <div className='flex flex-row justify-between items-center'>
                  <Typography>{element.service.title}</Typography>
                  {element.service.more && (
                    <LearnMore
                      label={'Learn More'}
                      src={element.service.more}
                    />
                  )}
                </div>
                {element.service.description && (
                  <Typography variant={'small'} appearance={'muted'}>
                    {element.service.description}
                  </Typography>
                )}
                <div className='flex flex-row gap-3'>
                  <div
                    onClick={() => onAddonClickHandler(element.service)}
                    className={cn(
                      'flex-1 flex flex-row justify-between gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
                      {
                        'border-primary text-primary bg-primary/20':
                          !section?.addons.find(
                            (addon) => addon.id === element.service.id
                          ),
                      }
                    )}
                  >
                    <Typography>{element.no}</Typography>
                  </div>
                  <div
                    onClick={() => onAddonClickHandler(element.service)}
                    className={cn(
                      'flex-1 flex flex-row justify-between gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
                      {
                        'border-primary text-primary bg-primary/20':
                          !!section?.addons.find(
                            (addon) => addon.id === element.service.id
                          ),
                      }
                    )}
                  >
                    <Typography>{element.yes}</Typography>
                    {element.service.price && element.service.price > 0 ? (
                      <Typography variant={'small'}>
                        {formatCurrency(element.service.price)}
                        {element.service.isRecurring && '/month'}
                      </Typography>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExtraConfigurator;
