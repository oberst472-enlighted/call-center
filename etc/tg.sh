#!/bin/bash

TOKEN="782104901:AAEaWwN4M7PxT3s2O9W3DmcAAMxwtVp_3rA"
CHAT_ID="-263138756"
MESSAGE=$1
URL="https://api.telegram.org/bot$TOKEN/sendMessage"

curl -s -X POST $URL -d chat_id=$CHAT_ID -d parse_mode=html text="$MESSAGE"