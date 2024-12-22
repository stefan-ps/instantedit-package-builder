import { useCallback, useEffect, useMemo } from 'react';
import { List, ListItem } from '~/components/list';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import {
  addAddon,
  addBundle,
  removeAddon,
  removeBundle,
} from '~/store/builder-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import type {
  Service,
  ServicePackage,
  ServicePackageSection,
} from '~/types/api';

type Props = ServicePackageSection & { slug: 'photography' | 'cinematography' };

export function PackageConfigurator({
  title,
  description,
  slug,
  metadata,
}: Props) {
  const bundle = useAppSelector(
    (state) => state.builder.configuration[slug].package
  );
  const photography = useAppSelector(
    (state) => state.builder.configuration.photography
  );
  const dispatch = useAppDispatch();

  const addons = useMemo(() => {
    return [
      ...(metadata.addons ?? []),
      ...(metadata.packages.find(
        (servicePackage) => servicePackage.id === bundle?.id
      )?.addons ?? []),
    ];
  }, [bundle]);

  const onPackageChangeHandler = useCallback(
    (isSelected: boolean, servicePackage: ServicePackage) => {
      if (isSelected) {
        dispatch(addBundle(servicePackage));
      } else {
        dispatch(removeBundle());
      }
    },
    [dispatch]
  );

  const onAddonChangeHandler = useCallback(
    (isSelected: boolean, service: Service) => {
      if (isSelected) {
        dispatch(addAddon(service));
      } else {
        dispatch(removeAddon(service));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(photography);
  }, [photography]);

  return (
    <>
      <div className='py-5'>
        <Typography variant={'h3'}>{title}</Typography>
        <Typography appearance={'muted'}>{description}</Typography>
      </div>
      <div className='flex flex-col gap-5'>
        <div>
          {metadata.title && (
            <Typography variant={'h4'} className='mb-3'>
              {metadata.title}
            </Typography>
          )}
          <List variant={'tile'}>
            {metadata.packages.map((element) => (
              <ListItem
                key={element.title}
                id={element.id}
                title={element.title}
                description={element.description}
                hint={formatCurrency(element.price)}
                onChange={(isSelected) => {
                  onPackageChangeHandler(isSelected, element);
                }}
              />
            ))}
          </List>
        </div>
        <div>
          {addons.length > 0 && (
            <>
              {metadata.extras.addonsTitleText && (
                <Typography variant={'h4'} className='mb-3'>
                  {metadata.extras.addonsTitleText}
                </Typography>
              )}
              <List variant={'tile'} isMulti>
                {addons.map((element) => (
                  <ListItem
                    key={element.title}
                    id={element.id}
                    title={element.title}
                    description={element.description}
                    hint={formatCurrency(element.price)}
                    onChange={(isSelected) => {
                      onAddonChangeHandler(isSelected, element);
                    }}
                  />
                ))}
              </List>
            </>
          )}
        </div>
      </div>
    </>
  );
}
