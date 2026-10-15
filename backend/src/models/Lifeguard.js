import db from '../db.js'
import { nanoid } from 'nanoid'

class LifeguardModel {
  static async find() {
    await db.read()
    return db.data.lifeguards || []
  }

  static async findById(id) {
    await db.read()
    return (db.data.lifeguards || []).find(l => l.id === id) || null
  }

  constructor(data) {
    this.id = data.id || nanoid()
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.dateOfBirth = data.dateOfBirth
    this.email = data.email
    this.phone = data.phone
    this.photo = data.photo
    this.certification = data.certification
    this.testRegistrations = data.testRegistrations || []
    this.examScores = data.examScores || []
    this.attendance = data.attendance || []
    this.certifications = data.certifications || []
    this.emergencyContact = data.emergencyContact || {}
    this.medicalNotes = data.medicalNotes || ''
    this.active = data.active !== undefined ? data.active : true
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  async save() {
    await db.read()
    db.data.lifeguards = db.data.lifeguards || []
    db.data.lifeguards.push(this)
    await db.write()
    return this
  }
}

export default LifeguardModel
