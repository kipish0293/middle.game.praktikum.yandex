export class Vector {
  public x: number;

  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Метод для расчета длины вектора
  public length(): number {
    return Math.hypot(this.x, this.y);
  }

  // Метод для нормализации вектора
  public normalize(): Vector {
    const length = this.length();
    return new Vector(this.x / length, this.y / length);
  }

  // Метод для сложения векторов
  public add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  public addScaled(vector: Vector, scalar: number) {
    const newVector = vector.multiplyScalar(scalar);
    return this.add(newVector);
  }

  // Метод для вычитания векторов
  public subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  // Метод для умножения вектора на скаляр
  public multiplyScalar(scalar: number): Vector {
    const newX = this.x * scalar;
    const newY = this.y * scalar;
    return new Vector(newX, newY);
  }

  public divideScalar(scalar: number): Vector {
    const newX = this.x / scalar;
    const newY = this.y / scalar;
    return new Vector(newX, newY);
  }

  // Метод для вычисления скалярного произведения векторов
  public dotProduct(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  // Метод для вычисления векторного произведения векторов
  public crossProduct(other: Vector): number {
    return this.x * other.y - this.y * other.x;
  }

  public copy() {
    return new Vector(this.x, this.y);
  }
}
