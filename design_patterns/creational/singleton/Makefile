NAME			= Singleton

COMPILER		= g++

FILES			= main.cpp		\
				singleton.cpp

GREEN			= \033[0;32m
RED				= \033[0;31m
RESET			= \033[0m

all:			${NAME}

${NAME}:
				${COMPILER} -o ${NAME} ${FILES}
				@echo "${NAME}: ${GREEN}${NAME} was generated${RESET}\n"

clean:
				rm -f ${NAME}
				@echo "${NAME}: ${RED}${NAME} was destroyed ${RESET}\n"

fclean:			clean

re:				clean all

.PHONY:			all clean fclean re