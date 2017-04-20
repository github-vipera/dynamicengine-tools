module.exports = {
    render: function() {
      return `
      <div class="push-settings-panel" ui-view="push-tool-mainview">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-gear">Push Settings</h1>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>
            <div id='push-config-container'></div>

            <form>
              <h2>Apple APN</h2>
               <ul class="flex-outer">
               <li>
                 <label for="alert">PEM Cert. Path</label>
                 <input push-config-param class="input-text native-key-bindings" type="text" id="push-settings-apn-pempath" placeholder="Enter .pem certificate path here">
                 <button class='inline-block btn highlight' id='vipera-tools-push-pemcert-choose' style="margin-top:4px;margin-bottom:4px;width: 70px;margin-left:4px;">Browse...</button>
               </li>
               <li>
                 <label for="topic">PEM Key Path</label>
                 <input push-config-param class="input-text native-key-bindings" type="text" id="push-settings-apn-keypath" placeholder="Enter .pem key path here">
                 <button class='inline-block btn highlight' id='vipera-tools-push-pemkey-choose' style="margin-top:4px;margin-bottom:4px;width: 70px;margin-left:4px;">Browse...</button>
               </li>
               <li>
                 <label for="title">Passphrase</label>
                 <input push-config-param class="input-text native-key-bindings" type="password" id="push-settings-apn-passphrase" placeholder="Enter passphrase here">
               </li>
                </ul>
            </form>

            <hr class="form-divider" width="100%" size="1" style="border-top: 1px solid #606060;"></hr>

            <form>
              <h2>Google GCM</h2>
               <ul class="flex-outer">
               <li>
                 <label for="gcm-api-key">API Key</label>
                 <input push-config-param class="input-text native-key-bindings" type="text" id="push-settings-gmc-apikey" placeholder="Enter GCM API key here">
               </li>
            </form>

            </div>
          </div>
        </div>

      </div>
      `
    }

}
