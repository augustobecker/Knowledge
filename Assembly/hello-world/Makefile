NAME            = hello

SRCS            = hello.asm

OBJS            = ${SRCS:.asm=.o}

GREEN           = \033[0;32m
RED             = \033[0;31m
RESET           = \033[0m

%.o:            %.asm
                nasm -f elf64 ${SRCS}
                @echo "${NAME}: ${GREEN}${OBJS} was generated${RESET}"

${NAME}:        ${OBJS}
                ld -s -o ${NAME} ${OBJS}
                @echo "${NAME}: ${GREEN}${NAME} was generated${RESET}"

all:            ${NAME}

clean:
                rm -f ${OBJS}
                @echo "${NAME}: ${RED}Objects were destroyed${RESET}"

fclean:         clean
                rm -f ${NAME}
                @echo "${NAME}: ${RED}${NAME} was destroyed${RESET}"

re:             fclean all

.PHONY:         all clean fclean re
