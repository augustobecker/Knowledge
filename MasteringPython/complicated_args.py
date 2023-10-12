# args are stored as a tuple
# kwargs are stores as a dict
def complicated_function(x, y, *args, **kwargs):
    print(x, y, args, kwargs)
    print(f"args - (tuple) - {args}")
    print(f"kwargs - (dict) - {kwargs}")
    #accessing kwargs elements
    print(kwargs["is_valid"])
    print(kwargs["i"])
    print(kwargs["value"])

print("Passing complicated args to function *args and *kwargs")
print("args are stored as a tuple = (1, 2, 3) and kwargs are stores as a dict = {'i': 1, 'b': 10, 'value': 'b', 'is_valid': True}")

complicated_function(10, 12, 9, 8, 2, 3, 1, i = 1, b = 10, value = 'b', is_valid = True)

def difficult_function(x, y, z):
    print(x, y, z)

print()
print("Acessing elements via *[] and **[]")
difficult_function(*[22,12], 39)
difficult_function(**{"x": 12, "y": 31, "z": 1})

print()
print(" TUPLE ( ) | DICT { } | LIST [ ]")
print()
print("Acessing elements in tuple")
my_tuple = (10, 20, 30, 40, 50)
print(my_tuple)
print(my_tuple[1])

print("Acessing elements in dict")
my_dict = {'nome': 'João', 'idade': 30, 'cidade': 'São Paulo'}
print(my_dict)
print(my_dict['nome'])

print("Accessing elements in list")
my_list = ['João', 30, 'São Paulo']
print(my_list)
print(my_list[0])