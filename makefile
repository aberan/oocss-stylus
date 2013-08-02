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

#
# START BUILD AND WATCH
#

bw: build watch


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

init:
	@echo "${HR}"
	@echo "INSTALL NEEDED TOOLS FOR BUILD"
	@echo "THIS COMMAND MUST BE LAUNCHED IN ROOT MODE"
	@echo "${HR}"
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools; npm install; npm install stylus


#
# CLEAN THE BUILD DIRECTORY
#

clean:
#	@cd /vagrant
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
