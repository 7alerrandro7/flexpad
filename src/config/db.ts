import lodash from 'lodash'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

interface Pads {
  pads: Pad[]
}

interface Pad {
  path: string,
  content: string,
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const defaultData: Pads = {
  pads: [],
}

const adapter = new JSONFile<Pads>('db.json');
export const db = new LowWithLodash(adapter, defaultData);
// export const db = new Low<Pads>(new JSONFile('db.json'), {pads: []});
await db.read()
await db.write()