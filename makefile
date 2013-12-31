DATE=$(shell date +%I:%M%p)
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
CHECK=\033[32m✔\033[39m
BUILDDIR=build

#
# BUILD DOCS
#

build: clean
	@echo "Building project"
	@node tools/build
	@echo "${HR}\n"
	@echo "NXNW Build                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@echo "exec grunt [autoprefixer]"
	@grunt
	@echo "minifying modernizr and bower components"
	@grunt dev
	@echo "requirejs optimizing main.js with uglify2 - concat only, no minifying"
	@r.js -o app.build.js

dev: clean
	@echo "Building project without minifying"
	@node tools/build
	@echo "${HR}\n"
	@echo "NXNW Build                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@echo "exec grunt [autoprefixer]"
	@grunt
	@echo "minifying modernizr and bower components"
	@grunt dev
	@echo "requirejs optimizing main.js - concat only, no minifying"
	@r.js -o app.build-watch.js

production:
	@echo "Deploying project"
	@node tools/build
	@echo "${HR}\n"
	@echo "NXNW Build                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@echo "exec grunt [autoprefixer]"
	@grunt
	@echo "minifying css/bower components"
	@grunt min
	@echo "minifying js"
	@r.js -o app.build-prod.js

#
# START BUILD AND WATCH
#

bw: build watch

dw: dev watchdev

prod: clean production


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

init:
	@echo "${HR}"
	@echo "INSTALL NEEDED TOOLS FOR BUILD"
	@echo "${HR}"
	@echo "Loading Bower components"
	@bower install
	@echo "${HR}"
	@echo "Initialize grunt packages"
	@echo "${HR}"
	@npm install grunt
	@npm install grunt-autoprefixer
	@npm install grunt-contrib-cssmin
	@npm install grunt-contrib-handlebars
	@npm install grunt-contrib-stylus
	@npm install grunt-contrib-uglify
	@npm install grunt-modernizr
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools; npm install;


#
# CLEAN THE BUILD DIRECTORY
#

clean:
	@node tools/clean
	@echo "${HR}"
	@echo "NXNW Clean                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"


#
# INIT WATCH FOR PROJECT DIR
#

watch:
	@echo "${HR}"
	@echo "Start project watch..."
	@node tools/watch

watchdev:
	@echo "${HR}"
	@echo "Start project watch..."
	@node tools/dev