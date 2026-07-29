# Historical choice flavour and debug effects

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Rewrote every substantive choice subtitle so the ordinary interface describes
the political act, its audience, and its likely reaction rather than listing
qualities to optimize. Exact immediate `on-arrival` changes are now shown only
in debug mode: open the campaign with `?debug=1`, then hover a choice or focus
it from the keyboard. The tooltip appears without a persistent icon or badge.
It is derived from the compiled target scene, so the displayed values cannot
drift from the implemented effect.

The scene standard and automated audit now reject common mechanical subtitle
forms such as “stronger legitimacy and support,” “balanced procedure and
mandate,” and raw cost-only subtitles. Hard availability requirements remain
visible when hiding them would make a choice misleading.

## Reason

The previous subtitles accurately previewed direction but read like a compact
strategy guide. They named the campaign's qualities and often reduced a
political decision to a list of favorable and unfavorable state movements.
The revised language leaves the mechanical direction legible through action
and reaction while allowing developers and balance testers to inspect exact
deltas without making them the public voice of the game.

## Dynamic SPD comparison

Paths are relative to
`/home/phroz/spd/dynamic_social_democracy`.

- `source/scenes/party_affairs/media.scene.dry` is strongest when its subtitles
  explain who a newspaper strategy reaches, which faction objects, or what
  sort of press results. Some later options fall back to raw resource costs.
- `source/scenes/events/hindenburg_explode_referendum_campaign.scene.dry`
  usually lets the action title and consequence carry the political meaning,
  while using unavailable subtitles for actual prerequisites.
- `lib/ui/browser.js` in Dendry renders the selected target scene's subtitle
  beneath each choice but has no separate mechanical-debug layer.

The Last Majles retains SPD's action-first option writing and explicit
unavailability explanations. It adapts the browser presentation by adding a
debug-only exact-effect tooltip, because the campaign already distinguishes
qualitative public state from exact developer values. It rejects raw
quality-name summaries in normal choice prose.

This is a presentation change, not a major architecture divergence. Choice
effects, shared state, action economy, event routing, deck semantics, and saves
are unchanged.

## System fit

- `web/game.js` wraps Dendry's normal choice renderer and reads each compiled
  target scene's `onArrival` function source.
- Only direct numerical deltas and assignments are displayed. The tooltip
  labels the immediate change before monthly normalization.
- Debug tooltips appear on hover and `:focus-within`; ordinary runs create no
  debug-effect elements.
- The current URL is the sole authority for debug presentation. Loading or
  importing a debug-created save at the ordinary URL clears its persisted
  debug flag before Dendry renders the restored scene.
- `scripts/audit-scenes.js` applies the flavour rule to every compiled visible
  consequence subtitle.
- `SCENE_CONTENT_STANDARD.md` makes historical action and reaction the default
  choice-description responsibility.

## Research and assets

No historical anchor, factual assertion, source locator, bibliography entry,
image, or asset right changed. The revised subtitles describe the already
implemented counterfactual action and its bounded political logic; they do not
add documentary claims.

## Validation

- `node scripts/audit-scenes.js`: 166 classified scenes, zero failures.
- Independent adversarial review: all 97 substantive option targets and all
  166 compiled scenes passed; debug isolation and keyboard access passed.
- `npm test`: eight suites passed, zero failures.
- Browser regression coverage now includes hover, keyboard focus, ordinary
  mode, and debug-save → ordinary-load isolation. The Playwright browsers
  cannot launch in this environment because their system libraries are absent,
  so those assertions remain source-reviewed rather than executed here.
- Local watcher rebuilt the game and reported connected-browser reload.
- `git diff --check`: passed.
