
// import { renderHook, act } from '@testing-library/react-hooks';
// import { useInfiniteScroll } from './useInfiniteScroll';
// import {MutableRefObject, useCallback, useState} from 'react';
//
// export default function useCounter(initialValue = 0) {
//     const [count, setCount] = useState(initialValue)
//     const increment = useCallback(() => setCount((x) => x + 1), [])
//     const reset = useCallback(() => setCount(initialValue), [initialValue])
//     return { count, increment, reset }
// }
//
// describe('useInfiniteScroll', () => {
//     test('should reset to new initial value after rerender', () => {
//         let initial = 5
//         const { result, rerender } = renderHook(() => useCounter(initial))
//
//         initial = 10
//         rerender()
//
//         act(() => result.current.reset())
//
//         expect(result.current.count).toBe(10)
//     })
// });
//
