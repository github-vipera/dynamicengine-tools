module.exports = {
    render: function() {
      return `
      <div class="plugins-settings-panel" ui-view="main">

        <div class="section">
          <div class='block icon icon-versions'>
            <h1 style="display: inline">Variants</h1>
          </div>
          <div class='block'>
            <button class='btn icon icon-plus inline-block-tight'>Create Variant</button>
            <button class='btn btn-error icon icon-x inline-block-tight'>Delete</button>
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
        <atom-panel>
          <div class="inset-panel">
              <div class="panel-heading"><h1>Variant name: {{name}}</h1></div>
              <div class="panel-body padded">
              <div class="block"><h3>Global settings</h3><div>
              {{#each preference}}
                <div>
                  <label for={{name}}>{{name}}</label>
                  <input class='input-text' type='text' name="{{name}}" id="{{name}}" placeholder='' value="{{value}}">
                </div>
              {{/each}}
              </div>
              <div class="line-div"></div>
              {{#each platform}}
                <div class="block"><h3>{{name}} only</h3><div>
                {{#each preference}}
                  <div>
                    <label for={{name}}>{{name}}</label>
                    <input class='input-text' type='text' name="{{name}}" id="{{name}}" placeholder='' value="{{value}}">
                  </div>
                {{/each}}
                </div>
                <div class="line-div"></div>  
              {{/each}}
          </div>
        </atom-panel>
      </script>
      `
    }
}
