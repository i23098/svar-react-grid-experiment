# svar-react-grid-experiment
Attempt to use @svar-ui/react-grid

## Build
`./gradlew build`

Will generate files into `build/dist`, open `index.html` in browser to see the result

## Issue

The table was not rendered properly! Raised question in SVAR Forum - https://forum.svar.dev/d/231-table-not-rendered-properly-react

![Table badly rendered](https://github.com/i23098/svar-react-grid-experiment/blob/main/tableRendered.png?raw=true)

## The Fix

The fix is using `require` instead of `import`... Don't know why, but it works :)

```diff
diff --git a/src/react-js/tableExperiment.tsx b/src/react-js/tableExperiment.tsx
index 542a720..b2d3fe6 100644
--- a/src/react-js/tableExperiment.tsx
+++ b/src/react-js/tableExperiment.tsx
@@ -1,7 +1,7 @@
 import React from "react";
 
 import { Grid, Willow } from "@svar-ui/react-grid";
-import "@svar-ui/react-grid/all.css";
+require('@svar-ui/react-grid/all.css');
 
 import type { IColumnConfig, IRow } from "@svar-ui/react-grid";
 ```
