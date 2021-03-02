# kanned-bananas

We need "stocks and flows" of things (epics, stories, tasks, issues).

The "stocks view" is classic kanban. The "flows view" is missing, although things like velocity (etc) touch on it.

Use:

1. clone this repo: `git clone git@github.com:bugflow/kanned-bananas.git`
2. enter the project directory: `cd kanned-bananas`
3. make sure you have yarn installed: `npm install --global yarn`
4. install dependencies: `yarn install`
5. do `cp .env.example .env` then edit it
6. review example config file `example.kb.config.json` in the current directory
7. create a config file like `my_foo.kb.config.json`
8. `./run my_foo`
9. see how kb.config.json is a symbolic link to the my_foo file...

See these files:

- the project config is interpreted here `src/config/project-defaults.js`
- the verb-name magic needs these columns defined `src/states/columns/get-columns.js`
- and then the verb-name magic happens here `src/states/flows/get-flows.js`
- and also `src/states/stocks/get-stocks.js` has stock-naming magic
- `src/reports/format/label.js` hides the keyLabel magic (goals, epics, bug, UX, etc)
