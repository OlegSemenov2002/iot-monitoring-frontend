import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

// Мок IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback) => {
    const instance = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],

        __callback: callback,
    };
    mockIntersectionObserver.mock.instances.push(instance);
    return instance;
});


mockIntersectionObserver.mock.instances = [];

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
});

// Мок document
global.document = {
    createElement: () => ({
        getBoundingClientRect: () => ({}),
        style: {},
    }),
} as any;
