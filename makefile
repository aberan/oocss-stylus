DATE=$(shell date +%I:%M%p)
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
CHECK=\033[32m✔\033[39m
BUILDDIR=deploy
DEVDIR = build

#
# BUILD DOCS
#

build: clean
	@echo "Building project"
	@node tools/build
	@echo "${HR}\n"
	@echo "NXNW Build                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@grunt stylus
	@echo "Authprefixing css"
	@grunt autoprefixer
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

production: pclean
	@echo "Deploying production code"
	@node tools/deploy
	@echo "${HR}\n"
	@echo "NXNW Deploy                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@echo "minifying js"
	@r.js -o app.build-deploy.js
	@echo copying over minified main.js
	@mv ${BUILDDIR}/components/tmp/main.js ${BUILDDIR}/components
	@mv ${BUILDDIR}/components/tmp/app.js ${BUILDDIR}/components
	@rm -rf ${BUILDDIR}/components/tmp
	@echo "minifying css/bower components"
	@grunt min --env=deploy


devpush: pclean
	@echo "Deploying dev code"
	@node tools/push
	@echo "${HR}\n"
	@echo "NXNW Deploy                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"
	@echo "adding Modernizr classes"
	@grunt modjs --env=deploy

#
# START BUILD AND WATCH
#

bw: build watch

dw: dev watchdev

pw: devpush watchpush

prod: production

push: devpush


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
	@echo "${HR}"
	@echo "Init Vagrant"
	@cd vagrant; vagrant up; vagrant box update;

#
# CLEAN THE BUILD DIRECTORY
#

clean:
	@rm -rf ${DEVDIR}
	@mkdir ${DEVDIR}
	@echo "${HR}"
	@echo "NXNW Clean                                 ${CHECK} Done - ${DATE}"
	@echo "${HR}"

pclean:
	@rm -rf ${BUILDDIR}/components
	@rm -rf ${BUILDDIR}/css
	@rm -rf ${BUILDDIR}/img
	@mkdir ${BUILDDIR}/components
	@mkdir ${BUILDDIR}/components/tmp
	@mkdir ${BUILDDIR}/components/tmp/bower
	@mkdir ${BUILDDIR}/css
	@mkdir ${BUILDDIR}/img
	@echo "${HR}"
	@echo "NXNW Deploy Clean                                 ${CHECK} Done - ${DATE}"
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

watchpush:
	@echo "${HR}"
	@echo "Start project watch..."
	@node tools/deploy-watch
