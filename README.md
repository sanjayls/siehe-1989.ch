# siehe-1989.ch              FREISTOSS LUZERN                   Allmend Totomad             BETA


A teletext-inspired historical web prototype about **FC Luzern’s 1988/89 championship season**.

The project presents standings, match results, scorers, squad information, timeline events, and selected match details in a retro Totomat / teletext interface.

## Overview

This repository is a lightweight frontend project built around a static data layer and a simple client-side application.

It is intended as:
- a visual historical prototype
- an editorial presentation layer
- a foundation for future expansion into a more rigorous football history interface

## Status

This project is currently a **beta version**.

It is functional, but still under active revision. Data points, player details, match metadata, wording, and UI behaviour may still be corrected, expanded, or restructured.

## Beta limitations

At the current stage, the project has several limitations:

- some match details are reconstructed and not yet fully source-verified
- parts of the player biography layer remain incomplete
- some historical metadata may still be normalized or corrected over time
- the data structure is usable, but not yet a formal research-grade archival schema
- the interface is stable enough for presentation, but still evolving

## Data quality note

This project should currently be understood as an **editorial beta dataset**, not as a definitive scholarly edition.

Where possible, corrections have been applied to:
- club and player naming
- standings logic
- final round interpretation
- squad roles and selected player details

However, some historical elements still require further verification against primary source material.

## Roadmap

Planned next steps include:

- cleaner provenance and source documentation
- improved match-detail verification
- more complete player profiles
- stronger normalization of names and entities
- optional source-confidence markers in the interface
- gradual evolution toward a more research-oriented historical football dataset

## Tech

- `index.html` — page structure
- `app.js` — client-side rendering and interaction
- `data.js` — season dataset and content layer

## License

No license has been specified yet.

## Editorial note

This repository is currently a presentation-oriented historical prototype.

It is **not yet** a fully documented archival database or critical research edition. If the project is expanded further, the next logical steps would be:

- source references
- provenance notes
- methodological remarks on completeness and uncertainty
- versioning for historical corrections
