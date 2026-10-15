import db from '../db.js'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

// Lightweight user model backed by lowdb
class UserModel {
  static async findOne(query) {
    await db.read()
    const users = db.data.users || []
    const found = users.find(u => (query.email ? u.email === query.email : false) || (query._id ? u.id === query._id : false))
    return found ? new UserModel(found) : null
  }

  static async find() {
    await db.read()
    const users = db.data.users || []
    // return plain objects for bulk operations
    return users
  }

  static async findById(id) {
    await db.read()
    const found = (db.data.users || []).find(u => u.id === id) || null
    return found ? new UserModel(found) : null
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    await db.read()
    const users = db.data.users || []
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) return null
    users[idx] = { ...users[idx], ...update }
    db.data.users = users
    await db.write()
    return options.selectPassword === false ? { ...users[idx], password: undefined } : users[idx]
  }

  static async findByIdAndDelete(id) {
    await db.read()
    db.data.users = (db.data.users || []).filter(u => u.id !== id)
    await db.write()
    return true
  }

  constructor(data) {
    this.id = data.id || nanoid()
    // provide _id alias to be compatible with Mongoose-based code
    this._id = this.id
    this.email = data.email
    this.password = data.password
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.role = data.role || 'instructor'
    this.permissions = data.permissions || {}
    this.preferences = data.preferences || { theme: 'light', language: 'fr', notifications: true }
    this.loginHistory = data.loginHistory || []
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  async save() {
    await db.read()
    const users = db.data.users || []
    // hash password if not already hashed (naive check)
    if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10)
    }
    const idx = users.findIndex(u => u.id === this.id)
    if (idx === -1) {
      users.push(this)
    } else {
      users[idx] = { ...users[idx], ...this }
    }
    db.data.users = users
    await db.write()
    return this
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
  }
}

export default UserModel
