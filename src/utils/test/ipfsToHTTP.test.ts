import { ipfsToHTTP } from '../ipfs';

describe('ipfsToHTTP', () => {
  it('converts ipfs URI to HTTPS URI with default gateway', () => {
    const ipfsURI = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected =
      'https://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI)).toEqual(expected);
  });

  it('converts ipfs URI with custom gateway', () => {
    const ipfsURI = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected =
      'https://cloudflare-ipfs.com/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI, 'cloudflare-ipfs.com')).toEqual(expected);
  });

  it('converts http:// to https://', () => {
    const httpURI = 'http://example.com/image.png';
    const expected = 'https://example.com/image.png';
    expect(ipfsToHTTP(httpURI)).toEqual(expected);
  });

  it('preserves https:// URIs with upgrade', () => {
    const httpsURI = 'https://example.com/image.png';
    expect(ipfsToHTTP(httpsURI)).toEqual(httpsURI);
  });

  it('handles CIDv1 format correctly', () => {
    const cidV1 =
      'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
    const expected =
      'https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
    expect(ipfsToHTTP(cidV1)).toEqual(expected);
  });

  it('handles IPFS URI with path', () => {
    const ipfsWithPath = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5/metadata.json';
    const expected =
      'https://ipfs.io/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5/metadata.json';
    expect(ipfsToHTTP(ipfsWithPath)).toEqual(expected);
  });

  it('handles pinata gateway', () => {
    const ipfsURI = 'ipfs://QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    const expected =
      'https://gateway.pinata.cloud/ipfs/QmY5V6JZ5Yf7Z6p8n7Y1Z5dJLXhZU7Z7Q3mH2nX8vqfHc5';
    expect(ipfsToHTTP(ipfsURI, 'gateway.pinata.cloud')).toEqual(expected);
  });
});
