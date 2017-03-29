'use babel'
class PlatformHelper {
  getPlatformPath(platform,basePath){
    var result=basePath != undefined ? basePath : atom.project.getPaths()[0];
    if(platform === "android"){
      return result + "/platforms/android/assets/www";
    }else if(platform === "ios"){
      return result + "/platforms/ios/www";
    }else{
      console.error("getPlatformPath with unknown platform:" + platform);
      return undefined;
    }
    return result;
  }
  getAndroidAssetsPath(basePath){
    return this.getPlatformPath("android",basePath);
  }
  getiOSAssetsPath(basePath){
    return this.getPlatformPath("ios",basePath);
  }
}
const platformHelperRef=new PlatformHelper();
export default platformHelperRef;
