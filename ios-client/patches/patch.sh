#!/bin/bash

# This applies a patch to fix RN 27. Delete when trouble is over
cp patches/RN-27.patch node_modules/react-native/Libraries/CustomComponents/NavigationExperimental/NavigationCard.js
cp patches/RN-27a.patch node_modules/react-native/Libraries/Experimental/SwipeableRow/SwipeableRow.js
