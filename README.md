# Giftinct

React Native app for managing giftees and gift recommendations.

## Recent changes

### Calendar tab
- Birthday calendar now loads giftees from the shared API and shows **“Name's Birthday”** labels under dates.
- Displays the current month plus the next two months; tapping a label opens that giftee's detail screen.
- Calendar grid logic moved to `src/utils/calendarEvents.ts`.

### Navigation
- **Smoother transitions** — tuned stack animations (detail swipe-back, fade-in gift results, consistent quiz timing).
- **Reliable param transfer** — typed helpers in `src/navigation/rootNavigation.ts` and hooks (`useNavigateGifteeDetail`, `useNavigateGiftResults`, `useNavigateQuizFlow`).
- **Stack `getId`** on `GifteeDetail`, `GiftResults`, and quiz steps so list → detail and quiz → results always show the correct screen.
- **Quiz swipe-back** — step state re-syncs from route params when navigating back.
- **Sign-up → results** — quiz answers and a derived recipient label (e.g. “Friend”) pass through to the gift results header.
- `enableScreens(true)` and a navigation theme aligned with app background colors to reduce transition flash.

## Preview

![App animation](./assets/screenshots/output.gif)

## Screenshots

### Quiz flow

![Quiz step 1 — Who are you buying a gift for?](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.52.06.png)

![Quiz step 2 — What is the occasion?](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.52.22.png)

### Gift results

![Gift ideas for your parent](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.52.49.png)

### Home

![Home — next event and giftee list](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.52.59.png)

### Giftee detail

![Giftee profile — Andreana](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.53.10.png)

![Saved gifts — Andreana](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.53.21.png)

![Saved gifts — Diana](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.53.51.png)

### Calendar

![Calendar — birthday labels](./assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-05-30%20at%2018.53.30.png)

## Bundle analysis

![Bundle treemap — overview](./assets/screenshots/bundle1.png)

![Bundle treemap — detail](./assets/screenshots/bundle2.png)
