import { AbstractEntity, Vector } from '@app/engine';

class TestEntity extends AbstractEntity {
  public constructor() {
    super({ position: new Vector(0, 0), width: 10, height: 10 });
  }

  public destroy(): void {}

  public render(): void {}

  public update(): void {}
}

describe('AbstractEntity', () => {
  it('create an instance of AbstractEntity', () => {
    const testEntity = new TestEntity();

    expect(testEntity).toBeInstanceOf(TestEntity);
  });

  it('update position correctly', () => {
    const testEntity2 = new TestEntity();
    const moveDirection = new Vector(5, 5);

    testEntity2.move(moveDirection);

    expect(testEntity2.position.x).toBe(5);
    expect(testEntity2.position.y).toBe(5);
  });
});
