import 'dart:math';

randomSortObject(myObject) {
  var entries = myObject.entries.toList();
  entries.shuffle(Random());
  return Map.fromEntries(entries);
}
