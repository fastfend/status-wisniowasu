#!/bin/sh
echo "========================="
echo "Sending to production server"
echo "========================="
echo "Script made by: Piotr Stadnicki"
echo "email: pitstadnicki@gmail.com"
echo "github: fastfend"
echo "========================="
echo "Branch:"
echo $TRAVIS_BRANCH
echo "========================="
if [[ $TRAVIS_PULL_REQUEST == false ]]
then
    if [[ $TRAVIS_BRANCH == "master" ]] || [[ $TRAVIS_BRANCH == "development" ]]
    then
        echo "Listing files:"
        ls -la
        echo "========================="
        echo "Packing files..."
        cd public/ && tar -zcvf ../build.tar.gz . && cd - 
        echo "========================="
        echo "Sending files..."
        jo key=$KEY branch=$TRAVIS_BRANCH build=%build.tar.gz | curl -H "Content-Type:application/json" -X POST -d @- $HOOK
    else
        echo "Nothing to do..."
    fi
else
echo "It is pull request doing nothing..."
fi