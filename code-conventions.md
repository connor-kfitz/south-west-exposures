# Code Conventions

Applies to all TypeScript in this repo (`packages/*/src`).

## No semicolons after `}`

Omit the semicolon only when it would immediately follow a closing curly brace —
interfaces, classes, function declarations, `if`/`for`/`while` blocks, and object
literals or arrow functions assigned to a variable.

```ts
interface Player {
  id: string
}

function greet() {
  console.log("hi");
}

const config = {
  width: 640,
  height: 480
}
```

Everything else keeps its semicolon as normal — anything not ending directly in `}`:
`const x = 5;`, `import ... from "...";`, `return foo;`, `console.log("hi");`,
`const list = [1, 2, 3];`.

**Exception:** an interface/class property whose type is an inline object literal keeps
its semicolon, matching the sibling properties around it.

```ts
export interface RoomSnapshot {
  name: string;
  gridSize: { width: number; height: number };
  maxPlayers: number;
}
```

## Import order

Default imports first, then a blank line, then named/specific (`{ }`) imports.

```ts
import Phaser from "phaser";

import type { CharacterClass, Direction } from "@fantasy-grid/shared";
```

## No trailing commas

Omit the trailing comma after the last item in arrays, objects, parameter lists, etc.

```ts
const directions = ["up", "down", "left", "right"];

const player = {
  id: "1",
  displayName: "Alice"
}
```
