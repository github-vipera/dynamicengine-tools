'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import Logger from '../logger/Logger'

const trivialdb = require('trivialdb');
var fs = require('fs');
var {allowUnsafeEval, allowUnsafeNewFunction} = require('loophole');
var chokidar = require('chokidar');

export default class DEToolsProject {

  constructor() {
    console.log("creating DEToolsProject");

    this.path = atom.project.getPaths()[0];
    this.projectFileName = this.path + "/.detools.project";

    //this.ns = trivialdb.ns('projectns', { dbPath: this.projectFileName });

    this.db = trivialdb.db('projectdb', { loadFromDisk: true, rootPath: this.projectFileName, prettyPrint:true });

  }

  load(){
    return this.db.reload();
  }

  getDB(){
    return this.db;
  }

  get(key){
    return this.db.get(key);
  }

  save(key, value){
    return this.db.save(key, value);
  }

}
