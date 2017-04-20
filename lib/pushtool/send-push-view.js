module.exports = {
    render: function() {
      return `
      <div class="send-push-panel" ui-view="push-tool-mainview">
      <img class="va-white-logo" src="atom://dynamicengine-tools/resources/VA_white.png" style="position:absolute;opacity:0.05;bottom:4px;right:4px;height:110px;">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-comment">Send Push Notifications</h1>
              <div class='text-highlight'>This tool allows you to send notifications to a list of devices.</div>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>
          <form>
             <ul class="flex-outer">
               <li>
                 <label for="alert">Select a Platform</label>
                 <div class='block'>
                     <div class='btn-group'>
                         <button class='btn selected push-platform-select' push-platform-select platform='android' id='sel-platform-android'><i class='fa fa-android' aria-hidden="true" style='padding-right:4px;'></i>Android</button>
                         <button class='btn selected platform-select' push-platform-select platform='ios' id='sel-platform-ios'><i class='fa fa-apple' aria-hidden="true" style='padding-right:4px;'></i>iOS</button>
                     </div>
                 </div>
               </li>

               <li>
                 <label for="message">Recipients</label>
                 <textarea send-push-param class='input-textarea native-key-bindings' rows="3" id="push-val-recipients" placeholder="Enter a list of client tokens comma separated"></textarea>
               </li>

               <li>
                 <label for="alert">Alert</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-alert" placeholder="Enter alert here">
               </li>
               <li>
                 <label for="topic">Topic</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-topic" placeholder="Enter topic here">
               </li>
               <li>
                 <label for="title">Title</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-title" placeholder="Enter title here">
               </li>
               <li>
                 <label for="body">Body</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-body" placeholder="Enter body here">
               </li>
               <li>
                 <label for="sound">Sound</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-sound" placeholder="Enter sound name here">
               </li>
               <li>
                 <label for="badge">Badge</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-badge" placeholder="Enter badge value here">
               </li>
               <li>
                 <label for="category">Category</label>
                 <input send-push-param class="input-text native-key-bindings" type="text" id="push-val-category" placeholder="Enter category here">
               </li>
               <li>
                 <label for="message">JSON Payload</label>
                 <textarea send-push-param class='input-textarea native-key-bindings'  rows="6" id="push-val-payload" placeholder="Enter JSON payload here"></textarea>
               </li>
               <li>
                <div>
                  <div class='btn-toolbar style="left:0px;position:block;'>
                     <div class='btn-group'>
                     <button class="btn inline-block-tight" type="submit" id="clear-send-push-form">Clear data</button>
                     <button class="btn btn-success inline-block-tight" type="submit" id="send-push-btn">Send notification</button>
                     </div>
                  </div>
                </div>
              </li>
            </ul>


           </form>

          </div>
        </div>

      </div>
      `
    }

}
