import db from '../db.js'
import { nanoid } from 'nanoid'

class SwimmerModel {
  static async find() {
    await db.read()
    return db.data.swimmers || []
  }

  static async findById(id) {
    await db.read()
    return (db.data.swimmers || []).find(s => s.id === id) || null
  }

  constructor(data) {
    this.id = data.id || nanoid()
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.dateOfBirth = data.dateOfBirth
    this.email = data.email
    this.phone = data.phone
    this.photo = data.photo
    this.group = data.group
    this.level = data.level
    this.skills = data.skills || []
    this.attendance = data.attendance || []
    this.diplomas = data.diplomas || []
    this.progression = data.progression || []
    this.emergencyContact = data.emergencyContact || {}
    this.medicalNotes = data.medicalNotes || ''
    this.active = data.active !== undefined ? data.active : true
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  async save() {
    await db.read()
    db.data.swimmers = db.data.swimmers || []
    db.data.swimmers.push(this)
    await db.write()
    return this
  }
}

export default SwimmerModel
