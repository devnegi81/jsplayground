function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

it('should execute after the specified wait time', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    expect(mockFunc).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(mockFunc).toBeCalled();
});


it('should only execute once within the wait time', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(mockFunc).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(mockFunc).toBeCalledTimes(1);
});

it('should receive the correct arguments', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc(1, 2, 3);

    jest.advanceTimersByTime(1000);
    expect(mockFunc).toBeCalledWith(1, 2, 3);
});

it('should not throw an error when called with no arguments', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    expect(() => {
        debouncedFunc();
        jest.advanceTimersByTime(1000);
    }).not.toThrow();
});

it('should throw an error when called with a non-function argument', () => {
    expect(() => {
        debounce('not a function', 1000);
    }).toThrow();
});