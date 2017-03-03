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
                {{this}}
              </span>
            </span>
          </h4>
          <span class="package-description">
              {{this}}
          </span>
          <div class="package-message">
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
                <button type="button" class="btn btn-info icon icon-cloud-download install-button">Install</button>
              </div>
            </div>
          </div>
        </div>

        </div>
        {{/each}}



`}
}
