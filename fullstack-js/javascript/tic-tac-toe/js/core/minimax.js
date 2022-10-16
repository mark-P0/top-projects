const Scores = {
  BASE: 10,
  NONE: 0,
};

function getScore(game, perspective, depth) {
  const { winner } = game;
  if (winner === null) return Scores.NONE;
  if (winner.mark === perspective.mark) return Scores.BASE - depth;
  return depth - Scores.BASE;
}

function minimax(game, perspective, depth = 0) {
  /*  Minimax Algorithm
   *  Largely based from:
   *  https://www.neverstopbuilding.com/blog/minimax
   */

  let bestMoveIdx;

  function _(game, perspective, depth) {
    if (game.hasEnded) {
      /* There can be no more next moves when the game has ended */
      bestMoveIdx = null;
      return getScore(game, perspective, depth);
    }

    depth += 1;
    const isEvenDepth = depth % 2 === 0;

    /* Map each possible move index to a computed score */
    const stat = game.grid.blankCellIdcs.map((moveIdx) => {
      /* Generate a new game state for each */
      const newGameState = game.clone;

      /*  Correct clone's reference of the current player.
       *  At even tree depths (e.g. 0 [root], 2, 4),
       *  the current player generated game states must be the given `perspective`.
       *  Vice versa, at odd tree depths, it must be the other player.
       *  If neither of this is true, cycle the player reference to correct it.
       *
       *  Can be simplified to a XOR operation, but that would seem to obfuscate the intention too much...
       */
      /* prettier-ignore */
      if (!(
        ( isEvenDepth && game.currentPlayer.mark === perspective.mark) ||
        (!isEvenDepth && game.currentPlayer.mark !== perspective.mark)
      )) newGameState.nextPlayer;

      /* Actual setting of new game state */
      const { grid, currentPlayer } = newGameState;
      grid.markCell(moveIdx, currentPlayer.mark);

      /* Compute relative score of the new game state */
      const score = _(newGameState, perspective, depth);

      return { moveIdx, score };
    });

    /*  Calculation Proper
     *  The one for whom the minmax is calculated is referred to as the `perspective`.
     *  The best move for them is the one that the algorithm assigns the largest score to.
     */
    stat.sort((a, b) => b.score - a.score); // Sort from largest to least score
    const statIdx = perspective === game.currentPlayer ? 0 : -1;
    const { moveIdx, score } = stat.at(statIdx);
    bestMoveIdx = moveIdx;
    return score;
  }
  _(game, perspective, depth);

  /*  Return value cannot remain unassigned.
   *  By this point, it should have already been either an index value (int),
   *  or `null` (no best moves; provided game state may have already ended).
   */
  if (bestMoveIdx === undefined) {
    throw new ReferenceError('Best move was not calculated!');
  }

  return bestMoveIdx;
}

export { minimax };
