import Vector from '../Vector'

export type EntityConstructorParameters = {
  position: Vector
  width: number
  height: number
}

export type CollisionShape = {
  position: Vector
  width: number
  height: number
}
