# traveler

traveler is a website project for presenting the project for Digital Poetics course.

1. install Apache2 server on Ubuntu

	$: sudo apt-get install apache2

	see this webpage https://help.ubuntu.com/lts/serverguide/httpd.html for full instructions on installation and settings

2. setup the root directory of the website
	
	$: cd /etc/apache2
	
	edit /etc/apache2/sites-avaliable/default by changing the DocumentRoot and Directory to public_html/
	
	restart the apache2 server
	
	$: sudo service apache2 restart
	
	Or 

	$: cd /etc/apache2
	
	edit /etc/apache2/sites-available/000-default.conf
	
	edit /etc/apache2/apache2.conf
