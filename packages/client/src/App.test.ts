// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve() }));

test('Mock test', () => expect(1).toEqual(1));
