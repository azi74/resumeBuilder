export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  isAdmin?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}