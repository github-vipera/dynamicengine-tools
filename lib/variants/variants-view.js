module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class='block icon icon-versions'>
            <h1 style="display: inline">Variants</h1>
          </div>
          <div class='block'>
            <button class='btn icon icon-plus inline-block-tight' id="btn-add-variant">Create Variant</button>
            <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-save">Save</button>
            <button class='btn btn-error icon icon-x inline-block-tight' id="btn-delete-variant">Delete</button>
          </div>
          <h2>Select variants:</h2>
          <div class='block' id="variants-selector-container">

          </div>

        </div>

        <div class="section main-section" id="main-section">

        </div>

      </div>


      <script id="no-entry-template" type="text/x-handlebars-template">
        <div class='block'>
          <h1 style="display: inline">No Variants defined</h1>
        </div>
      </script>


      <script id="variants-template" type="text/x-handlebars-template">
       {{#each variants}}
        <atom-panel>
          <div class="inset-panel">
              <div class="panel-heading"><h1>Variant name: {{name}}</h1></div>
              <!-- begin panel-body -->
              <div class="panel-body padded">
                <div class="block">
                  <h3>Global settings</h3>
                  <button class='btn icon icon-plus inline-block-tight'></button>
                </div>
                <!-- Global -->
                {{#each preference}}
                  <div class="block">
                    <label for={{name}}>{{name}}</label>
                    <input class='input-text' type='text' name="{{name}}" id="{{name}}" placeholder='' value="{{value}}">
                  </div>
                {{/each}}
                <!-- end Global -->

                <div class="line-div"></div>

                {{#each platform}}
                  <div class="block">
                    <h3>{{name}} only</h3>
                    <button class='btn icon icon-plus inline-block-tight'></button>
                  </div>
                  {{#each preference}}
                    <div class="block">
                      <label for={{name}}>{{name}}</label>
                      <input class='input-text' type='text' name="{{name}}" id="{{name}}" placeholder='' value="{{value}}">
                    </div>
                  {{/each}}
                  <div class="line-div"></div>
                {{/each}}

              </div>
              <!-- end panel-body -->
          </div>
        </atom-panel>
        {{/each}}
      </script>

      <script id="single-variant-template" type="text/x-handlebars-template">
        <atom-panel>
          <div class="inset-panel">
              <div class="panel-heading"><h1>Variant name: {{name}}</h1></div>
              <!-- begin panel-body -->
              <div class="panel-body padded">
                <div class="block">
                  <h3>Global settings</h3>
                  <button class='btn icon icon-plus inline-block-tight' variant-add-preference variant-ref="{{name}}"></button>
                </div>
                <!-- Global -->
                {{#each preference}}
                  <div class="block">
                    <label for={{name}}>{{name}}</label>
                    <input class='input-text native-key-bindings' type='text' variant-ref="{{../name}}" variant-preference-id="{{name}}" name="{{name}}" id="{{../name}}-{{name}}" placeholder='' value="{{value}}">
                  </div>
                {{/each}}
                <!-- end Global -->

                <div class="line-div"></div>

                {{#each platform}}
                  <div class="block">
                    <h3>{{name}} only</h3>
                    <button class='btn icon icon-plus inline-block-tight' variant-add-preference-platform variant-ref="{{../name}}" variant-platform-ref="{{name}}"></button>
                  </div>
                  {{#each preference}}
                    <div class="block">
                      <label for={{name}}>{{name}}</label>
                      <input class='input-text native-key-bindings' type='text' name="{{name}}" variant-ref="{{../../name}}" variant-platform-ref="{{../name}}"  variant-preference-platform-id="{{name}}" id="{{../../name}}-{{../name}}-{{name}}" placeholder='' value="{{value}}">
                    </div>
                  {{/each}}
                  <div class="line-div"></div>
                {{/each}}

              </div>
              <!-- end panel-body -->
          </div>
        </atom-panel>
      </script>

      <script id="variants-selector-template" type="text/x-handlebars-template">
          <div class='btn-group'>
              {{#each variants}}
                <!--<button class='btn selected'>One</button>-->
                <button class='btn' variant-selector="{{name}}">{{name}}</button>
              {{/each}}
          </div>
      </script>
      `
    }
}
