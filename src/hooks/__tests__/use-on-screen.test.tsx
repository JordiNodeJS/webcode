import { act, renderHook } from "@testing-library/react";
import useOnScreen from "../use-on-screen";

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });

  mockIntersectionObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    callback,
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useOnScreen", () => {
  it("should return ref and isIntersecting", () => {
    const { result } = renderHook(() => useOnScreen());

    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
  });

  it("should update isIntersecting when element intersects", () => {
    const { result } = renderHook(() => useOnScreen());

    // Simulate intersection
    act(() => {
      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observerInstance.callback([{ isIntersecting: true }]);
    });

    expect(result.current.isIntersecting).toBe(true);
  });

  it("should use default threshold of 0.1", () => {
    renderHook(() => useOnScreen());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: 0.1 }),
    );
  });

  it("should use custom threshold", () => {
    renderHook(() => useOnScreen(0.5));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: 0.5 }),
    );
  });

  it("should disconnect observer on unmount", () => {
    const { unmount } = renderHook(() => useOnScreen());
    const observerInstance = mockIntersectionObserver.mock.results[0].value;

    unmount();

    expect(observerInstance.disconnect).toHaveBeenCalled();
  });
});
