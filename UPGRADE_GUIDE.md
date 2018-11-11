# Upgrade Guide

### 1.0.x -> 2.0.0

#### `level` moved into node

The `level` is in node vm in 1.0.*. It has been moved into node since 2.0.0. You may use it in the slot like following:
```pug
Tree
  div(slot-scope="{data, store, level}") {{level}}
```
Change to:

```pug
Tree
  div(slot-scope="{data, store}") {{data.level}}
```
### 2.1.8 -> 2.2.0

#### `level` moved into node vm from node. `vm` add to slot props

```pug
Tree
  div(slot-scope="{data, store}") {{data.level}}
```
Change to:

```pug
Tree
  div(slot-scope="{data, store, vm}") {{vm.level}}
```
