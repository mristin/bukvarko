Bukvarko
========
Bukvarko helps your kids learn the alphabet in a fun way.

My son started learning how to read and write so I created this simple game
to make the task easier for him. Different animals are shown as "questions" and 
you need to type in the animal name. You get a star for each correct answer. 
If you are unsure about what you wrote, you can have the computer read it out for you.

To avoid confusing the user, I hard-wired the language to Bosnian/Croatian/Serbian
since this is the language in which my family primarily reads and writes.

![screenshot](https://raw.githubusercontent.com/mristin/bukvarko/master/screenshot.png)

Bug reports, feature suggestions *etc.* are highly welcome. Please create 
[an issue](https://github.com/mristin/bukvarko/issues/new). 

Development
-----------

Clone and install dependencies:

```bash
git clone https://github.com/mristin/bukvarko.git
cd bukvarko
npm install
```

Start a development server:

```bash
npm run start
```

Format the code:

```bash
npm run format
```

Build for production:

```bash
npm run build
```

The current code is just a prototype implemented on a very tight 
time budget (~2x4 hours) so I designed by contract and tested only manually.
The automatic tests will be added once (and if) the game concept matures.
