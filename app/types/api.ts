export type Section = ServicePackageSection | EventPackageSection;

export type ServicePackageSection = {
  id: number;
  title: string;
  description?: string;
  slug: 'photography' | 'cinematography';
  type: 'package';
  metadata: ServicePackageMetadata;
};

export type EventPackageSection = {
  id: number;
  title: string;
  description?: string;
  slug: 'event';
  type: 'event';
  metadata: EventPackageMetadata;
};

export type ServicePackageMetadata = {
  id: number;
  title?: string;
  description?: string;
  packages: ServicePackage[];
  addons: Service[];
  extras: ServicePackageExtras;
};

export type ServicePackageExtras = {
  addonsTitleText: string;
  addonsDescriptionText?: string;
  helpText: string;
  helpActionText: string;
  comparePackagesText: string;
};

export type ServicePackage = {
  id: number;
  title: string;
  description?: string;
  price: number;
  addons: Service[];
  comparable: string[];
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
  packages: EventPackage[];
  eventTypes: EventType[];
};

export type EventPackage = {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  events: Event[];
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
