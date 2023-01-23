#ifndef SINGLETON_HPP
# define SINGLETON_HPP

#include <iostream>
#include <bits/stdc++.h>

class Singleton
{

	private:
   
		std::string _name;
		int			_age;
		bool		_is_working;
	 
		static Singleton* instancePtr;
   
		Singleton( void );
   
	public:
   
  		Singleton(const Singleton& obj)
		= delete;
 
  		static Singleton* getInstance( void );

  		void setValues( std::string name, int age, bool is_working );
		void setName( std::string name );

  		void print( void );

};

#endif