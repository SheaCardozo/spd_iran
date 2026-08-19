(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var DEBUG_EFFECT_LABELS = {
    advisor_action_timer: 'adviser cooldown',
    campaign_complete: 'campaign complete',
    constitutional_legitimacy: 'constitutional legitimacy',
    credentials_strategy: 'credential strategy',
    election_strategy: 'election strategy',
    front_structure: 'Front structure',
    independent_nationalists_dissent: 'independent-nationalist dissent',
    independent_nationalists_organization: 'independent-nationalist organization',
    independent_nationalists_relation: 'independent-nationalist relations',
    iran_party_dissent: 'Iran Party dissent',
    iran_party_organization: 'Iran Party organization',
    iran_party_relation: 'Iran Party relations',
    mossadegh_authority: 'Mossadegh authority',
    nationalization_approved_majles: 'Majles nationalization approval',
    oil_coalition_support: 'oil-coalition support',
    oil_terms_position: 'oil position',
    organizational_reach: 'organizational reach',
    parliamentary_procedure_legitimacy: 'parliamentary procedure',
    press_capacity: 'press capacity',
    public_mandate: 'public mandate',
    support_bazaar: 'bazaar support',
    support_professional: 'professional support',
    support_provincial: 'provincial support',
    support_workers: 'wage-earner support',
    razmara_response: 'Razmara response',
    religious_network_dissent: 'religious-network dissent',
    religious_network_organization: 'religious-network organization',
    religious_network_relation: 'religious-network relations',
    resources: 'resources',
    shah_electoral_influence: 'royal electoral influence',
    shah_relation: 'Crown relations',
    shah_resistance: 'Crown resistance',
    toilers_dissent: "Toilers' Party dissent",
    toilers_organization: "Toilers' Party organization",
    toilers_relation: "Toilers' Party relations",
  };

  function browserDebugModeRequested() {
    return Boolean(
      window.location && /[?&]debug=1(?:&|$)/.test(window.location.search),
    );
  }

  function debugModeEnabled() {
    return browserDebugModeRequested();
  }

  function debugEffectLabel(quality) {
    return DEBUG_EFFECT_LABELS[quality] || quality.replace(/_/g, ' ');
  }

  function debugEffectsForScene(scene) {
    var source = (scene && scene.onArrival || [])
      .map(function(action) { return action.source || ''; })
      .join('\n');
    var effects = [];
    var deltaPattern =
      /Q\['([^']+)'\]\s*=\s*\(Q\['\1'\]\s*\|\|\s*0\)\s*([+-])\s*(\d+(?:\.\d+)?);/g;
    var assignmentPattern =
      /Q\['([^']+)'\]\s*=\s*(-?\d+(?:\.\d+)?|"(?:[^"\\]|\\.)*");/g;
    var match;

    while ((match = deltaPattern.exec(source)) !== null) {
      effects.push(
        debugEffectLabel(match[1]) + ' ' + match[2] + match[3],
      );
    }
    while ((match = assignmentPattern.exec(source)) !== null) {
      var value = match[2];
      if (value.startsWith('"')) value = JSON.parse(value);
      effects.push(debugEffectLabel(match[1]) + ' → ' + value);
    }
    var placeEffects = [
      [
        /place\.scenario\.campaign_investment/,
        'Contestable-place campaign work changes → return outlook',
      ],
      [
        /place\.scenario\.local_organization/,
        'Local constituency organization changes → campaign yield',
      ],
      [
        /place\.scenario\.legal_defense/,
        'Place-level legal defense changes → credential viability',
      ],
      [
        /place\.scenario\.credential_contest/,
        'Credential contest status changes → chamber usability',
      ],
      [
        /place\.scenario\.administrative_pressure/,
        'Administrative pressure changes → return and credential risk',
      ],
      [
        /place\.scenario\.oil_(?:commitment|position)/,
        'Place-level oil position changes → chamber vote',
      ],
    ];
    for (var placeEffect of placeEffects) {
      if (placeEffect[0].test(source)) effects.push(placeEffect[1]);
    }
    var downstreamEffects = [
      [
        /oil_coalition_support/,
        'Oil coalition support → deputy commitments in both chambers',
      ],
      [
        /parliamentary_procedure_legitimacy/,
        'Procedure legitimacy → credentials, Crown reactions, and votes',
      ],
      [
        /(?:_relation|_dissent|_organization)/,
        'Component condition → coordination and recurring-action yield',
      ],
      [
        /(?:support_professional|support_bazaar|support_workers|support_provincial)/,
        'Social support → constituency organization and campaign yield',
      ],
      [
        /(?:shah_relation|shah_resistance|shah_court_capacity|shah_electoral_influence)/,
        'Crown state → access, pressure, and institutional reactions',
      ],
    ];
    for (var downstreamEffect of downstreamEffects) {
      if (downstreamEffect[0].test(source)) {
        effects.push(downstreamEffect[1]);
      }
    }
    return effects;
  }

  function installDebugChoiceEffects(dendryUI) {
    var stockDisplayChoices = dendryUI.displayChoices.bind(dendryUI);
    dendryUI.displayChoices = function(choices) {
      stockDisplayChoices(choices);
      if (!debugModeEnabled()) return;

      var list = this.$content.find('ul.choices').last();
      list.children('li').each(function(index) {
        var choice = choices[index];
        var sceneId = choice.id.replace(/^@/, '');
        var effects = debugEffectsForScene(dendryUI.game.scenes[sceneId]);
        if (!effects.length) return;

        var item = $(this).addClass('has-debug-effects');
        var target = item.find('a').first();
        var tooltipId = 'debug-effects-' +
          sceneId.replace(/[^a-z0-9_-]/gi, '-') + '-' + index;
        var tooltip = $('<span>').attr({
          id: tooltipId,
          role: 'tooltip',
        }).addClass('debug-effect-tooltip').text(
          'Debug effects: ' + effects.join('; '),
        );
        item.append(tooltip);
        if (target.length) {
          target.attr('aria-describedby', tooltipId);
        } else {
          item.attr({tabindex: '0', 'aria-describedby': tooltipId});
        }
      });
    };
  }

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Debug presentation belongs to the current URL, not to a campaign save.
    // Normalize imported and loaded states before Dendry renders their scene.
    var stockSetState = ui.dendryEngine.setState.bind(ui.dendryEngine);
    ui.dendryEngine.setState = function(state) {
      if (state && state.qualities) {
        state.qualities.debug_mode = browserDebugModeRequested() ? 1 : 0;
      }
      return stockSetState(state);
    };

    installDebugChoiceEffects(ui);

    // Dendry removes a card before its scene runs. Snapshot the complete
    // agenda here so the universal return route can restore position as well
    // as membership, without drawing a replacement.
    var stockPlayCard = ui.dendryEngine.playCard.bind(ui.dendryEngine);
    ui.dendryEngine.playCard = function(cardId) {
      var state = ui.dendryEngine.state;
      if (state.sceneId === 'main') {
        state.qualities.pre_action_hand_ids =
          (state.currentHands.main || []).map(function(card) {
            return card.id;
          });
        state.qualities.pre_action_last_card_id =
          state.lastPlayedCard ? state.lastPlayedCard.id : '';
      }
      return stockPlayCard(cardId);
    };

    var stockDrawCard = ui.dendryEngine.drawCard.bind(ui.dendryEngine);
    ui.dendryEngine.drawCard = function(deckId) {
      var result = stockDrawCard(deckId);
      refreshDeckAvailability(ui.dendryEngine);
      if (!result || !result.id) {
        var message = result && result.title === 'no_space_in_hand'
          ? 'Hand full.'
          : 'No card is ready in that deck.';
        $('.deck-state').last().text(message);
      }
      return result;
    };

    // Surface prototype slots under the v0.1 title so selecting one produces
    // the explicit schema error instead of making the old save disappear.
    var oldPrefix =
      'The Last Majles: Iran, 1949–1953_The Last Majles contributors_save';
    for (var oldSlot of ['a0', 'a1', '0', '1', '2', '3', '4', '5', '6', '7']) {
      var oldKey = oldPrefix + '_' + oldSlot;
      var newKey = ui.save_prefix + '_' + oldSlot;
      if (localStorage[oldKey] && !localStorage[newKey]) {
        localStorage[newKey] = localStorage[oldKey];
        localStorage[ui.save_prefix + '_timestamp_' + oldSlot] =
          localStorage[oldPrefix + '_timestamp_' + oldSlot] || 'Prototype save';
      }
    }

    function compatibleSave(state) {
      return Boolean(
        state &&
        state.qualities &&
        state.qualities.save_schema_version === 5
      );
    }

    function rejectOldSave() {
      window.alert(
        'This save predates the v0.3 dynamic political and parliamentary systems and ' +
        'is incompatible. Start a new Historical Scenario beginning in January 1949.'
      );
    }

    var originalLoadSlot = ui.loadSlot.bind(ui);
    ui.loadSlot = function(slot) {
      var raw = localStorage[this.save_prefix + '_' + slot];
      if (!raw) return originalLoadSlot(slot);
      try {
        if (!compatibleSave(JSON.parse(raw))) return rejectOldSave();
      } catch (error) {
        window.alert('This save file is invalid and could not be loaded.');
        return;
      }
      return originalLoadSlot(slot);
    };

    var originalQuickLoad = ui.quickLoad.bind(ui);
    ui.quickLoad = function() {
      var raw = localStorage[this.save_prefix + '_q'];
      if (!raw) return originalQuickLoad();
      try {
        if (!compatibleSave(JSON.parse(raw))) return rejectOldSave();
      } catch (error) {
        window.alert('This save file is invalid and could not be loaded.');
        return;
      }
      return originalQuickLoad();
    };

    ui.importSave = function(docId) {
      var that = this;
      var uploader = document.getElementById(docId);
      var reader = new FileReader();
      var file = uploader.files[0];
      reader.onload = function(event) {
        try {
          var state = JSON.parse(event.target.result);
          if (!compatibleSave(state)) return rejectOldSave();
          that.dendryEngine.setState(state);
          that.hideSaveSlots();
          window.alert('Loaded.');
        } catch (error) {
          window.alert('This save file is invalid and could not be loaded.');
        }
      };
      reader.readAsText(file);
    };
  };

  var TITLE = "The Last Majles: Iran, 1949–1951" + '_' + "The Last Majles contributors";

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('status')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('status');
    }
  };

  window.showLibrary = function() {
    window.dendryUI.dendryEngine.goToScene('research_library');
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };
  
  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  window.enableGrayMode = function() {
      window.dendryUI.gray_mode = true;
      document.body.classList.add('gray-mode');
      window.dendryUI.saveSettings();
  };
  window.disableGrayMode = function() {
      window.dendryUI.gray_mode = false;
      document.body.classList.remove('gray-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var animate = window.dendryUI.animate;
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
    if (window.dendryUI.gray_mode) {
        $('#gray_on')[0].checked = true;
    } else {
        $('#gray_no')[0].checked = true;
    }
  };
  
  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
  window.displayText = function(text) {
      return text;
  };

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };

  // Dendry's stock card renderer escapes title markup. The campaign's
  // semantic name spans are trusted source content, so render them as markup
  // while keeping the native card/deck DOM and click contract.
  function plainCardText(value) {
    return $('<div>').html(value || '').text();
  }

  function cardElement(card) {
    var link = $('<a>').addClass('card').attr({
      href: '#',
      'card-id': card.id,
      title: plainCardText(card.title),
    });
    if (card.image) {
      link.append($('<img>').addClass('card-img').attr({src: card.image}));
    }
    if (card.subtitle) {
      link.append(
        $('<span>').addClass('card-tooltip').html(card.subtitle),
      );
    }
    return {
      link: link,
      caption: $('<span>').addClass('card-caption').html(card.title),
    };
  }

  function handStateText(hand, maxCards) {
    var filledCards = hand.filter(Boolean).length;
    var openSlots = Math.max(0, maxCards - filledCards);
    if (filledCards === 0) return 'Hand empty — choose a deck.';
    if (openSlots === 0) return 'Hand full.';
    return openSlots + ' open ' + (openSlots === 1 ? 'slot' : 'slots') +
      ' — choose a deck.';
  }

  window.displayHand = function(hand, maxCards) {
    var description =
      window.dendryUI.dendryEngine.state.qualities.handDescription ||
      window.handDescription ||
      'Current hand';
    var list = $('.hand');
    var existing = list.length > 0;
    if (existing) {
      list.empty();
    } else {
      list = $('<ul>').addClass('hand');
      $('#content').append($('<hr>'));
      $('#content').append(
        $('<p>').addClass('hand-description').text(description),
      );
      $('#content').append(
        $('<p>').addClass('hand-state').attr({
          role: 'status',
          'aria-live': 'polite',
        }),
      );
    }
    $('.hand-state').last().text(handStateText(hand, maxCards));
    for (var index = 0; index < maxCards; index += 1) {
      var item = $('<li>').addClass('card-in-hand');
      if (hand[index]) {
        var card = cardElement(hand[index]);
        item.append(card.link).append(card.caption);
      } else {
        item.append(
          $('<div>').addClass('blank-card').attr('aria-hidden', 'true')
            .append($('<span>').text('Open slot')),
        );
      }
      list.append(item);
    }
    if (!existing) $('#content').append(list);
    window.setTimeout(function() {
      if (
        window.dendryUI &&
        window.dendryUI.dendryEngine.state.sceneId === 'main'
      ) {
        refreshDeckAvailability(window.dendryUI.dendryEngine);
      }
    }, 0);
  };

  function deckHasReadyCard(engine, deckId) {
    var scene = engine.game.scenes[deckId];
    if (!scene) return false;
    var choices = engine._compileChoices(scene) || [];
    var currentHand = engine.state.currentHands[engine.state.sceneId] || [];
    var heldIds = currentHand.map(function(card) { return card.id; });
    return choices.some(function(choice) {
      return choice.canChoose &&
        engine.game.scenes[choice.id] &&
        engine.game.scenes[choice.id].isCard &&
        heldIds.indexOf(choice.id) < 0;
    });
  }

  function explainUnavailableOpenSlots(engine) {
    var currentHand =
      engine.state.currentHands[engine.state.sceneId] || [];
    var maxCards = engine.game.scenes[engine.state.sceneId].maxCards || 4;
    if (currentHand.length > 0 && currentHand.length < maxCards) {
      $('.hand-state').last().text(
        currentHand.length + ' ' +
        (currentHand.length === 1 ? 'card' : 'cards') +
        ' in hand — every other eligible card is already held or cooling down.',
      );
    }
  }

  function refreshDeckAvailability(engine) {
    var readyCount = 0;
    $('ul.decks li.deck').each(function() {
      var item = $(this);
      var link = item.find('a.card').first();
      var ready = deckHasReadyCard(engine, link.attr('card-id'));
      item.toggleClass('unavailable-card', !ready);
      link.attr({
        'aria-disabled': String(!ready),
        tabindex: ready ? '0' : '-1',
      });
      item.find('.deck-availability').remove();
      if (ready) {
        readyCount += 1;
      } else {
        item.append(
          $('<span>').addClass('deck-availability').text('No card ready'),
        );
      }
    });
    var state = $('.deck-state').last();
    if (state.length) {
      state.text(
        readyCount > 0
          ? ''
          : 'No cards are ready in the available decks.',
      );
    }
    if (readyCount === 0) {
      explainUnavailableOpenSlots(engine);
    }
  }

  function parliamentControl() {
    var item = $('<li>').addClass('parliament-control');
    var button = $('<button>').addClass('parliament-button').attr({
      type: 'button',
      title: 'View current returns, credentials, attendance, and chamber positions',
      'aria-label': 'Parliament',
    });
    button.append(
      $('<span>').addClass('parliament-button-face').text('Parliament'),
    );
    button.on('click', function() {
      window.dendryUI.dendryEngine.goToScene('parliament');
    });
    item.append(
      button,
      $('<span>').addClass('card-caption').text('Parliament'),
    );
    return item;
  }

  window.displayDecks = function(decks) {
    var q = window.dendryUI.dendryEngine.state.qualities;
    var description =
      q.deckDescription || window.deckDescription || 'Action decks';
    $('#content').append($('<hr>'));
    $('#content').append(
      $('<p>').addClass('deck-description').text(description),
    );
    $('#content').append(
      $('<p>').addClass('deck-state').attr({
        role: 'status',
        'aria-live': 'polite',
      }),
    );
    var list = $('<ul>').addClass('decks');
    decks.forEach(function(deck) {
      var item = $('<li>').addClass('deck');
      var card = cardElement(deck);
      var availability;
      if (!deck.canChoose) {
        item.addClass('unavailable-card');
        card.link.attr({'aria-disabled': 'true', tabindex: '-1'});
        availability = $('<span>').addClass('deck-availability')
          .text('No card ready');
      } else {
        card.link.attr('aria-disabled', 'false');
      }
      item.append(card.link).append(card.caption);
      if (availability) item.append(availability);
      list.append(item);
    });
    if (q.parliamentary_deck_unlocked) {
      list.append(parliamentControl());
    }
    $('#content').append(list);
    if (!decks.some(function(deck) { return deck.canChoose; })) {
      $('.deck-state').last().text(
        'No cards are ready in the available decks.',
      );
      explainUnavailableOpenSlots(window.dendryUI.dendryEngine);
    }
  };

  window.displayPinnedCards = function(cards) {
    if (!cards.length) return;
    var q = window.dendryUI.dendryEngine.state.qualities;
    var consultationMonths = q.advisor_action_timer || 0;
    var description = consultationMonths > 0
      ? 'Adviser consultation: available in ' + consultationMonths + ' ' +
        (consultationMonths === 1 ? 'month.' : 'months.')
      : 'Adviser consultation: available.';
    if (cards.some(function(card) { return card.id === 'advisor_roster'; })) {
      var rosterMonths = q.advisor_roster_timer || 0;
      description += rosterMonths > 0
        ? ' Adviser slate review: available in ' + rosterMonths + ' ' +
          (rosterMonths === 1 ? 'month.' : 'months.')
        : ' Adviser slate review: available.';
    }
    $('#content').append($('<hr>'));
    $('#content').append(
      $('<p>').addClass('pinned-text-description').text(description),
    );
    var list = $('<ul>').addClass('pinned-cards');
    cards.forEach(function(pinned) {
      var item = $('<li>').addClass('pinned-card');
      var card = cardElement(pinned);
      item.append(card.link).append(card.caption);
      list.append(item);
    });
    $('#content').append(list);
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    var q = window.dendryUI.dendryEngine.state.qualities;
    if (
      scene != 'root' &&
      q &&
      q.save_schema_version === 5 &&
      !window.justLoaded
    ) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  window.updateSidebar = function() {
      $('#qualities').empty();
      var q = dendryUI.dendryEngine.state.qualities;
      var wrapper = document.getElementById('tools_wrapper');
      var tabButtons = document.querySelectorAll(
        '#stats_sidebar .tab_button',
      );
      if (!q || q.started !== 1) {
          if (wrapper) wrapper.hidden = true;
          tabButtons.forEach(function(button) {
              button.disabled = true;
          });
          return;
      }
      if (wrapper) wrapper.hidden = false;
      tabButtons.forEach(function(button) {
          button.disabled = false;
      });
      var scene = dendryUI.game.scenes[window.statusTab];
      if (!scene) return;
      if (scene.onArrival) {
          dendryUI.dendryEngine._runActions(scene.onArrival);
      }
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
      if (window.statusTab === 'status.support') {
          window.renderSupportTrends(q);
      }
  };

  function seatCategory(place, chamber, mode) {
    if (place.scenario.current_return !== 'returned') return 'pending';
    if (place.scenario.credential === 'rejected') return 'rejected';
        if (place.scenario.credential !== 'approved') return 'credential-pending';
        if (place.scenario.usability !== 'usable') return 'unavailable';
        if (place.scenario.attendance !== 'attending') return 'unavailable';
    if (mode === 'oil') {
      return 'oil-' + (place.scenario.oil_position || 'uncommitted');
    }
    if (chamber === 'majles' && place.scenario.support === 'national_front') {
      return 'front';
    }
    if (chamber === 'senate') return place.historical.route;
    return 'usable';
  }

  function readableSeatValue(value) {
    return String(value || 'not recorded').replace(/_/g, ' ');
  }

  function seatAccessibleLabel(place, chamber, mode) {
    var scenario = place.scenario;
    var parts = [
      (chamber === 'majles' ? 'Majles' : 'Senate') +
        ' place ' + place.place_number,
      place.historical.constituency || 'constituency not recorded',
      'return ' + readableSeatValue(scenario.current_return),
      'credential ' + readableSeatValue(scenario.credential),
      readableSeatValue(scenario.usability),
      readableSeatValue(scenario.attendance),
    ];
    if (mode === 'oil') {
      parts.push('oil position ' + readableSeatValue(scenario.oil_position));
    }
    return parts.join(', ');
  }

  function seatDetailLabel(place, chamber, mode) {
    var evidence = place.historical;
    var scenario = place.scenario;
    var person = evidence.return || scenario.scenario_return_label ||
      'return not recorded';
    var details = [
      chamber === 'majles' ? 'Majles' : 'Senate',
      'place ' + place.place_number,
      evidence.constituency || 'constituency not recorded',
      person,
      'return: ' + readableSeatValue(scenario.current_return),
      'credential: ' + readableSeatValue(scenario.credential),
      'status: ' + readableSeatValue(scenario.usability),
      'attendance: ' + readableSeatValue(scenario.attendance),
      'credential contest: ' +
        readableSeatValue(scenario.credential_contest),
    ];
    if (mode === 'oil') {
      details.push(
        'oil position: ' + readableSeatValue(scenario.oil_position),
      );
    }
    if (debugModeEnabled()) {
      details.push(
        'campaign influence: ' +
          readableSeatValue(scenario.player_influence),
        'administrative pressure: ' +
          readableSeatValue(scenario.administrative_pressure),
      );
    }
    return details.join(' — ');
  }

  function installSeatInteraction(circle, place, chamber, mode, detailPanel) {
    var showDetail = function() {
      var chart = circle.ownerSVGElement;
      if (chart) {
        chart.querySelectorAll('.chamber-seat.is-selected').forEach(
          function(selected) {
            selected.classList.remove('is-selected');
            selected.setAttribute('aria-pressed', 'false');
          },
        );
      }
      circle.classList.add('is-selected');
      circle.setAttribute('aria-pressed', 'true');
      detailPanel.textContent = seatDetailLabel(place, chamber, mode);
    };
    circle.addEventListener('focus', showDetail);
    circle.addEventListener('click', showDetail);
    circle.addEventListener('keydown', function(event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      showDetail();
    });
  }

  /*
   * Dynamic SPD election analogue: d3-parliament.js and
   * events/election_1928.scene.dry. This is the same semicircle construction
   * (0.4 inner radius, angle-sorted seats, contiguous political blocks)
   * expressed without a D3 runtime so each circle can retain its Iran place
   * record and accessible dossier interaction.
   */
  function parliamentGroupMetadata() {
    return {
      front: {
        label: 'National Front — able to sit',
        meaning: 'Returned, credential approved, and attending',
      },
      usable: {
        label: 'Other members — able to sit',
        meaning: 'Returned, credential approved, and attending',
      },
      elected: {
        label: 'Elected senators — able to sit',
        meaning: 'Elected route, seated, and attending',
      },
      appointed: {
        label: 'Appointed senators — able to sit',
        meaning: 'Royal appointment, seated, and attending',
      },
      'credential-pending': {
        label: 'Credential pending',
        meaning: 'A return exists but the mandate is not approved',
      },
      rejected: {
        label: 'Credential rejected',
        meaning: 'The chamber rejected the returned mandate',
      },
      unavailable: {
        label: 'Unavailable or absent',
        meaning: 'Not presently part of the attending voting body',
      },
      pending: {
        label: 'No return recorded',
        meaning: 'No candidate is presently returned for the place',
      },
      'oil-supports': {
        label: 'Supports nationalization',
        meaning: 'Presently committed to support',
      },
      'oil-conditional': {
        label: 'Conditional',
        meaning: 'Support remains conditional or unsettled',
      },
      'oil-opposes': {
        label: 'Opposes nationalization',
        meaning: 'Presently committed against',
      },
      'oil-uncommitted': {
        label: 'Uncommitted',
        meaning: 'No settled oil position',
      },
    };
  }

  function parliamentCategoryOrder(chamber, mode) {
    if (mode === 'oil') {
      return [
        'oil-supports',
        'oil-conditional',
        'oil-opposes',
        'oil-uncommitted',
        'credential-pending',
        'rejected',
        'unavailable',
        'pending',
      ];
    }
    if (chamber === 'senate') {
      return [
        'elected',
        'appointed',
        'credential-pending',
        'rejected',
        'unavailable',
        'pending',
      ];
    }
    return [
      'front',
      'usable',
      'credential-pending',
      'rejected',
      'unavailable',
      'pending',
    ];
  }

  function parliamentGroups(places, chamber, mode) {
    var metadata = parliamentGroupMetadata();
    var buckets = {};
    places.forEach(function(place) {
      var category = seatCategory(place, chamber, mode);
      if (!buckets[category]) buckets[category] = [];
      buckets[category].push(place);
    });
    return parliamentCategoryOrder(chamber, mode).map(function(category) {
      return {
        id: category,
        label: metadata[category].label,
        meaning: metadata[category].meaning,
        places: (buckets[category] || []).sort(function(left, right) {
          return left.place_number - right.place_number;
        }),
      };
    }).filter(function(group) {
      return group.places.length > 0;
    });
  }

  function parliamentSeatLayout(groups, width, height) {
    var innerRadiusCoef = 0.4;
    var outerRadius = Math.min(width / 2, height);
    var innerRadius = outerRadius * innerRadiusCoef;
    var seatCount = groups.reduce(function(total, group) {
      return total + group.places.length;
    }, 0);
    var rows = 0;
    var maximumSeats = 0;
    var b = 0.5;
    var a = innerRadiusCoef / (1 - innerRadiusCoef);
    while (maximumSeats < seatCount) {
      rows += 1;
      b += a;
      maximumSeats = 0;
      for (var rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        maximumSeats += Math.floor(Math.PI * (b + rowIndex));
      }
    }

    var rowWidth = (outerRadius - innerRadius) / rows;
    var seatsToRemove = maximumSeats - seatCount;
    var seats = [];
    for (var row = 0; row < rows; row += 1) {
      var radius = innerRadius + rowWidth * (row + 0.5);
      var rowSeats = Math.floor(Math.PI * (b + row)) -
        Math.floor(seatsToRemove / rows) -
        (seatsToRemove % rows > row ? 1 : 0);
      var anglePerSeat = Math.PI / rowSeats;
      for (var index = 0; index < rowSeats; index += 1) {
        var angle = -Math.PI + anglePerSeat * (index + 0.5);
        seats.push({
          radius: radius,
          angle: angle,
          x: width / 2 + radius * Math.cos(angle),
          y: outerRadius + radius * Math.sin(angle),
          seatRadius: 0.4 * rowWidth,
        });
      }
    }
    seats.sort(function(left, right) {
      return left.angle - right.angle || right.radius - left.radius;
    });

    var groupedPlaces = [];
    groups.forEach(function(group) {
      group.places.forEach(function(place) {
        groupedPlaces.push({group: group, place: place});
      });
    });
    seats.forEach(function(seat, index) {
      seat.group = groupedPlaces[index].group;
      seat.place = groupedPlaces[index].place;
    });
    return seats;
  }

  function chamberSvg(places, chamber, mode, detailPanel) {
    var namespace = 'http://www.w3.org/2000/svg';
    var width = 500;
    var height = 250;
    var svg = document.createElementNS(namespace, 'svg');
    svg.setAttribute('class', 'chamber-chart ' + chamber + '-chart');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('role', 'group');
    svg.setAttribute(
      'aria-label',
      (chamber === 'majles' ? 'Majles' : 'Senate') +
        ' place-by-place parliamentary semicircle',
    );
    var compactTouchLayout = window.matchMedia &&
      window.matchMedia('(max-width: 600px)').matches;
    var groups = parliamentGroups(places, chamber, mode);
    var seats = parliamentSeatLayout(groups, width, height);
    var reducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animate = !reducedMotion &&
      (!window.dendryUI || window.dendryUI.animate !== false);

    seats.forEach(function(seat, seatIndex) {
        var place = seat.place;
        var circle = document.createElementNS(namespace, 'circle');
        circle.setAttribute('cx', animate ? String(width / 2) : String(seat.x));
        circle.setAttribute('cy', animate ? String(height) : String(seat.y));
        circle.setAttribute('r', animate ? '0' : String(seat.seatRadius));
        circle.setAttribute(
          'class',
          'seat chamber-seat seat-' + seat.group.id,
        );
        circle.setAttribute('data-place-id', place.id);
        circle.setAttribute('data-place-number', String(place.place_number));
        circle.style.transitionDuration =
          String(Math.min(1000, 430 + seatIndex * 4)) + 'ms';
        var title = document.createElementNS(namespace, 'title');
        title.textContent = seatAccessibleLabel(place, chamber, mode);
        circle.appendChild(title);
        if (compactTouchLayout) {
          circle.setAttribute('aria-hidden', 'true');
          circle.setAttribute('focusable', 'false');
          circle.classList.add('is-visual-only');
        } else {
          circle.setAttribute('tabindex', '0');
          circle.setAttribute('role', 'button');
          circle.setAttribute('aria-pressed', 'false');
          circle.setAttribute('focusable', 'true');
          circle.setAttribute(
            'aria-label',
            seatAccessibleLabel(place, chamber, mode),
          );
          installSeatInteraction(circle, place, chamber, mode, detailPanel);
        }
        svg.appendChild(circle);
        if (animate) {
          window.requestAnimationFrame(function() {
            circle.setAttribute('cx', String(seat.x));
            circle.setAttribute('cy', String(seat.y));
            circle.setAttribute('r', String(seat.seatRadius));
          });
        }
    });
    return svg;
  }

  function chamberResultsTable(places, chamber, mode) {
    var groups = parliamentGroups(places, chamber, mode);
    var chamberLabel = chamber === 'majles' ? 'Majles' : 'Senate';
    var table = $('<table>').addClass('spd-election-table');
    table.append(
      $('<caption>').text(chamberLabel + ' composition'),
      $('<thead>').append(
        $('<tr>').append(
          $('<th>').attr('scope', 'col').text('Group'),
          $('<th>').attr('scope', 'col').text('Places'),
          $('<th>').attr('scope', 'col').text('Share'),
          $('<th>').attr('scope', 'col').text('Present status'),
        ),
      ),
    );
    var body = $('<tbody>');
    groups.forEach(function(group) {
      var share = ((group.places.length / places.length) * 100).toFixed(1);
      body.append(
        $('<tr>').append(
          $('<th>').attr('scope', 'row').append(
            $('<span>').addClass(
              'election-result-box seat-' + group.id,
            ).attr('aria-hidden', 'true'),
            document.createTextNode(group.label),
          ),
          $('<td>').text(String(group.places.length)),
          $('<td>').text(share + '%'),
          $('<td>').text(group.meaning),
        ),
      );
    });
    table.append(body);
    return table;
  }

  function chamberPlacePicker(places, chamber, mode, detailPanel) {
    var chamberLabel = chamber === 'majles' ? 'Majles' : 'Senate';
    var wrapper = $('<div>').addClass('chamber-place-picker');
    var id = chamber + '-place-picker';
    var select = $('<select>').attr({
      id: id,
      'aria-label': 'Inspect a ' + chamberLabel + ' place',
    });
    select.append(
      $('<option>').attr({value: ''}).text('Inspect a place…'),
    );
    places.forEach(function(place, index) {
      select.append(
        $('<option>').attr({value: String(index)}).text(
          'Place ' + place.place_number + ' — ' +
          (place.historical.constituency || 'constituency not recorded'),
        ),
      );
    });
    select.on('change', function() {
      if (this.value === '') return;
      var place = places[Number(this.value)];
      detailPanel.textContent = seatDetailLabel(
        place,
        chamber,
        mode,
      );
      var chart = wrapper.parent().find('.' + chamber + '-chart')[0];
      if (chart) {
        chart.querySelectorAll('.chamber-seat.is-selected').forEach(
          function(selected) {
            selected.classList.remove('is-selected');
            selected.setAttribute('aria-pressed', 'false');
          },
        );
        var selectedCircle = chart.querySelector(
          '[data-place-id="' + place.id + '"]',
        );
        if (selectedCircle) {
          selectedCircle.classList.add('is-selected');
          selectedCircle.setAttribute('aria-pressed', 'true');
        }
      }
    });
    wrapper.append(
      $('<label>').attr({for: id}).text('Place dossier'),
      select,
    );
    return wrapper;
  }

      window.renderChamberVisualizations = function(q, targetSelector) {
        var target = $(targetSelector || '#qualities');
        if (targetSelector) target.empty();
        var container = $('<section>').addClass('chamber-visualizations');
        var mode = window.chamberViewMode || 'institution';
        var availableModes = ['institution'];
        if (
          q.gass_golshayan_rejected_majles ||
          q.nationalization_approved_committee
        ) {
          availableModes.push('oil');
        } else {
          mode = 'institution';
          window.chamberViewMode = mode;
        }
        var controls = $('<div>').addClass('chamber-controls').attr(
          'aria-label', 'Chamber diagram mode',
        );
        availableModes.forEach(function(candidate) {
      controls.append(
        $('<button>').attr({
          type: 'button',
          'aria-pressed': String(mode === candidate),
        }).text(candidate === 'institution' ? 'Institutional status' : 'Oil position')
          .on('click', function() {
            window.chamberViewMode = candidate;
            window.renderChamberVisualizations(q, targetSelector);
          }),
      );
    });
    container.append(controls);
    var detailPanel = $('<p>').addClass('chamber-place-detail').attr({
      role: 'status',
      'aria-live': 'polite',
    }).text('Focus or select a place to inspect its return, credential, and position.');
    container.append($('<h3>').text('Majles places'));
    container.append(
      chamberPlacePicker(q.majles_places, 'majles', mode, detailPanel[0]),
    );
    container[0].appendChild(
      chamberSvg(q.majles_places, 'majles', mode, detailPanel[0]),
    );
    container.append(
      chamberResultsTable(q.majles_places, 'majles', mode),
    );
    if (q.senate_convened && Array.isArray(q.senate_places)) {
      container.append($('<h3>').text('Senate places'));
      container.append(
        chamberPlacePicker(q.senate_places, 'senate', mode, detailPanel[0]),
      );
      container[0].appendChild(
        chamberSvg(q.senate_places, 'senate', mode, detailPanel[0]),
      );
      container.append(
        chamberResultsTable(q.senate_places, 'senate', mode),
      );
    }
    container.append(detailPanel);
    target.append(container);
  };

  window.renderSupportTrends = function(q) {
    if (!Array.isArray(q.support_history) || q.support_history.length < 2) {
      return;
    }
    var namespace = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(namespace, 'svg');
    svg.setAttribute('class', 'support-trend-chart');
    svg.setAttribute('viewBox', '0 0 240 90');
    svg.setAttribute('role', 'img');
    svg.setAttribute(
      'aria-label',
      'Qualitative monthly trend for professional, bazaar, wage-earner, and provincial support',
    );
    var series = [
      ['professional', 'trend-professional'],
      ['bazaar', 'trend-bazaar'],
      ['workers', 'trend-workers'],
      ['provincial', 'trend-provincial'],
    ];
    series.forEach(function(definition) {
      var points = q.support_history.map(function(entry, index) {
        var x = 8 + index * (224 / Math.max(1, q.support_history.length - 1));
        var y = 82 - Math.max(0, Math.min(100, entry[definition[0]])) * 0.72;
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');
      var line = document.createElementNS(namespace, 'polyline');
      line.setAttribute('points', points);
      line.setAttribute('class', 'support-trend ' + definition[1]);
      svg.appendChild(line);
    });
    var wrapper = $('<section>').addClass('support-trends');
    wrapper.append($('<h3>').text('Monthly direction'));
    wrapper[0].appendChild(svg);
    wrapper.append(
      $('<p>').addClass('support-trend-legend').text(
        'Professional · bazaar · wage-earner · provincial networks',
      ),
    );
    $('#qualities').append(wrapper);
  };

  window.changeTab = function(newTab, tabId) {
      var q = window.dendryUI.dendryEngine.state.qualities;
      if (!q || q.started !== 1) return;
      var tabButton = document.getElementById(tabId);
      if (!tabButton) return;
      var tabButtons = document.querySelectorAll('#stats_sidebar .tab_button');

      tabButtons.forEach(function(button) {
          button.classList.remove('active');
      });

      tabButton.classList.add('active');
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
      var engine = window.dendryUI && window.dendryUI.dendryEngine;
      if (
        engine &&
        engine.state.sceneId === 'parliament' &&
        document.getElementById('parliament-visualizations')
      ) {
        window.renderChamberVisualizations(
          engine.state.qualities,
          '#parliament-visualizations',
        );
      }
  };

  window.justLoaded = true;
  window.statusTab = 'status';
  window.chamberViewMode = 'institution';
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: true});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    if (window.dendryUI.gray_mode) {
      document.body.classList.add('gray-mode');
    }
    window.statusTab = 'status';
    window.updateSidebar();
  };

}());
