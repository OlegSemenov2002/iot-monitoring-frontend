
global.document = {
    createElement: () => ({
        getBoundingClientRect: () => ({}),
    }),
} as any;


global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    trigger: (entries: IntersectionObserverEntry[]) => callback(entries),
}));
