module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;bottom:4px;right:4px;height:110px;">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-shield inline-block">Android App Signing</h1>
              <div class='block'>
                <button class='btn icon inline-block-tight' id="btn-refresh-android-signing">Revert Changes</button>
                <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-save-signing-changes">Save Changes</button>
              </div>
            </div>
        </div>
      </div>

      <div class="section  settings-view">
        <div class='section-container' style="max-width: none;">

            <div>
              <div class='container package-container' style="padding-top:20px;">
                <div class='package-card col-lg-8'>
                  <h3 style="margin-top: 0px;">Debug</h3>

                  <div class='block keystore-block'>
                    <label class="" style="font-size: 0.7em;">Keystore</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='keystore path' id="android-keystore-path-debug">
                    <button class="btn highlight" set-keystore-path-for="debug">Browse...</button>
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Store Password (storepass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='store password' id="android-store-password-debug">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Alias</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='alias' id="android-keystore-alias-debug">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Password (keypass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='password' id="android-key-pass-debug">
                  </div>

                </div>
              </div>
            </div>


            <div>
              <div class='container package-container' style="padding-top:20px;">
                <div class='package-card'>
                <h3 style="margin-top: 0px;">Release</h3>
                  <div class='block keystore-block'>
                    <label class="" style="font-size: 0.7em;">Keystore</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='keystore path' id="android-keystore-path-release">
                    <button class="btn highlight" set-keystore-path-for="release">Browse...</button>
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Store Password (storepass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='store password' id="android-store-password-release">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Alias</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='alias' id="android-keystore-alias-release">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Password (keypass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='password' id="android-key-pass-release">
                  </div>

                </div>
              </div>
            </div>

        </div>
      </div>

      </div>
      `
    }
}
