
# List Comprehension

# Inicializa uma lista com valores dentro desse range
x = [i for i in range (10)]
print(f"New List : \t{x}")

# Inicializa uma lista com valores ao quadrado dentro desse range
squares = [x ** 2 for x in range(10)]
print(f"List Squares: \t{squares}")

# Inicializa uma lista com valores pares dentro desse range
evens = [i for i in range(20) if i % 2 == 0]
print(f"List even: \t{evens}")

# Inicializa uma lista com 5 listas internas vazias
array = [[] for i in range(5)]
print(f"List empty array: {array}")

# Inicializa uma 5 listas de 3 parametros
nested = [[x for x in range(3)] for i in range(5)]
print(f"List empty array: {nested}")