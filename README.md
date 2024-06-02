# Final Form Mutator tree mutation

src/reParent.ts is the main show here.  
Feel free to lift both it and functions.ts straight into your project as I'm too lazy to publish my own npm package for this

Illustrates how to use form mutators to shift things around in a tree structure such that RFF is happy with its calculated state and subscribers etc.

For most other operations within a tree arrayMutators on the nodes properties are sufficient, this one is special because of its ability to reach far across the structure such that passing array mutator references around would be nightmarish
