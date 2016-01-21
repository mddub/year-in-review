# year-in-review

A minimal visualization of the past year as a list of lists.

## Requirements

Python 2.6+ and [PyYAML][install-pyyaml].

## Basic use

1. Create a file `data/summary.yaml` which looks like this:

  ```
  - Category One:
    - (jan 22) Did a thing
    - (sep 3) Did another thing
    - (oct 1) Early October thing
    - (oct 30) Late October thing

  - Category Two:
    - (feb 29) Leap day party
    - "(apr 1) Don't forget: follow YAML rules to use symbols like \":\""
  ```

2. Run `make` from the command line, then open `year.html` in a browser. You should see a page like this:

  ![](http://i.imgur.com/vUITtXq.png)

  The count and activity graph in the top-right of each category are automatically generated. You can toggle between "boxes" and "table" view:

  ![](http://i.imgur.com/t7jLpRl.png)

3. (Optional) Set `make` to run automatically while you edit the YAML file. Use one of [these methods][watch-make], or, if you have Ruby and `watchr` installed, run `watchr automake.rb`.

## Additional pages

The YAML-and-make process above provides an easy-ish way to create content by hand. The YAML file is converted to JSON to represent the "summary" page. Optionally, for additional pages, you can programatically generate JSON in the same format using other data sources (git commits, calendar entries, etc.). For each additional page, create a JS file which adds a new key to `window.Review`, then include it:

In `data/commits.js`:
```js
window.Review.commits = [
    {
        "title": "repo one",
        "entries": ["(mar 9) Initial commit", "(jul 4) Refactor everything"],
    },
    // and/or:
    {
        "title": "repo two, in a different format",
        "entries": [{"time": "Jan 6", "event": "First commit"}, {"time": "May 9": "Last commit"}],
    },
    // ...
];
```

In `year.html`:
```html
<script src="data/commits.js"></script>
```

A link to the "commits" page will appear at the top, next to "summary".

## Notes

I wrote this code quickly, a long time ago, and have looked at it about once a year since then.

[install-pyyaml]: http://stackoverflow.com/questions/14261614/how-do-i-install-the-yaml-package-for-python
[watch-make]: http://stackoverflow.com/questions/7539563/is-there-a-smarter-alternative-to-watch-make
