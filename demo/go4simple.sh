#!/bin/bash

# Script used to produce number of html/json/xml files, which emulates behavior of go4 server
# Before running script, one should run Go4ExampleSimple analysis on the same machine 
# with http server on port 8090
# This script will create number of files, which could be later copied on the web server to demonstrate 
# functionality of THttpServer without need to run server itself. Of course, one should understand that
# objects content will not change on such static server

server=http://localhost:8090

tgtdir=~/web-docs/js/3.4/Go4ExampleSimple

# rm -rf index.htm h.xml h.json StreamerInfo Canvases Files

function gethfile {
   curl -s $1 | sed 's/\\\/go4sys/go4sys/g' | sed 's/\/jsrootsys/../g' | sed 's/\\\/rootsys\\\/icons/icons/g' > $2
}

#  par1 - 0 - only hierarchy, 1 - item, 2 - drawing, 3 - command
#  par2 - path

function grab {
   sedarg0='s/\/jsrootsys/..'
   sedarg='s/\\\/go4sys/'
   number=$(grep -o "\/" <<< "$2" | wc -l)
   for (( i=0; i<=$number; i++ ))
   do 
      sedarg0+='\/..'
      sedarg+='..\\\/'
   done
   sedarg+='go4sys/g'
   sedarg0+='/g'

   mkdir -p $2

   curl -s $server/$2/?nozip | sed $sedarg0 | sed $sedarg > $2/index.htm
   curl -s $server/$2/h.json | sed $sedarg > $2/h.json
   curl -s $server/$2/h.xml > $2/h.xml

   if [ "$1" == "0" ]; then return; fi 

   if [ "$1" == "1" ]; then  
      curl -s $server/$2/item.json | sed $sedarg > $2/item.json
      curl -s $server/$2/item.json.gz | sed $sedarg > $2/item.json.gz
      return
   fi 

   if [ "$1" == "3" ]; then  
      echo "1" > $2/cmd.json
      return
   fi 

   curl -s  $server/$2/root.json.gz?compact=3 > $2/root.json.gz
   curl -s $server/$2/root.bin.gz > $2/root.bin.gz
   if [ "$3" != "" ]; then 
      curl -s "$server/$2/root.png?w=600&h=400&opt=$3" > $2/root.png
   fi
   curl -s "$server/$2/exe.json?method=GetTitle" > $2/exe.json
   curl -s $server/$2/draw.htm?nozip | sed $sedarg0 | sed $sedarg > $2/draw.htm
}

mkdir temp
cd temp

mkdir go4sys
mkdir go4sys/html
mkdir go4sys/icons

wget -nv $server/go4sys/html/go4.js -O go4sys/html/go4.js
wget -nv $server/go4sys/html/go4.css -O go4sys/html/go4.css
wget -nv $server/go4sys/html/condition.js -O go4sys/html/condition.js
wget -nv $server/go4sys/html/condeditor.htm -O go4sys/html/condeditor.htm
wget -nv $server/go4sys/html/analysiseditor.js -O go4sys/html/analysiseditor.js
wget -nv $server/go4sys/html/analysiseditor.htm -O go4sys/html/analysiseditor.htm
wget -nv $server/go4sys/html/stepeditor.htm -O go4sys/html/stepeditor.htm
wget -nv $server/go4sys/html/pareditor.js -O go4sys/html/pareditor.js
wget -nv $server/go4sys/html/pareditor.htm -O go4sys/html/pareditor.htm
wget -nv $server/go4sys/icons/start.png -O go4sys/icons/start.png
wget -nv $server/go4sys/icons/restart.png -O go4sys/icons/restart.png
wget -nv $server/go4sys/icons/Stop.png -O go4sys/icons/Stop.png
wget -nv $server/go4sys/icons/clear.png -O go4sys/icons/clear.png
wget -nv $server/go4sys/icons/control.png -O go4sys/icons/control.png
wget -nv $server/go4sys/icons/go4logo2_small.png -O go4sys/icons/go4logo2_small.png

gethfile $server/index.htm?nozip index.htm
gethfile $server/h.xml h.xml
gethfile $server/h.json h.json

grab 0 Status
grab 1 Status/State
grab 1 Status/Message
grab 1 Status/DebugOutput
grab 2 Status/EventsRate ap
# grab 2 Status/Analysis
grab 3 Status/CmdClear
grab 3 Status/CmdStart
grab 3 Status/CmdStop
grab 3 Status/CmdRestart

grab 0 Histograms
grab 2 Histograms/Cr1Ch1x2 colz
grab 2 Histograms/His1 hist
grab 2 Histograms/His2 hist
grab 2 Histograms/His1g hist
grab 2 Histograms/His2g hist
grab 2 Histograms/His3 hist
grab 0 Histograms/Crate1
grab 0 Histograms/Crate2

grab 0 Parameters
grab 0 Conditions

grab 0 Events

# get streamer infos at the end - only than it will have full class list  
mkdir -p StreamerInfo; wget -nv $server/StreamerInfo/root.json.gz?compact=3 -O StreamerInfo/root.json.gz

# copy all files to web server
rm -rf $tgtdir
mkdir -p $tgtdir
cp -rf * $tgtdir

cd ..
rm -rf temp
cp .htaccess $tgtdir
