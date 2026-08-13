# YouTube Speed Shortcuts

A browser extension that sets YouTube playback speed with keyboard shortcuts.

## Overview

Use `Alt + number` shortcuts to set YouTube playback speed directly.

YouTube's built-in `<` and `>` shortcuts change speed relative to the current speed, so you must know the current speed. Each shortcut in this extension sets a fixed speed.

| Shortcut | Playback speed |
| --- | ---: |
| `Alt + 1` | 1.25x |
| `Alt + 2` | 1.5x |
| `Alt + 3` | 1.75x |
| `Alt + 4` | 2.0x |
| `Alt + 5` | 2.5x* |
| `Alt + 6` | 3.0x* |
| `Alt + 7` | 3.5x* |
| `Alt + 8` | 4.0x* |
| `Alt + 9` | Not assigned |
| `Alt + 0` | 1.0x |

\* Playback speeds above 2.0x require YouTube Premium.

## Development

### Setup

```sh
$ pnpm install
```

### Build

For Chrome:

```sh
$ pnpm run zip
```

For Firefox:

```sh
$ pnpm run zip:firefox
```

## Author

- Sigsign <<sig@signote.cc>>

## License

Apache-2.0
