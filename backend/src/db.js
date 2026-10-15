import { join, dirname } from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

// Resolve backend directory relative to this file to avoid CWD issues
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const backendDir = join(__dirname, '..')
const file = join(backendDir, 'data.json')

const defaultData = { users: [], swimmers: [], groups: [], lifeguards: [], equipment: [] }

const db = {
  data: null,
  async read() {
    try {
      const s = await fs.readFile(file, 'utf8')
      this.data = JSON.parse(s)
    } catch (err) {
      // If file missing or parse error, initialize with default
      this.data = defaultData
      await this.write()
    }
  },
  async write() {
    const tmp = `${file}.tmp`
    await fs.writeFile(tmp, JSON.stringify(this.data || defaultData, null, 2), 'utf8')
    await fs.rename(tmp, file)
  }
}

// Ensure file exists on startup
try {
  await fs.access(file)
} catch (e) {
  await fs.mkdir(backendDir, { recursive: true })
  await fs.writeFile(file, JSON.stringify(defaultData, null, 2), 'utf8')
}

await db.read()

export default db
