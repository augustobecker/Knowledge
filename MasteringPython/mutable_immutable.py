# mutable and immutable in python
# alguns tipos em python são imutáveis
# caso de str, int, float, bytes, bool, tuple 

# TUPLE - IMMUTABLE
print("Immutable types: str, int, float, bool, bytes, tuple")
x = {0, 1, 2}
y = x
print ("TUPLE | x: ", x, "\t| y: ", y, " *before changing x")
# essa alteração modifica apenas x, como deveria ser
# uma vez que tuples são immutable
x = {42, 3, 9}
print ("TUPLE | x: ", x, "\t| y: ", y, " *after changing ONLY x")

print()

# LIST - MUTABLE
print("Mutable types: list, set, dict")
x = [0, 1, 2]
y = x
print ("LIST  | x: ", x, "\t| y: ", y, " *before changing x")
# altera tanto x quanto y
# uma vez que lists são mutable
x[0] = 12
x[2] = 9
print ("LIST  | x: ", x, "\t| y: ", y, " *after changing ONLY x")
print("Assignment stores only a reference to the original object")

# FURTHER EXAMPLE
print()
print("Further example: Lists")

# function is not changing object
def get_largest_numbers(numbers, length):
    return sorted(numbers)[-length:]

# function using object method
def get_largest_numbers_in_list(numbers, length):
    numbers.sort()
    return numbers[-length:]

nbrs = [39, 3, 6, 42, 1, 101, 9, 11]

#original list
print(f"Original list: {nbrs}")

largest = get_largest_numbers(nbrs, 2)
print("The two largest numbers are ", largest)

# original list isn't sorted - function didn't change reference
print("Original list: {} (didn't change)".format(nbrs))

largest = get_largest_numbers_in_list(nbrs, 2)
print("The two largest numbers are ", largest)

# original list is sorted - function changed the reference
print("Original list: {} (changed)".format(nbrs))