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
                {{#each description}}
                  <div>{{this}}</div>
                {{/each}}
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
{{#each description}}
  <div>{{this}}</div>
{{/each}}
**/
