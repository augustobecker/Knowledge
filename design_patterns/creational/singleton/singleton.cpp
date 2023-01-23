#include "singleton.hpp"

Singleton::Singleton( void )
{
	std::cout << "Singleton was created" << std::endl << std::endl;
}

Singleton* Singleton::getInstance()
{
	if (instancePtr == NULL)
		instancePtr = new Singleton();
	return (instancePtr);
}
 
void Singleton::setValues( std::string name, int age, bool is_working )
{
	this->_name = name;
	this->_age = age;
	this->_is_working = is_working;
}

void Singleton::setName( std::string name )
{
	this->_name = name;
}

void Singleton::print( void )
{
	std::cout << "Singleton Data" << std::endl;
	std::cout << "\t";
	std::cout << "name: " << _name << std::endl;
	std::cout << "\t";
	std::cout << "age: " << _age << std::endl;
	std::cout << "\t";
	std::cout << "is working?: ";
	if (_age)
		std::cout << "yes ";
	else
		std::cout << "no ";
	std::cout << std::endl;
	std::cout << std::endl;
}
