import { GetServerSideProps } from 'next';
import { CMSService, ContentType, dummyCMSService } from '@/services/cms-service';
import ContentPage from '@/ui/page/content-page';


const contentTypeFrom = (contentTypeStr: string): ContentType => {
  if (!Object.values(ContentType).includes(contentTypeStr as ContentType)) {
    throw new Error('Content type not found');
  }

  return contentTypeStr as ContentType;
};

export const createGetServerSideProps = (cmsFetchService: CMSService): GetServerSideProps<{ contentType: ContentType, contentData: any }> => {
  return async ({ params }) => {
    if (!params || typeof params.slug !== 'string' || typeof params.contentType !== 'string') {
      return { notFound: true };
    }

    const sanitizedContentType = contentTypeFrom(params.contentType);
    const cmsData = await cmsFetchService.fetchContent(sanitizedContentType, params.slug);

    return {
      props: {
        contentType: sanitizedContentType,
        contentData: cmsData,
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = createGetServerSideProps(dummyCMSService);

export default ContentPage;
