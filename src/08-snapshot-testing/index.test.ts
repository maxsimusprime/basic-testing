import { type LinkedListNode, generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2, 3]);

    const expected: LinkedListNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(linkedList).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3]);

    expect(linkedList).toMatchSnapshot();
  });
});
