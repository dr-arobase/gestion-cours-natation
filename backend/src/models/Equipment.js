import db from '../db.js'
import { nanoid } from 'nanoid'

class EquipmentModel {
  static async find() {
    await db.read()
    return db.data.equipment || []
  }

  static async findById(id) {
    await db.read()
    return (db.data.equipment || []).find(e => e.id === id) || null
  }

  constructor(data) {
    this.id = data.id || nanoid()
    this.name = data.name
    this.type = data.type
    this.quantity = data.quantity || 1
    this.condition = data.condition || 'Bon'
    this.lastInspection = data.lastInspection
    this.nextInspection = data.nextInspection
    this.location = data.location
    this.notes = data.notes
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  async save() {
    await db.read()
    db.data.equipment = db.data.equipment || []
    db.data.equipment.push(this)
    await db.write()
    return this
  }
}

export default EquipmentModel
