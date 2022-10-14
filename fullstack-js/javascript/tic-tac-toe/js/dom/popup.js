import Utils from '../utils.js';
import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const Popup = {
  __element__: document.getElementById('popup'),
  staticAttrs: {
    'data-bs-backdrop': 'static',
    'data-bs-keyboard': 'false',
  },
  get bsModal() {
    return bootstrap?.Modal?.getOrCreateInstance(this.__element__);
  },

  show({ asStatic = false } = {}) {
    if (asStatic) {
      for (const [attr, val] of Object.entries(this.staticAttrs)) {
        this.__element__.setAttribute(attr, val);
      }
    }

    this.bsModal?.show();

    if (asStatic) {
      this.__element__.addEventListener(
        'hidden.bs.modal',
        () => {
          this.bsModal?.dispose();
          for (const attr of Object.keys(this.staticAttrs)) {
            this.__element__.removeAttribute(attr);
          }
        },
        { once: true }
      );
    }
  },

  hide() {
    this.bsModal?.hide();
  },

  get label() {
    return this.__element__.getAttribute('aria-labelledby');
  },

  get modalContent() {
    return this.__element__.querySelector('.modal-content');
  },
  clearContent() {
    this.modalContent.replaceChildren();
  },
  use(elements) {
    this.clearContent();

    const { header, body, footer } = elements;
    for (const part of [header, body, footer]) {
      if (!part) continue;
      this.modalContent.appendChild(part);
    }
  },
};

