module.exports = {
    render: function() {
      return `

      <div class="plugins-settings-panel" ui-view="main">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">


      <div class="section">
        <div class="section-container">
            <div class="block">
              <h1 class="section-heading icon icon-shield inline-block">Android App Signing</h1>
              <div class='block'>
                <!-- <button class='btn icon icon-shield inline-block-tight' id="btn-refresh-ios-provisioning-profiles">Reload Provisioning Profiles</button> -->
                <button class='btn icon inline-block-tight' id="btn-refresh-ios-provisioning-revert-changes">Revert Changes</button>
                <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-refresh-ios-provisioning-save-changes">Save Changes</button>
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
                    <input class='input-text native-key-bindings' type='text' placeholder='keystore path' id="android-debug-keystore-path">
                    <button class="btn highlight">Browse...</button>
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Store Password (storepass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='store password' id="android-debug-store-password">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Alias</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='alias' id="android-debug-keystore-alias">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Password (keypass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='password' id="android-debug-key-password">
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
                    <input class='input-text native-key-bindings' type='text' placeholder='keystore path' id="android-release-keystore-path">
                    <button class="btn highlight">Browse...</button>
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Store Password (storepass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='store password' id="android-release-store-password">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Alias</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='alias' id="android-release-keystore-alias">
                  </div>

                  <div class='block'>
                    <label class="" style="font-size: 0.7em;">Password (keypass)</label>
                    <input class='input-text native-key-bindings' type='text' placeholder='password' id="android-release-key-pass">
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
