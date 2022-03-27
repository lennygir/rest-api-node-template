beforeEach(() => {
    console.log('début');
});

test('Jest is working =)', () => {
    expect(2+3).toBe(5);
});

afterEach(() => {
    console.log('fin');
});