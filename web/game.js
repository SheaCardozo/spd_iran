(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

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
        state.qualities.save_schema_version === 1
      );
    }

    function rejectOldSave() {
      window.alert(
        'This save predates The Last Majles v0.1 and is incompatible. ' +
        'Start a new Historical Scenario; prototype saves are not migrated.'
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
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
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
    }
    for (var index = 0; index < maxCards; index += 1) {
      var item = $('<li>').addClass('card-in-hand');
      if (hand[index]) {
        var card = cardElement(hand[index]);
        item.append(card.link).append(card.caption);
      } else {
        item.append($('<div>').addClass('blank-card'));
      }
      list.append(item);
    }
    if (!existing) $('#content').append(list);
  };

  window.displayDecks = function(decks) {
    var q = window.dendryUI.dendryEngine.state.qualities;
    var description =
      q.deckDescription || window.deckDescription || 'Action decks';
    $('#content').append($('<hr>'));
    $('#content').append(
      $('<p>').addClass('deck-description').text(description),
    );
    var list = $('<ul>').addClass('decks');
    decks.forEach(function(deck) {
      var item = $('<li>').addClass('deck');
      var card = cardElement(deck);
      if (!deck.canChoose) item.addClass('unavailable-card');
      item.append(card.link).append(card.caption);
      list.append(item);
    });
    $('#content').append(list);
  };

  window.displayPinnedCards = function(cards) {
    if (!cards.length) return;
    var q = window.dendryUI.dendryEngine.state.qualities;
    var description = 'Advisers';
    if (q.advisor_action_timer > 0) {
      description += ' — available in ' + q.advisor_action_timer + ' months';
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
      q.save_schema_version === 1 &&
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
      var scene = dendryUI.game.scenes[window.statusTab];
      if (!scene) return;
      if (scene.onArrival) {
          dendryUI.dendryEngine._runActions(scene.onArrival);
      }
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      var tabButton = document.getElementById(tabId);
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
  };

  window.justLoaded = true;
  window.statusTab = 'status';
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
