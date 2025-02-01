export type Settings = {
  events: {
    price: number;
    firstPrice: number;
  };
  translations?: Record<string, string>;
};

export type Section = ServicePackageSection | EventPackageSection;

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

export type ServicePackageMetadata = {
  id: number;
  title?: string;
  description?: string;
  bundles: Bundle[];
  addons: Service[];
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
  type: 'event' | 'service';
  price: number;
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
  price: number;
};

export type Addon = Service;

export type EventPackageMetadata = {
  id: number;
  title?: string;
  description?: string;
  bundles: EventPackage[];
  eventTypes: EventType[];
};

export type EventPackage = {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  events: Event[];
  photographyDefaultId?: number;
  cinematographyDefaultId?: number;
};

export type Event = {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  type: 'ceremony' | 'pre-ceremony'; //EventType;
};

export type EventType = {
  id: number;
  value: 'ceremony' | 'pre-ceremony';
  title: string;
  description?: string;
};

export const isServicePackage = (entity: any): entity is Bundle =>
  entity.price !== undefined;

export const isEventPackage = (entity: any): entity is EventPackage =>
  entity.events !== undefined;
