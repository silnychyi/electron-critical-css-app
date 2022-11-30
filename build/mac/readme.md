if you have an error "Critical CSS Generator is damaged and can’t be opened", you should run 

```bash
xattr -d com.apple.quarantine /path/to/app.app
```

<hr>

if you have an error "Critical CSS Generator 2.app cannot be opened because the developer cannot be verified", you should do following: 

```
System Preferences -> Security & Privacy -> ‘Open Anyway’.
```

