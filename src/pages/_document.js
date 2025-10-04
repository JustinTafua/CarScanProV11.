00:13:15.796 Running build in Washington, D.C., USA (East) – iad1
00:13:15.797 Build machine configuration: 2 cores, 8 GB
00:13:15.822 Cloning github.com/JustinTafua/CarScanProV11. (Branch: main, Commit: 8bf40af)
00:13:15.841 Skipping build cache, deployment was triggered without cache.
00:13:17.027 Cloning completed: 1.194s
00:13:17.414 Running "vercel build"
00:13:17.808 Vercel CLI 48.2.0
00:13:18.123 Installing dependencies...
00:13:33.222 
00:13:33.223 added 93 packages in 15s
00:13:33.223 
00:13:33.223 13 packages are looking for funding
00:13:33.224   run `npm fund` for details
00:13:33.266 Detected Next.js version: 14.0.0
00:13:33.269 Running "npm run build"
00:13:33.374 
00:13:33.375 > carscan-pro@12.0.0 build
00:13:33.375 > next build
00:13:33.375 
00:13:33.882 Attention: Next.js now collects completely anonymous telemetry regarding usage.
00:13:33.883 This information is used to shape Next.js' roadmap and prioritize features.
00:13:33.883 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
00:13:33.883 https://nextjs.org/telemetry
00:13:33.883 
00:13:33.970    Linting and checking validity of types ...
00:13:34.170    ▲ Next.js 14.0.0
00:13:34.172 
00:13:34.172    Creating an optimized production build ...
00:13:36.222 Failed to compile.
00:13:36.222 
00:13:36.222 ./src/pages/_document.js
00:13:36.222 Error: 
00:13:36.222   [31mx[0m Expected ';', '}' or <eof>
00:13:36.222     ,-[[36;1;4m/vercel/path0/src/pages/_document.js[0m:19:1]
00:13:36.222  [2m19[0m |             <Main/><NextScript/>
00:13:36.222  [2m20[0m |           </body>
00:13:36.223  [2m21[0m |         </Html>
00:13:36.223  [2m22[0m | [31;1m,[0m[31;1m-[0m[31;1m>[0m   );<link rel="preload" as="image" href="/mockup_stage1.png" />
00:13:36.223  [2m23[0m | [31;1m|[0m[31;1m-[0m[31;1m>[0m <link rel="preload" as="image" href="/mockup_stage2.png" />
00:13:36.223     : [31;1m`[0m[31;1m---[0m[33;1m      ^^^[0m
00:13:36.223     : [31;1m`[0m[31;1m---[0m[31;1m-[0m [31;1mThis is the expression part of an expression statement[0m
00:13:36.223  [2m24[0m |     <link rel="preload" as="image" href="/mockup_stage3.png" />
00:13:36.223  [2m25[0m |     <link rel="preload" as="image" href="/mockup_stage4.png" />
00:13:36.223  [2m26[0m |     }
00:13:36.223     `----
00:13:36.223 
00:13:36.223 Caused by:
00:13:36.223     Syntax Error
00:13:36.230 
00:13:36.231 
00:13:36.231 > Build failed because of webpack errors
00:13:36.258 Error: Command "npm run build" exited with 1