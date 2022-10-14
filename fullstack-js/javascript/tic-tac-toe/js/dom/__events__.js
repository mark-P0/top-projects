/*  Event Types
 *  To be used with `new Event()`, `new CustomEvent()`,
 *  `.dispatchEvent()`, and/or `.addEventListener()`
 */

const GameEvents = {
  INIT_TRIGGER: 'game-init-trigger',
  INIT_PROVIDER: 'game-init-provider',
  START: 'game-start',
  TURN_TRIGGER: 'game-turn-trigger',
  TURN_PROVIDER: 'game-turn-provider',
  TURN_AI: 'game-turn-ai',
  END: 'game-end',
};

export { GameEvents };
