import { faker } from '@faker-js/faker';

export interface CMSService {
  fetchContent: (contentType: ContentType, slug: string) => Promise<CMSData>;
}

const blockGenerators = [
  () => ({ type: 'Header', text: faker.lorem.sentence() }),
  () => ({ type: 'Text', text: faker.lorem.paragraph() }),
  () => ({ type: 'Image', url: faker.image.imageUrl() }),
  () => ({ type: 'Video', url: faker.internet.url() }),
  () => ({ type: 'List', items: Array.from({ length: 10 }, () => faker.lorem.word()) }),
];

const randomBlocks = (count: number): Block[] => {
  return Array.from({ length: count }, () => {
    const index = Math.floor(faker.datatype.float({ min: 0, max: 1 }) * blockGenerators.length);
    return blockGenerators[index]();
  });
};

export const dummyCMSService: CMSService = {
  fetchContent: async (contentType, slug) => {
    console.log(contentType, slug);
    const blockCount = faker.datatype.number({ min: 3, max: 10 });
    const blocks = randomBlocks(blockCount);
    return { blocks };
  },
};

export type CMSData = { blocks: Block[] };

interface HeaderBlock {
  type: 'Header';
  text: string;
}

interface TextBlock {
  type: 'Text';
  text: string;
}

interface ImageBlock {
  type: 'Image';
  url: string;
}

interface VideoBlock {
  type: 'Video';
  url: string;
}

interface ListBlock {
  type: 'List';
  items: string[];
}

export type Block = HeaderBlock | TextBlock | ImageBlock | VideoBlock | ListBlock;

export enum ContentType {
  Article = 'articles',
  LandingPage = 'landing-pages',
  Product = 'products',
  PatientSupport = 'patient-supports',
}
