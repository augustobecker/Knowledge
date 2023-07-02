NAME            = hello

SRCS            = hello.asm

OBJS            = ${SRCS:.asm=.o}

%.o:            %.asm
                nasm -f elf64 ${SRCS}

${NAME}:        ${OBJS}
                ld -s -o ${NAME} ${OBJS}

all:            ${NAME}

clean:
                rm -f ${OBJS}

fclean:         clean
                rm -f NAME

re:             fclean all

.PHONY:         all clean fclean re
