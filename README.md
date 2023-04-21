## Critical CSS Generator

Desktop app that generates critical css based on url provided

Download:\
[Mac ARM](https://github.com/silnychyi/electron-critical-css-app/blob/master/build/mac/Critical%20CSS%20Generator-darwin-arm64-1.0.0.zip)\
[Mac Intel](https://github.com/silnychyi/electron-critical-css-app/blob/master/build/mac/Critical%20CSS%20Generator-darwin-x64-1.0.0.zip)


### Troubleshoots

if you have an error "Critical CSS Generator is damaged and can’t be opened", you should run 

```bash
xattr -d com.apple.quarantine /path/to/app.app
```

<hr>

if you have an error "Critical CSS Generator.app cannot be opened because the developer cannot be verified", you should do following: 

```
System Preferences -> Security & Privacy -> ‘Open Anyway’.
```
