# Galena Window 
A window size observer for [Galena](https://www.npmjs.com/package/@figliolia/galena) Apps

## Installation
```
npm i @figliolia/galena @figliolia/galena-window
# or
yarn add @figliolia/galena @figliolia/galena-window
```

## Basic Usage
```typescript
// WindowSize.ts
import { WindowManager } from "@figliolia/galena-window";

export const WindowSize = new WindowManager();

// Begin listening for changes to the window size
WindowSize.initialize();

// Listen for changes
WindowSize.subscribe(({ width, height }) => {
  // Your logic
})

// Clean up and remove listeners
WindowSize.destroy();
```

## Integrating With React Apps
### Installation
```bash
npm i @figliolia/react-galena
# or
yarn add @figliolia/react-galena
```
### Basc Usage
The when calling `new WindowManager()`, a `State` instance is returned. You can generate `useState` hooks using:

```typescript
// WindowSize.ts

import { WindowManager } from "@figliolia/galena-window";
import { createUseState } from "@figliolia/react-galena";

export const WindowSize = new WindowManager();
export const useWindowSize = createUseState(WindowSize);
```
You can also initialize and destroy your `WindowManager` instance in your root component:

```tsx
// App.tsx

import { memo } from "react";
import { useSetup } from "@figliolia/galena-window";
import { WindowSize, useWindowSize } from "./WindowState";

export const App = memo(function App() {
  // Initialize!
  useSetup(WindowSize);

  // Get the current window size
  const [width, height] = useWindowSize(({ width, height }) => [
    width, 
    height
  ]);

  return (
    <section style={{ width, height }}>
      <p>The Current Width: {width}</p>
      <p>The Current Height: {height}</p>
    </section>
  );
})
```