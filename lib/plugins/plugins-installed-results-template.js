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
          <div class="package-message" style="padding-top:3px;font-size:10pt;">
            <span class='text-info'>{{source.type}}</span>
          </div>
        </div>

        <div class="meta">
          <div class="meta-user">
            <span class='icon icon-mark-github'></span>

            {{#if source.url}}
            <a class="author" href="{{source.url}}">
              {{source.url}}
            </a>
            {{/if}}

            {{#if source.path}}
            <a class="author" href="{{source.path}}">
              {{source.path}}
            </a>
            {{/if}}

            {{#if source.id}}
            <a class="author" href="#">
              {{source.id}}
            </a>
            {{/if}}

          </div>
          <div class="meta-controls">
            <div class="btn-toolbar">
              <div class="btn-group" style="display: block;">
                <button type="button" class="btn icon icon-trashcan uninstall-button" style="display: inline-block;" uninstall-plugin-action pluginId='{{@key}}'>Uninstall</button>
              </div>
            </div>
          </div>
        </div>

        </div>
        {{/each}}



`}
}
