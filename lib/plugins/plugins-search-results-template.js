'use babel';

module.exports = {
    render: function(){
      return `

        {{#if total}}
          <div class='block icon icon-puzzle'>
          <h1 style="display: inline">Found {{total}} plugins</h1>

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


                <div class="body">
                  <h4 class="card-name">
                    <a class="package-name">
                      {{#each description}}
                        {{this}}
                      {{/each}}
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
                    {{#each homepage}}
                      {{this}}
                    {{/each}}
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
