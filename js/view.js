/* jshint browser: true */
/* global $, Mustache */

// e.g. "(december) big sur hike"
var eventRe = /\((.*?)\)\s+(.*)$/;

var nameRe = /@\w+/g;

var colChoiceTemplate = Mustache.compile($('#col-choice-template').html());
var categoryTemplate = Mustache.compile($('#category-template').html());
var monthRowTemplate = Mustache.compile($('#month-row-template').html());


var monthFreqs = function(events) {
  var freqs = [];
  for(var i = 0; i < 12; i++) {
    freqs.push(0);
  }

  // include all relevant month indices from a string like 'jul 27-aug 13'
  var strs = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  events.forEach(function(event) {
    var earliest = Infinity;
    var latest = -Infinity;
    strs.forEach(function(str, i) {
      if(event.time.toLowerCase().indexOf(str) !== -1) {
        earliest = Math.min(earliest, i);
        latest = Math.max(latest, i);
      }
    });
    for(var month = earliest; month <= latest; month++) {
      freqs[month]++;
    }
  });

  return freqs;
};

var parseEvent = function(el) {
  if(typeof el !== 'object') {
    var match = el.match(eventRe);
    return {
      time: match[1],
      event: match[2]
    };
  } else if(el.time && el.event) {
    return el;
  } else {
    return undefined;
  }
};

var categoryBoxFromData = function(dataset) {
  // formatted data
  var fData = $.extend({}, dataset);

  var fEvents = dataset.entries
    .map(parseEvent)
    .filter(function(e) { return e; });
  fData.events = formatEvents(fEvents);
  fData.count = fEvents.length;
  fData.months = monthFreqs(fEvents);

  return categoryTemplate(fData);
};

var monthRowFromData = function(dataset) {
  return monthRowTemplate({
    title: dataset.title,
    months: monthFreqs(dataset.entries.map(parseEvent).filter(function(e) { return e; })),
  });
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
  $('.month-row').remove();
  $.each(collection, function(i, dataset) {
    $('.category-boxes').append(categoryBoxFromData(dataset));
    $('.month-rows').append(monthRowFromData(dataset));
  });
};

var cols = $.map(window.Review, function(v, k) { return k; });

drawColChoices(cols);

var currentCol = document.location.hash.substr(1) || 'summary';
drawCollection(currentCol);

$('.toggle-table-link').click(function() {
  $('.category-boxes, .month-rows').toggle();
  $('.toggle-table-link').text($('.toggle-table-link').text() === 'table' ? 'boxes' : 'table');
});
