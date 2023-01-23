#include "singleton.hpp"

Singleton* Singleton ::instancePtr = NULL;
 
void    change_name( std::string name );

int main( void )
{
	Singleton* data = Singleton ::getInstance();
    Singleton* info = Singleton ::getInstance();
	 
	data->setValues("Augusto", 21, false);
	data->print();
	std::cout << "Address of first Instance: " << data << std::endl << std::endl;
	info->setValues("Becker", 22, true);
	info->print();
	std::cout << "Address of second Instance " << info << std::endl << std::endl;
    data->print();
    data->setValues("Lima", 26, true);
    info->print();
    change_name("Emanuel");
    data->print();
	return (0);
}

void    change_name( std::string name )
{
    Singleton* function_instance = Singleton ::getInstance();

    function_instance->setName(name);
}