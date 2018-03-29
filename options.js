
var timer;
function save(key) {
  if (timer)
    clearTimeout(timer);

  timer = setTimeout(function() {
    timer = null;
    var data = {};
    data[key] = document.getElementById(key).value;
    chrome.storage.sync.set(data, function() {});
  }, 100);
};

function appendTextarea(key, data) {
  var textarea = document.createElement('textarea');
  textarea.id = key;
  textarea.value = data[key];
  textarea.onkeydown = function() {
    save(key);
  };
  document.body.appendChild(textarea);
}

chrome.storage.sync.get({
  styles: null,
  domains: null,
}, function(items) {
  document.body.append("Put style rules below:");
  appendTextarea('styles', items);

  document.body.append("Put domains to skip below (line separated):");
  appendTextarea('domains', items);
});
