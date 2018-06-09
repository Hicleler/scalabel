$(document).ready(function() {
  let dashboard = $('#go_to_dashboard');
  let vendor = $('#go_to_vendor_dashboard');
  dashboard.hide();
  vendor.hide();
  $('#project-form').submit(function(e) {
    e.preventDefault();
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
      if (x.readyState === 4) {
        dashboard.show();
        vendor.show();
      }
    };
    x.open('POST', './postProject');
    x.send(new FormData(this));
  });
});

let itemSelect = document.getElementById('item_type');
let labelSelect = document.getElementById('label_type');
// disable all label options until item is picked
for (let i = 1; i < labelSelect.options.length; i++) {
  labelSelect.options[i].disabled = true;
}
itemSelect.onchange = function() {
  // disable all label options
  for (let i = 1; i < labelSelect.options.length; i++) {
    labelSelect.options[i].disabled = true;
  }
  labelSelect.selectedIndex = 0;
  // enable just the ones that are valid
  if (itemSelect.value === 'image') {
    enableOption(labelSelect, 'box2d');
    enableOption(labelSelect, 'segmentation');
  } else if (itemSelect.value === 'video') {
    enableOption(labelSelect, 'box2d');
  } else if (itemSelect.value === 'pointcloud') {
    enableOption(labelSelect, 'box3d');
  }
};

/**
 * Enable the specified option in the specified select.
 * @param {object} select - The html select.
 * @param {string} optionName - The name of the option to enable.
 */
function enableOption(select, optionName) {
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === optionName) {
      select.options[i].disabled = false;
    }
  }
}
