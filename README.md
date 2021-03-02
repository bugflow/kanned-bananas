# kanned-bananas

We need "stocks and flows" of things (epics, stories, tasks, issues).

the "stocks view" is classic kanban. The "flows view" is missing, although things like velocity (etc) touch on it.

Use:

1. do `.env.example .env` then edit it
2. review example config file `example.kb.config.json`
3. create a config file like `my_foo.kb.config.json`
4. `./run my_foo`
5. see how kb.config.json is a symbolic link to the my_foo file...

See these files:

* the project config is interpreted here `src/config/project-defaults.js`
* the verb-name magic needs these columns defined `src/states/columns/get-columns.js`
* and then the verb-name magic happens here `src/states/flows/get-flows.js`
* and also `src/states/stocks/get-stocks.js` has stock-naming magic
* `src/reports/format/label.js` hides the keyLabel magic (goals, epics, bug, UX, etc)
