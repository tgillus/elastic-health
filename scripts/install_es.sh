#!/bin/bash

PROJECT_DIR=`pwd`

ES_DIR=${PROJECT_DIR}/elasticsearch

ES_TAR=elasticsearch-7.0.1-darwin-x86_64.tar.gz
ES_INSTALL=${ES_DIR}/elasticsearch-7.0.1

KIBANA_TAR=kibana-7.0.1-darwin-x86_64.tar.gz
KIBANA_INSTALL=${ES_DIR}/kibana

if [ ! -d ${PROJECT_DIR}/elasticsearch ]; then
  mkdir ${PROJECT_DIR}/elasticsearch
fi

if [ ! -d ${ES_INSTALL} ]; then
  cd ${ES_DIR}
  curl -o ${ES_TAR} https://artifacts.elastic.co/downloads/elasticsearch/${ES_TAR}
  tar zxvf ${ES_TAR}
  rm ${ES_TAR}
fi

if [ ! -d ${KIBANA_INSTALL} ]; then
  cd ${ES_DIR}
  curl -o ${KIBANA_TAR} https://artifacts.elastic.co/downloads/kibana/${KIBANA_TAR}
  tar zxvf ${KIBANA_TAR}
  rm ${KIBANA_TAR}
fi
