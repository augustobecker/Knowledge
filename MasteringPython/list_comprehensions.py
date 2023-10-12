
# List Comprehension

# Inicializa uma lista com valores dentro desse range
x = [item for item in range (10)]
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

# Transforma uma lista cheia de argumentos separados em pequenas listas numa única grande lista
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flattened = [item for sublist in nested_list for item in sublist]
print(f"Flattened list: {flattened}")

# Itera por strings aplicando um método sobre elas
sentence = "a palavra não precisa necessariamente ser word, é uma variavel de sua escolha"
word_lengths = [len(word) for word in sentence.split()]
print(f"Word lengths: {word_lengths}")

sentence = "Nesse caso, itera pela resposta da function split, utilizando o metodo upper em cada string."
words_upper = [word.upper() for word in sentence.split()]
print(f"Uppercase words: {words_upper}")
