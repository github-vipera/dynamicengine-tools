'use babel';

module.exports = {
    render: function(){
      return `

        {{#if total}}
          <span class='icon icon-puzzle'></span>
          <h1 style="display: inline">{{total}} plugins found</h1>

          <div class='container package-container' style="padding-top:20px;">
            {{#each results}}
              <div class='package-card col-lg-8'>

                <div class="stats pull-right">
                  <span class="stats-item">
                    {{#each rating}}
                      <span class="icon icon-star"></span>
                      <span class="value">{{formatRating this}}</span></span>
                    {{/each}}
                  </span>
                </div>

                {{#each name}}
                {{/each}}

                <div class="body">
                  <h4 class="card-name">
                    <a class="package-name">
                      {{name.[0]}}
                    </a>
                    <span></span>
                    <span class="package-version">
                      <span class="value">
                      {{#each version}}
                        {{this}}
                      {{/each}}
                      </span>
                    </span>
                  </h4>
                  <span class="package-description">
                    {{#each description}}
                      {{this}}
                    {{/each}}
                  </span>
                  <div class="package-message">
                  {{#each modified}}
                  {{/each}}
                    <a class='text-smaller text-info' style='font-size:8pt;'>Last update {{formatLastUpdate modified.[0]}}</a>
                  </div>
                </div>

                <div class="meta">
                  <div class="meta-user">
                    <span class='icon icon-octoface'></span>
                    <a class="author" href="{{#each homepage}}{{this}}{{/each}}">
                      {{#each homepage}}
                        {{this}}
                      {{/each}}
                    </a>
                  </div>
                  <div class="meta-controls">
                    <div class="btn-toolbar">
                      <div class="btn-group" style="display: block;">
                        <button type="button" class="btn btn-info icon icon-cloud-download install-button" btn-install-plugin pluginId="{{name.[0]}}">Install</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            {{/each}}
          </div>

        {{else}}

          <div class='block icon icon-puzzle'>
          <h1 style="display: inline">Plugins not found</h1>

        {{/if}}

`}
}

/**

<span class="stats-item" style="display: inline;">
  <span class="icon icon-cloud-download"></span>
  <span class="value">295,041</span>
</span>

{{#each description}}
  <div>{{this}}</div>
{{/each}}
**/
