// e.g. "(december) big sur hike"
var eventRe = /\((.*?)\)\s+(.*)$/;

var nameRe = /@\w+/g;

var colChoiceTemplate = Mustache.compile($('#col-choice-template').html());
var categoryTemplate = Mustache.compile($('#category-template').html());

var categoryBoxFromData = function(dataset) {
  // formatted data
  var fData = $.extend({}, dataset);

  var fEvents = [];
  $.each(dataset.entries, function(i, el) {
    if(typeof el !== 'object') {
      var match = el.match(eventRe);
      fEvents.push({
        time: match[1],
        event: match[2]
      });
    } else {
      if(el.time && el.event) {
        fEvents.push(el);
      }
    }
  });
  fData.events = formatEvents(fEvents);
  fData.count = fEvents.length;

  return categoryTemplate(fData);
};

var formatEvents = function(events) {
  var result = [];
  $.each(events, function(i, ev) {
    //XXX don't mutate this
    ev.event = ev.event.replace(nameRe, '<a class="name" href="#">$&</a>');
    result.push(ev);
  });
  return result;
};

var onColClick = function() {
  drawCollection($(this).text());
};

var drawColChoices = function(cols) {
  $('#collection-choices').append($(colChoiceTemplate({cols: cols})));
  $('#collection-choices a').click(onColClick);
};

var drawCollection = function(colName) {
  var collection = window.Review[colName];
  $('.category-box').remove();
  $.each(collection, function(i, dataset) {
    $('body').append(categoryBoxFromData(dataset));
  });
};

var cols = $.map(window.Review, function(v, k) { return k; });

drawColChoices(cols);

var currentCol = document.location.hash.substr(1) || 'summary';
drawCollection(currentCol);
