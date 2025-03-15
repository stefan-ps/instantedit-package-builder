export type Settings = {
  events: {
    price: number;
    firstPrice: number;
  };
  translations?: Record<string, string>;
};

export type Section =
  | ServicePackageSection
  | EventPackageSection
  | ExtraSection;

export type ServicePackageSection = {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  slug: 'photography' | 'cinematography';
  type: 'service';
  metadata: ServicePackageMetadata;
};

export type EventPackageSection = {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  slug: 'event';
  type: 'event';
  metadata: EventPackageMetadata;
};

export type ExtraSection = {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string;
  slug: 'extra';
  type: 'extra';
  metadata: ServicePackageMetadata;
};

export type ServicePackageMetadata = {
  id: number;
  title?: string;
  description?: string;
  more?: string;
  bundles: ServiceBundle[];
  addons: MetadataService[];
};

export type MetadataService = {
  id: number;
  yes: string;
  no: string;
  defaultYes: boolean;
  service: Service;
};

export type ServicePackageExtras = {
  addonsTitleText: string;
  addonsDescriptionText?: string;
  helpText: string;
  helpActionText: string;
  comparePackagesText: string;
};

export type Bundle = {
  id: number;
  title: string;
  description?: string;
  type: 'service' | 'event';
  price: number;
  isRecurring: boolean;
};

export type EventBundle = Bundle & {
  type: 'event';
  photographyDefaultId?: number;
  cinematographyDefaultId?: number;
  duration: number;
  events: Event[];
};
export type ServiceBundle = Bundle & {
  type: 'service';
  addons: Service[];
  comparables: Comparable[];
};

export type Comparable = {
  title: string;
  text?: string;
  icon?: string;
};

export type Service = {
  id: number;
  title: string;
  description?: string;
  more?: string;
  isAddon: boolean;
  price: number;
  isRecurring: boolean;
};

export type Addon = Service;

export type EventPackageMetadata = {
  id: number;
  title?: string;
  description?: string;
  bundles: EventBundle[];
  eventTypes: EventType[];
};

// export type EventPackage = {
//   id: number;
//   title: string;
//   description?: string;
//   type: 'event';
//   duration?: number;
//   events: Event[];
//   photographyDefaultId?: number;
//   cinematographyDefaultId?: number;
// };

export type Event = {
  id: number;
  title: string;
  description?: string;
  durationInHours?: number;
  type: 'ceremony' | 'pre-ceremony'; //EventType;
};

export type EventType = {
  id: number;
  value: 'ceremony' | 'pre-ceremony';
  title: string;
  description?: string;
};

export const isServicePackage = (entity: any): entity is ServiceBundle =>
  entity.type === 'service';

export const isEventPackage = (entity: any): entity is EventBundle =>
  entity.type === 'event';
