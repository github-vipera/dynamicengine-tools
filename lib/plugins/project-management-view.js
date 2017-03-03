module.exports = {
    render: function() {
      return `
      <div style="display:flex;height: 100%;" class="settings-view pane-item">

          <div style="" class='plugins-settings-left-menu-bar-container config-menu'>
                <div class='select-list plugins-settings-left-menu-bar'>
                    <ol id='plugin-settings-menu-list' class='list-group panels-menu nav nav-pills nav-stacked plugins-settings-left-menu-list' style='margin-bottom: 0;padding-left: 0;list-style: none;'>
                        <li class='plugins-settings-left-menu-list-item menu-item-selected' id='InstalledPluginsMenuItem'>
                            <div class='icon icon-puzzle'>Installed Plugins</div>
                        </li>
                        <li class='plugins-settings-left-menu-list-item' id='InstallMenuItem'>
                            <div class='icon icon-plus'>Install</div>
                        </li>
                        <li class='plugins-settings-left-menu-list-item' id='VariantsMenuItem'>
                            <div class='icon icon-versions'>Variants</div>
                        </li>
                    </ol>
                </div>
          </div>

          <div class="panel padded plugins-settings-panel hidden-panel" ui-view="main">

          </div>


        </div>
      `
    }
}
