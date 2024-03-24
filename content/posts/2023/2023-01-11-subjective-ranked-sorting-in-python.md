---
layout:    post
title:     "Subjective Ranked Sorting in Python"
date:      2023-01-11 21:30:00
categories: python, sort, programming
---
I was working on a project and ran into a problem where I had to rank a set of objects based on an subjective value. My initial thought was to use some sort of bracket system

![](/assets/images/2023/icecream-bracket.jpg)


But that doesn't fully sort out my values (Is "Vanilla" better than "Walnut"?), the next thought was writing a function to repeatedly loop through the list and compare 2 values in a round-robin sort of way. But then I realized I was just creating a sort function and we can use the existing python sort function with a slight modification to solve this

```python
import functools
ice_cream_flavors = ["Chocolate", "Vanilla", "Raspberry", "Walnut", "Strawberry"x]


def custom_sort(x, y):
    val = input(f"Which is better '{x}' or '{y}'?\n")
    if val == x:
        return 1
    elif val == y:
        return -1
    else:
        return custom_sort(x, y)


print(sorted(ice_cream_flavors, key=functools.cmp_to_key(custom_sort)))
```

![](/assets/images/2023/icecream-python.jpg)

By using the `functools.cmp_to_key` function we can create a custom comparator and ask the user (me) to decide which is better between 2 values. 

The one caveat to the method above is that I explicitly decided that no 2 values can be equal, if I were to replace that else statement with `return 0` it would work just fine, but would not necessarily have the definitive order I am looking for and allow values in the list to have the same subjective rating.

One other possible issue in this setup is that there's no way to determine *how much* one flavor is preferred over another, which might be a useful measurement and something I'll explore in a future post. 

