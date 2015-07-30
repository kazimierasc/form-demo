# Form Demo

This project contains a simple form demonstration that is implemented using PHP and Javascript.

## System requirements

In order to run this fullstack setup the following system requirements must be met:

* A LAMP/WAMP/MAMP stack

* Node.js with npm (for Grunt to work)

* Bower (to get a couple of packages)

* Grunt CLI (for an automated build process)

The following is optional:

* Composer

## Running things

1. **Set up the database** - there is a file in the root directory of the folder called *accommodation.sql*. You can use it to build the table required for this project.
2. **Fill out the constants** - the file constants template needs to contain the database details for your setup. Once you fill it out, rename it from *lib/constants_template.php* to *lib/constants.php*.

At that point the app/index.html can be served using your Apache setup.