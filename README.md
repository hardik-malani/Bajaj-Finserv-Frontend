# Doctor Listing Page - Campus Assessment

*Live Demo:* https://bajaj-finserv-doctor-listing.vercel.app/

---

## 🚀 Project Overview

A client-side React application showcasing:

- *Autocomplete Search*: Real-time name suggestions (top 3).
- *Dynamic Filters*: Single-select mode, multi-select specialties, and sort controls.
- *URL Sync*: Filters and search terms preserved as query parameters.

All data fetch and state updates occur locally for instant feedback.

## ⚡ Performance & Responsiveness

- *Memoized Computations* (useMemo) to avoid redundant filtering/sorting.
- *Debounced Input* to limit re-renders during typing.
- *Bundle Splitting* and *Lazy Loading* for faster initial loads.
- *Mobile-first Design: Adaptive layout across **sm, **md, **lg* breakpoints.
- Achieves high Lighthouse scores (Performance ≥ 90, Accessibility ≥ 90).

![LightHouse](https://github.com/user-attachments/assets/fe3dcd23-5740-4152-8357-370e996a5aaa)

## 📋 Features & Functionality

- *Search Bar* (data-testid="autocomplete-input" + suggestion-item):
  Quickly filters the list by name.

- *Filter Panel* (filter-header-*):
  - *Mode*: Video vs. Clinic.
  - *Specialties*: Checkboxes per API data.
  - *Sort*: Fees ↑ / Experience ↓.

- *Doctor Cards* (doctor-card):
  Displays name, specialty, experience, and fee with precise data-testid tags.
