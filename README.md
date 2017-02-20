heart-scoped
============

This is a little express app that displays a heart. Users can click the heart and their click will be visible to other users based on their current path.


### Scoping

```
/ ("global": can see all pulses)
/foo ("foo": can see pulses in foo.*)
/foo/one ("foo.one": can see pulses in foo.one.*)
/bar/one ("bar.one": can see pulses in bar.one.*)
```

