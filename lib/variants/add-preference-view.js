module.exports = {
    render: function() {
      return `
        <atom-panel class='padded'>
            <div class="block">
              <label for="preference-name">Preference name</label>
              <input class='input-text native-key-bindings' type='text' name="preference-name" id="txt-new-preference-name" placeholder='your Preference name' tabindex="0">
            </div>
            <div class="block">
              <label for="preference-name">Preference value</label>
              <input class='input-text native-key-bindings' type='text' name="preference-value" id="txt-new-preference-value" placeholder='your Preference value' tabindex="1">
            </div>
            <div class='block'>
              <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-add-preference">Confirm</button>
              <button class='btn btn-error icon icon-x inline-block-tight' id="btn-cancel-add-preference">Cancel</button>
            </div>
        </atom-panel>
      `
    },
    getItem(JQuery){
      var item= JQuery(document.createElement('div'));
      item.append(this.render());
      return item;
    },
    clear(JQuery){
      JQuery('#txt-new-preference-name').val('');
      JQuery('#txt-new-preference-value').val('');
    }
}
