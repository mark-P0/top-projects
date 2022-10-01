const PlayerFactory = (() => {
  /* Variables private to the factory itself */
  const __ = {
    playerCt: 0, // Track number of players created
  };

  const create = (name, mark) => {
    __.playerCt++;

    return { name, mark, num: __.playerCt };
  };

  return {
    create,
  };
})();

export { PlayerFactory };
