const Marks = {
  X: '❌',
  O: '⭕',
  _: '🔲', // Unmarked cell

  get playable() {
    const { X, O } = this;
    return [X, O];
  },
};

export default Marks;
