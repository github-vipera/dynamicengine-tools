'use babel';

module.exports = {
    render: function(){
      return `

          <span class='icon icon-puzzle'></span>
          <h1 style="display: inline">{{data.length}} plugins found</h1>

          <div class='container package-container' style="padding-top:20px;">
            {{#each data}}
              <div class='package-card col-lg-8'>

                <div class="stats pull-right">
                  <span class="stats-item">
                    {{#each rating}}
                      <span class="icon icon-star"></span>
                      <span class="value">{{formatRating this}}</span></span>
                    {{/each}}
                  </span>
                </div>

                <div class="body">
                  <h4 class="card-name">
                    <a class="package-name">
                      {{name}}
                    </a>
                    <span></span>
                    <span class="package-version">
                      <span class="value">
                      {{version}}
                      </span>
                    </span>
                  </h4>
                  <span class="package-description">
                    {{description}}
                  </span>
                  <div class="package-message">
                    <a class='text-smaller text-info' style='font-size:8pt;'>Last update {{formatLastUpdate lastUpdate}}</a>
                  </div>
                </div>

                <div class="meta">
                  <div class="meta-user">
                    <span class='icon icon-mark-github'></span>
                    <a class="author" href="{{url}}">
                      {{url}}
                    </a>
                  </div>
                  <div class="meta-controls">
                    <div class="btn-toolbar">
                      <div class="btn-group" style="display: block;">
                        <button type="button" class="btn btn-info icon icon-cloud-download install-button" btn-install-plugin pluginId="{{repoUrl}}">Install</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            {{/each}}
          </div>


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
