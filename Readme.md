Artillery Game
==============

A simple artillery game implemented in JavaScript.

<img src="Screenshot.png" />


Building
--------

Make sure that the TypeScript compiler "tsc" is installed.  If not, it
may be necessary to install the nodejs package first, then use the npm
command to install tsc.  On Debian-based Linux systems, that can be done
by running these commands:

	sudo apt install nodejs
	sudo npm install -g tsc

This repository depends on the This Could Be Better Game Framework,
incorporated as a Git submodule.  Getting this submodule can be done by
cloning the repository with the --recursive switch, like this:

	git clone --recursive https://github.com/thiscouldbebetter/AsteroidsGame

Or, if the clone has already been performed non-recursively,
the submodule can be loaded by switching to the Framework directory and
running this command:

	git submodule update --init

To compile, run the command "tsc" from within the Source directory.


Running
-------

Open Source/ArtilleryGame.html in a web browser that runs JavaScript.
