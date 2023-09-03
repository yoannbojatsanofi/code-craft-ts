import { ContentType, dummyCMSService } from '@/services/cms-service';
import { createGetServerSideProps } from '@/pages/[contentType]/[slug]';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, Redirect } from 'next';
import { fail } from 'assert';


describe('getServerSideProps', () => {
  const getServerSideProps = createGetServerSideProps(dummyCMSService);
  type Props = { contentType: ContentType; contentData: any };
  type ServerSideResult = { notFound: true } | { redirect: Redirect } | { props: Props };

  describe('when params are valid', () => {
    const params: ParsedUrlQuery = { slug: 'test-slug', contentType: 'articles' };

    it('fetches content and returns it as props', async () => {
      const result = (await getServerSideProps({ params } as GetServerSidePropsContext)) as ServerSideResult;

      if ('props' in result) {
        expect(result.props.contentType).toEqual(ContentType.Article);
        expect(result.props.contentData).toBeDefined();
      } else {
        fail('Expected result to have props');
      }
    });
  });

  describe('when params are missing', () => {
    it('returns notFound', async () => {
      const result = await getServerSideProps({ params: {} } as GetServerSidePropsContext);

      expect(result).toEqual({ notFound: true });
    });
  });

  describe('when contentType is invalid', () => {
    it('throws an error', async () => {
      const params: ParsedUrlQuery = { slug: 'test-slug', contentType: 'invalid' };

      await expect(() => getServerSideProps({ params } as GetServerSidePropsContext))
        .rejects
        .toThrow('Content type not found');
    });
  });
});
