webpack=./node_modules/.bin/webpack
eslint=./node_modules/.bin/eslint
build=./build
dist=./dist
package=app-`date +%Y-%m-%dT%H:%m:%S`.zip

build:
	$(webpack)

pack:
	mkdir $(dist)
	(cd $(build); zip -r ../$(dist)/$(package) *)

lint:
	$(eslint) ./src

clean:
	rm -rf $(build) $(dist)

.PHONY: lint build pack
