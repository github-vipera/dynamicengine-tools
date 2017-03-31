# cordova-de-debugger package

The official Dynamic Engine Tools plugin for Atom.

## Project management

### Installed plugin
 In this view you can see all installed plugin with version and relative link to github/gitlab repo. For uninstall a plugin, click to uninstall button.
 <img src="./images/InstalledPlugin.png">

 > NB: cordova-plugin-whitelist are a core security plugin installed by default (don't uninstall this).

### Install new plugin
 Provide a search in Cordova plugins Registry (https://cordova.apache.org/plugins/)
 filterable by Platforms. Every result record contains version, last update date and a button install for fast download and install


### Dynamic Engine Plugins
 Official Dynamic Engine plugins section. For download and install a plugin, verify your git account (required for gitlab access)
### Variants
 > Cordova doesn't provide an explicit variant support, but provide a flexible build system customizable with hook (https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/).
 For install variants support in your project, link variants_after_prepare.js and variants_before_prepare.js hooks in your config.xml (see de-core-plugin doc)

For create new variants, click to create new variant, insert your variant name and save it.
Now your variant could be appear in variant selector:

 <img src="./images/VariantSelector.png">

For every variant you can add preference (name-value pair) for every platform (Global section) or platform specific (Android, iOS or Browser)

<img src="./images/VariantScreen.png">

You can also modify variants definition manually (open and edit ./variants/variants_def.xml file)
```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<variants>

  <!-- define variant dev -->
  <variant name="dev">
    <!-- global preferences for dev-->
    <preference name="motif.serverUrl" value="http://192.168.7.68:8080"/>
    <preference name="motif.requestPath" value="/json"/>
    <preference name="motif.end2EndEncryption" value="true"/>
    <preference name="deTools.enableServerMock" value="true"/>
    <!-- platform-specific preferences for dev -->
    <platform name="android">
      <preference name="deTools.debuggerUrl" value="http://192.168.1.2:3000"/>
      <preference name="deTools.enableServerMock" value="true"/>
    </platform>
    <platform name="ios">
      <preference name="deTools.debuggerUrl" value="http://192.168.1.2:3001"/>
    </platform>
    <platform name="browser">
      <preference name="deTools.debuggerUrl" value="http://192.168.1.2:3001"/>
      <preference name="motif.end2EndEncryption" value="fale"/>
    </platform>
  </variant>

  <!-- define variant uat -->
  <variant name="uat">
    <platform name="android"/>
    <platform name="ios"/>
    <platform name="browser"/>
  </variant>

  <!-- define variant prod -->
  <variant name="prod">
    <platform name="android"/>
    <platform name="ios"/>
    <platform name="browser"/>
  </variant>
</variants>
```


## Push Tool
Development purpose only tools for send push notification to Android and iOS platform
### Configuration
<img src="./images/PushSettings.png">
APN configuration require PEM certificate, PEM key and Passphase.

See https://gitlab.vipera.com/dynamic-engine/de-plugins/wikis/how-to-setup-apple-apn-certificates-for-ios-push-notifications for more information

### Send a push
After configuration, use send push view for create and send your push notification
<img src="./images/SendPush.png">



## Run Configuration
 //TODO
### Platforms Section
 //TODO
### Remote server section
 //TODO
### Script Tool
