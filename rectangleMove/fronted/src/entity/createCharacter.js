import Player from './Player.js'
import StandardPlayer from './character/StandardPlayer.js'
import GaintPlayer from './character/GaintPlayer.js'
import HurryPlayer from './character/HurryPlayer.js'


function createCharacter(name, id, color, type) {
  switch (type) {
    case 'StandardPlayer':
      return new Player(new StandardPlayer({ name: name, id: id, color: color }))
    case 'GaintPlayer':
      return new Player(new GaintPlayer({ name: name, id: id, color: color }))
    case 'HurryPlayer':
      return new Player(new HurryPlayer({ name: name, id: id, color: color }))
    default:
      return new Player(new StandardPlayer({ name: name, id: id, color: color }))
  }
}

export {
  createCharacter
}