const InitPopupElements = (gameMode, playerMarks, aiDifficulty) => {
  /* prettier-ignore */
  const header = buildElementTree(
    E('div', { class: 'modal-header' }, null, [
      E('h1', { class: 'modal-title fw-semibold fs-2', id: Popup.label }, null, [
        E('span', null, 'Welcome to ', null),
        E('em', null, 'Tic-Tac-Toe', null),
        E('span', null, '!', null),
      ]),
    ])
  );

  const formCrossProps = {
    id: 'game-options',
    submitter: undefined,
  };

  const footer = (() => {
    /* prettier-ignore */
    formCrossProps.submitter = buildElementTree(
      E('button', { type: 'submit', class: 'btn btn-primary', form: formCrossProps.id, id: 'game-options-submit', disabled: true }, 'Start Game', null)
    )

    /* prettier-ignore */
    return buildElementTree(
      E('div', { class: 'modal-footer' }, null, [
        E(formCrossProps.submitter, null, null, null),
      ])
    );
  })();

  const body = (() => {
    /* prettier-ignore */
    const formVars = {
      GAME_MODE:     'gameMode',
      PLAYER_MARK:   'playerMark',
      PLAYER_NAME:   'playerName',
      AI_DIFFICULTY: 'aiDifficulty',
    };

    const gameModeSelector = (() => {
      /* prettier-ignore */
      const gameModeMap = {
        [gameMode.PVP]: { text: 'Another Player', disabled: false },
        [gameMode.PVC]: { text: 'vs. AI',         disabled: true },
      };

      return (mode) => {
        const { text, disabled } = gameModeMap[mode];

        /* prettier-ignore */
        const buttonAttr = { type: 'radio', class: 'btn-check', name: formVars.GAME_MODE, value: mode, id: mode, autocomplete: 'off' }
        if (disabled) Object.assign(buttonAttr, { disabled });
        const button = buildElementTree(E('input', buttonAttr, null, null));
        button.addEventListener('click', () => {
          button.form.dataset.gameMode = mode;
        });

        /* prettier-ignore */
        return [
          E(button, null, null, null),
          E('label', { class: 'btn btn-outline-dark', for: mode }, text, null),
        ]
      };
    })();

    const playerMarkSelectionOptions = (selectedMark) => {
      return playerMarks.map((mark) => {
        const attr = mark === selectedMark ? { selected: true } : null;
        return E('option', attr, mark, null);
      });
    };

    /* prettier-ignore */
    const playerNameInputGroup = (mark, ct) => {
      return E('div', { class: 'input-group' }, null, [
        E('select', { class: 'form-select', name: formVars.PLAYER_MARK }, null, playerMarkSelectionOptions(mark)),
        E('input', { type: 'text', class: 'form-control', placeholder: `Player ${ct}`, 'aria-label': `Player ${ct}`, 'aria-describedby': `player-${ct}`, name: formVars.PLAYER_NAME }, null, null),
      ])
    };

    const aiDifficultySetting = (() => {
      /* prettier-ignore */
      const difficultySettingMap = {
        [aiDifficulty.EASY]:       { text: 'Easy',       type: 'btn-outline-success', disabled: true },
        [aiDifficulty.DIFFICULT]:  { text: 'Difficult',  type: 'btn-outline-warning', disabled: true },
        [aiDifficulty.IMPOSSIBLE]: { text: 'Impossible', type: 'btn-outline-danger',  disabled: true },
      }

      return (difficulty) => {
        /* prettier-ignore */
        const buttonAttr = { type: 'radio', class: 'btn-check', name: formVars.AI_DIFFICULTY, 'value': difficulty, id: difficulty, autocomplete: 'off' }
        const { text, type, disabled } = difficultySettingMap[difficulty];
        if (disabled) Object.assign(buttonAttr, { disabled });

        /* prettier-ignore */
        return [
          E('input', buttonAttr, null, null),
          E('label', { class: `btn ${type}`, for: difficulty }, text, null),
        ]
      };
    })();

    /* prettier-ignore */
    const form = buildElementTree(
      E('form', { method: 'dialog', class: 'vstack gap-3', id: formCrossProps.id, 'data-game-mode': '' }, null, [
        /* Game Mode Selection */
        E('div', { class: 'vstack' }, null, [
          E('label', { class: 'form-label fw-semibold', for: 'game-mode-selectors' }, 'Play Against...', null),
          E('div', { class: 'btn-group equal-sizes', id: 'game-mode-selectors', role: 'group', 'aria-label': 'Game mode selector' }, null,
            Object.values(gameMode).map((mode) => gameModeSelector(mode)).flat()
          ),
        ]),

        /* Player Names */
        E('div', { class: 'vstack', id: 'game-players' }, null, [
          E('label', { class:'form-label fw-semibold', for: 'game-player-data' }, null, [
            E('span', null, 'Player Name', null),
            E('span', null, 's', null),
            E('span', { class: 'text-secondary fw-normal' }, ' (Optional)', null),
          ]),
          E('div', { class: 'hstack gap-3', id: 'game-player-data' }, null,
            playerMarks.map((mark, idx) => playerNameInputGroup(mark, idx + 1))
          ),
        ]),

        /* AI Difficulty Setting */
        E('div', { class: 'vstack', 'data-setting-for': gameMode.PVC }, null, [
          E('label', { class:'form-label fw-semibold', for: 'game-mode-pvc-difficulty' }, 'AI Difficulty', null),
          E('div', { class: 'btn-group equal-sizes', id: 'game-mode-pvc-difficulty', role: 'group', 'aria-label': 'AI difficulty setting' }, null,
            Object.values(aiDifficulty).map((difficulty) => aiDifficultySetting(difficulty)).flat()
          ),
        ]),
      ])
    )

    function collectFormData() {
      return Array.from(new FormData(form)).reduce((acml, data) => {
        const [name, value] = data;

        if (Array.isArray(acml[name])) acml[name].push(value);
        else if (acml[name] === undefined) acml[name] = value;
        else acml[name] = [acml[name], value];

        return acml;
      }, {});
    }

    form.addEventListener('change', () => {
      const data = collectFormData();

      /* Validations-ish */
      if (
        Object.values({
          areSameMarks:
            data[formVars.GAME_MODE] === gameMode.PVP &&
            Utils.getSameItem(data[formVars.PLAYER_MARK]) !== null,
          noDifficultyChosen:
            data[formVars.GAME_MODE] === gameMode.PVC &&
            !data[formVars.AI_DIFFICULTY],
        }).some((isTrue) => isTrue)
      ) {
        formCrossProps.submitter.disabled = true;
        return;
      }

      formCrossProps.submitter.disabled = false;
    });
    form.addEventListener(
      'submit',
      () => {
        const data = collectFormData();
        const playerData = Utils.convertArrayColumnsToObjectRows({
          mark: data[formVars.PLAYER_MARK],
          name: data[formVars.PLAYER_NAME],
        });

        const providerEvent = new CustomEvent(GameEvents.INIT_PROVIDER, {
          detail: { playerData },
        });
        document.dispatchEvent(providerEvent);

        Popup.hide();
      },
      { once: true }
    );

    return buildElementTree(
      E('div', { class: 'modal-body' }, null, [E(form, null, null, null)])
    );
  })();

  return { header, body, footer };
};

/* Show popup on game load */
document.addEventListener(
  GameEvents.INIT_TRIGGER,
  ({ detail: { gameMode, playerMarks, aiDifficulty } }) => {
    Popup.use(InitPopupElements(gameMode, playerMarks, aiDifficulty));
    Popup.show({ asStatic: true });
  },
  { once: true }
);

export { Popup };
