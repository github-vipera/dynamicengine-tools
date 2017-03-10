module.exports = {
    render: function() {
      return `
      <div class="send-push-panel" ui-view="push-tool-mainview">

        <div class="section">
          <div class="section-container">
              <h1 class="section-heading icon icon-comment">Send Push Notifications</h1>
          </div>
        </div>

        <div class="section">
          <div class='section-container'>
          <form>
             <ul class="flex-outer">
               <li>
                 <label for="alert">Platforms</label>
                 <div class='block'>
                     <div class='btn-group'>
                         <button class='btn selected push-platform-select' push-platform-select platform='android'><i class='fa fa-android' aria-hidden="true" style='padding-right:4px;'></i>Android</button>
                         <button class='btn platform-select' push-platform-select platform='ios'><i class='fa fa-apple' aria-hidden="true" style='padding-right:4px;'></i>iOS</button>
                         <!--
                         <button class='btn platform-select' id='platform-select-windows'><i class='fa fa-windows' aria-hidden="true" style='padding-right:4px;'></i>Windows</button>
                         <button class='btn platform-select' id='platform-select-blackberry'>Blackberry</button>
                         <button class='btn platform-select' id='platform-select-ubuntu'><i class='fa fa-linux' aria-hidden="true" style='padding-right:4px;'></i>Ubuntu</button>
                         <button class='btn platform-select' id='platform-select-firefox'><i class='fa fa-firefox' aria-hidden="true" style='padding-right:4px;'></i>Firefox OS</button>
                         <button class='btn platform-select' id='platform-select-macos'>Mac OS</button>
                         -->
                         <button class='btn platform-select' push-platform-select platform='browser'><i class='fa fa-chrome' aria-hidden="true" style='padding-right:4px;'></i>Browser</button>
                     </div>
                 </div>
               </li>

               <li>
                 <label for="alert">Alert</label>
                 <input class="input-text native-key-bindings" type="text" id="first-name" placeholder="Enter alert here">
               </li>
               <li>
                 <label for="topic">Topic</label>
                 <input class="input-text native-key-bindings" type="text" id="last-name" placeholder="Enter topic here">
               </li>
               <li>
                 <label for="title">Title</label>
                 <input class="input-text native-key-bindings" type="text" id="email" placeholder="Enter title here">
               </li>
               <li>
                 <label for="body">Body</label>
                 <input class="input-text native-key-bindings" type="text" id="phone" placeholder="Enter body here">
               </li>
               <li>
                 <label for="sound">Sound</label>
                 <input class="input-text native-key-bindings" type="text" id="phone" placeholder="Enter sound name here">
               </li>
               <li>
                 <label for="badge">Badge</label>
                 <input class="input-text native-key-bindings" type="text" id="phone" placeholder="Enter badge value here">
               </li>
               <li>
                 <label for="category">Category</label>
                 <input class="input-text native-key-bindings" type="text" id="phone" placeholder="Enter category here">
               </li>
               <li>
                 <label for="message">JSON Payload</label>
                 <textarea class='input-textarea native-key-bindings'  rows="6" id="message" placeholder="Enter JSON payload here"></textarea>
               </li>
               <li>
                  <button class="btn btn-success inline-block-tight" type="submit">Send notification</button>
              </li>
            </ul>


           </form>

          </div>
        </div>

      </div>
      `
    }

}
