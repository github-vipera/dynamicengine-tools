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

        <div class="section" id="main-section">

        </div>

      </div>


      <script id="no-entry-template" type="text/x-handlebars-template">
        <div class='block'>
          <h1 style="display: inline">No Variants defined</h1>
        </div>
      </script>

      <script id="single-variant-container" type="text/x-handlebars-template">
        <div class='block'>
          <h1 style="display: inline">No Variants defined</h1>
        </div>
      </script>

      `
    }
}
