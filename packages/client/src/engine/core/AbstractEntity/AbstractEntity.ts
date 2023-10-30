import { Vector } from '../Vector/Vector';

import { EntityConstructorParameters } from './types';

export abstract class AbstractEntity {
  public position: Vector;

  public width: number;

  public height: number;

  public prevPosition: Vector;

  protected constructor({ position, width, height }: EntityConstructorParameters) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.prevPosition = position.copy();
  }

  public get posX() {
    return this.position.x;
  }

  public set posX(value: number) {
    this.position.x = value;
  }

  public get posY() {
    return this.position.y;
  }

  public set posY(value: number) {
    this.position.y = value;
  }

  public get prevX() {
    return this.prevPosition.x;
  }

  public set prevX(value: number) {
    this.prevPosition.x = value;
  }

  public get prevY() {
    return this.prevPosition.y;
  }

  public set prevY(value: number) {
    this.prevPosition.y = value;
  }

  public move(moveDirection: Vector) {
    this.position = this.position.add(moveDirection);
  }

  public abstract update(deltaTime: number): void;

  public abstract render(deltaTime: number, context: CanvasRenderingContext2D): void;

  public abstract destroy(): void;
}
