.PHONY: zip clean

zip:
	git ls-files|zip -@ build.zip

clean:
	rm build.zip
