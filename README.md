# traveler

"traveler" is a website project for presenting the multi-lingual experiments project in the Digital Poetics course.
The project demonstrates the dynamic transformation of the idions/setences from one initial language to other languages, with the maps automatically changing in the background.

### Setup

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

3. setup WebGL for Chrome in Ubuntu

	in Chrome, type chrome://gpu and chrome://flags to check the WebGL status

	install the graphics driver if there is none

	update the Chrome
	
	install the newest version of Ubuntu	
