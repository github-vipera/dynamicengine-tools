'use babel';

module.exports = {
    render: function(){
      return `

        {{#each plugins}}
        <div class='package-card col-lg-8'>

        <div class="body">
          <h4 class="card-name">
            <a class="package-name">
              {{@key}}
            </a>
            <span></span>
            <span class="package-version">
              <span class="value">
                {{plugin.$.version}}
              </span>
            </span>
          </h4>
          <span class="package-description">
              {{plugin.description}}
              {{plugin.DESCRIPTION}}
          </span>
          <div class="package-message">
            <span class='text-subtle'>{{source.type}}</span>
          </div>
        </div>

        <div class="meta">
          <div class="meta-user">
            <span class='icon icon-octoface'></span>
            <a class="author" href="{{source.url}}">
              {{source.url}}
            </a>
          </div>
          <div class="meta-controls">
            <div class="btn-toolbar">
              <div class="btn-group" style="display: block;">
                <button type="button" class="btn icon icon-gear settings" style="display: inline-block;">Settings</button>
                <button type="button" class="btn icon icon-trashcan uninstall-button" style="display: inline-block;">Uninstall</button>
              </div>
            </div>
          </div>
        </div>

        </div>
        {{/each}}



`}
}
