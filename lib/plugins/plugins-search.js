'use babel'
import $ from 'JQuery'
import _ from 'lodash'
import http from 'http'
import httpReq from 'request';

export default class PluginsSearch {

  constructor() {
    console.log("creating PluginsSearch");
    this.pluginsData = {};
  }

  buildQueryParamsString(names,keywords,platforms){
    var ret = "";

    if (keywords && keywords.length>0){
      for (i=0;i<keywords.length;i++){
        if (ret.length>0){
          ret += "+OR+";
        }
        ret += "keywords:" + keywords[i];
      }
    }

    //the platforms are keywords
    if (platforms && platforms.length>0){
      for (i=0;i<platforms.length;i++){
        if (ret.length>0){
          ret += "+OR+";
        }
        ret += "keywords:" + platforms[i];
      }
    }

    if (names && names.length>0){
      for (i=0;i<names.length;i++){
        if (ret.length>0){
          ret += "+OR+";
        }
        ret += "name:*" + names[i] +"*";
      }
    }

    //Limit to Cordova
    if (ret.length>0){
      ret += "+AND+";
    }
    ret += 'keywords:"ecosystem:cordova"';

    if (ret.length>0){
      ret = "&q=" + ret;
    }
    return ret;
  }

  search(names,keywords,platforms,callback){
    var that = this;
    var baseQueryUrl = 'http://npmsearch.com/query?fields=name,keywords,license,description,author,modified,homepage,version,rating&sort=rating:desc&size=500&start=0';
    var queryParams = this.buildQueryParamsString(names, keywords, platforms);
    console.log("Query:" + queryParams);
    var queryUrl = baseQueryUrl + queryParams; //'q=keywords:camera+AND+author:neuber';
    console.log("QueryURL:" + queryUrl);
    httpReq(queryUrl, function (error, response, body) {
      if (callback){
        callback(error, JSON.parse(body));
      }
    });
    //q	keywords:"ecosystem:cordova"
    //http://npmsearch.com/query?fields=name,keywords,license,description,author,modified,homepage,version,rating&size=10&q=keywords:camera+AND+author:neuber
  }
}
