#!/bin/zsh

# drop imported collections used to make combined collections
mongosh qa \
  --eval 'db.questionimports.drop()'

mongosh qa \
  --eval 'db.answerimports.drop()'

mongosh qa \
  --eval 'db.answerphotoimports.drop()'

