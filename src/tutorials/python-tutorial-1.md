## Python

This is some python code probably 
```python 
def whatDoIDo(n):
    if n == 0 or n == 1:
        return n
    return whatDoIDo(n-1) + whatDoIDo(n-2)
```