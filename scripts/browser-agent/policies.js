function actionable(observation, region) {
  return (observation.interactions || []).filter(
    (interaction) =>
      !interaction.disabled &&
      interaction.name &&
      (!region || interaction.region === region) &&
      ['button', 'link', 'tab'].includes(interaction.role),
  );
}

function isEnding(observation) {
  return [
    'A Constitutional Coalition',
    'A Parliamentary Vanguard',
    'A Movement of the Streets',
    'A Fragile Nationalization',
    'Nationalization Defeated in the Majles',
    'Nationalization Blocked in the Senate',
  ].some((ending) => observation.visibleText.includes(ending));
}

function chooseNamed(interactions, fragments) {
  for (const fragment of fragments) {
    const choice = interactions.find((interaction) =>
      interaction.name.toLowerCase().includes(fragment));
    if (choice) return choice;
  }
  return null;
}

function activate(interaction) {
  return {
    kind: 'activate',
    role: interaction.role,
    name: interaction.name,
    occurrence: interaction.occurrence || 0,
  };
}

class AccessibleAdversarialPolicy {
  constructor(options = {}) {
    this.profile = options.profile || 'passage';
    this.cancelledCards = new Set();
    this.decisions = 0;
  }

  next(observation) {
    if (isEnding(observation)) return {done: true, reason: 'visible ending'};

    const scene = actionable(observation, 'scene');
    const hand = actionable(observation, 'hand');
    const decks = actionable(observation, 'deck');
    const pinned = actionable(observation, 'pinned');
    const page = actionable(observation, 'page');
    const all = [...scene, ...hand, ...decks, ...pinned, ...page];
    if (!all.length) {
      return {done: true, reason: 'no rendered actionable control'};
    }

    let choice = null;
    if (hand.length) {
      if (this.profile === 'passage') {
        choice = chooseNamed(hand, [
          'oil',
          'deputy',
          'credential',
          'press',
          'meeting',
          'committee',
        ]);
      } else if (this.profile === 'contrarian') {
        choice = hand[hand.length - 1];
      }
      choice ||= hand[0];
    } else if (decks.length) {
      if (this.profile === 'contrarian') {
        choice = decks[decks.length - 1];
      }
      choice ||= decks[0];
    } else if (scene.length) {
      choice = chooseNamed(scene, ['begin the historical scenario']);
      const rosterControls = scene.filter((interaction) =>
        /^(add|remove) /.test(interaction.name.toLowerCase()),
      );
      if (!choice && rosterControls.length) {
        choice = chooseNamed(scene, ['confirm the active slate']);
        choice ||= rosterControls.find((interaction) =>
          interaction.name.toLowerCase().startsWith('add '),
        );
      }
      const returnCard = scene.find((interaction) =>
        interaction.name.toLowerCase().includes('return card to hand'));
      if (
        !choice &&
        this.profile === 'cancellation' &&
        returnCard &&
        !this.cancelledCards.has(returnCard.name)
      ) {
        this.cancelledCards.add(returnCard.name);
        choice = returnCard;
      }
      if (!choice && this.profile === 'passage') {
        choice = chooseNamed(scene, [
          'nationalization',
          'oil',
          'deput',
          'constitutional',
          'credential',
          'coalition',
          'joint',
          'confirm the active slate',
          'add ',
          'continue',
          'return to',
          'begin',
        ]);
      }
      if (!choice && this.profile === 'contrarian') {
        choice = [...scene].reverse().find(
          (interaction) =>
            !interaction.name.toLowerCase().includes('return card to hand'),
        );
      }
      choice ||= scene.find(
        (interaction) =>
          !interaction.name.toLowerCase().includes('return card to hand'),
      );
      choice ||= scene[0];
    } else {
      choice = all[0];
    }

    this.decisions += 1;
    return {
      action: activate(choice),
      rationale: `${this.profile} selected visible ${choice.region} control "${choice.name}"`,
    };
  }
}

module.exports = {
  AccessibleAdversarialPolicy,
  actionable,
  isEnding,
};
