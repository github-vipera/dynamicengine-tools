module.exports = {
    render: function() {
      return `
      <div class="push-settings-panel" ui-view="push-tool-mainview">

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
               </li>
               <li>
                 <label for="topic">PEM Key Path</label>
                 <input push-config-param class="input-text native-key-bindings" type="text" id="push-settings-apn-keypath" placeholder="Enter .pem key path here">
               </li>
               <li>
                 <label for="title">Passphrase</label>
                 <input push-config-param class="input-text native-key-bindings" type="password" id="push-settings-apn-passphrase" placeholder="Enter passphrase here">
               </li>
                </ul>
            </form>

            </div>
          </div>
        </div>

      </div>
      `
    }

}
