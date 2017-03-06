module.exports = {
    render: function() {
      return `
        <atom-panel class='padded'>
          <div class="inset-panel padded">
            <div class="block">
              <label for="preference-name">Variant name</label>
              <input class='input-text native-key-bindings' type='text' name="variant-name" id="txt-new-variant-name" placeholder='your variant name'>
            </div>
            <div class='block'>
              <button class='btn btn-primary icon icon-check inline-block-tight' id="btn-confirm-add-variant">Confirm</button>
              <button class='btn btn-error icon icon-x inline-block-tight' id="btn-cancel-add-variant">Cancel</button>
            </div>
          </div>
        </atom-panel>
      `
    },
    getItem(JQuery){
      var item= JQuery(document.createElement('div'));
      item.append(this.render());
      return item;
    }
}
