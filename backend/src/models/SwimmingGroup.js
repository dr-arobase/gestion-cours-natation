import db from '../db.js'
import { nanoid } from 'nanoid'

class SwimmingGroupModel {
  static async find() {
    await db.read()
    return db.data.groups || []
  }

  static async findById(id) {
    await db.read()
    return (db.data.groups || []).find(g => g.id === id) || null
  }

  constructor(data) {
    this.id = data.id || nanoid()
    this.name = data.name
    this.level = data.level
    this.schedule = data.schedule || []
    this.instructor = data.instructor
    this.maxCapacity = data.maxCapacity || 12
    this.currentEnrollment = data.currentEnrollment || 0
    this.session = data.session || {}
    this.active = data.active !== undefined ? data.active : true
    this.description = data.description || ''
    this.ageRange = data.ageRange || {}
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  async save() {
    try {
      await db.read()
      db.data.groups = db.data.groups || []
      db.data.groups.push(this)
      await db.write()
      return this
    } catch (err) {
      console.error('SwimmingGroup.save error:', err && err.message, err && err.stack)
      throw err
    }
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    await db.read()
    db.data.groups = db.data.groups || []
    const groups = db.data.groups
    const idx = groups.findIndex(g => g.id === id)
    if (idx === -1) return null

    // Support simple Mongo-like $inc operator
    if (update && update.$inc) {
      Object.keys(update.$inc).forEach(key => {
        const incVal = Number(update.$inc[key]) || 0
        groups[idx][key] = (Number(groups[idx][key]) || 0) + incVal
      })
      // merge any other fields
      const rest = { ...update }
      delete rest.$inc
      groups[idx] = { ...groups[idx], ...rest }
    } else {
      groups[idx] = { ...groups[idx], ...update }
    }

    db.data.groups = groups
    await db.write()
    return options.new ? groups[idx] : groups[idx]
  }

  static async findByIdAndDelete(id) {
    await db.read()
    db.data.groups = (db.data.groups || []).filter(g => g.id !== id)
    await db.write()
    return true
  }
}

export default SwimmingGroupModel
