# BitBucket to editor

This google-chrome extension simple adds shortcut to open reviewed file from Attlasian BitBucket (Stash) into your favorite IDE.

## Install

Will be available in chrome extension store soon ..

## Configuration

### Editor protocol

**BitBucket to IDE** uses chrome **custom protocol handler** to open your ide.
In practice that means that the extension opens special url like `editon://open?file=test.js&line=21`
and the rest of work belongs to browser.

But browser must be configured to understand this special protocol and to know how that works.

#### macOS

Most of popular IDEs already accepts their own application protocol, so you must just choose one from the following list and copy into Configuration.

- *idea* - `pycharm://open?file=%file%&line=%line%`
- *textmate* - `txmt://open/?url=file://%file%&line=%line%`
- *macwin* - `mvim://open?url=file:///%file%&line=%line%`

otherwise you will need to write your own url, so remember to use following keys
- `%file%` - will be replaced for absolute path to file
- `%line%` - will be replaced for line numbeer

example: `myprotocol://open?f=%file%&l=%line%` will be compiled to run something like this: `myprotocol://open?f=/Users/John/web/assets/test.js&l=124`

#### Windows / Linux

At Nette framework documentation pages there is pretty complete howto register custom protocol handlers
see https://pla.nette.org/cs/jak-otevrit-soubor-z-debuggeru-v-editoru (translated: https://translate.google.cz/translate?hl=cs&sl=cs&tl=en&u=https%3A%2F%2Fpla.nette.org%2Fcs%2Fjak-otevrit-soubor-z-debuggeru-v-editoru)ů
