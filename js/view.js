// e.g. "(december) big sur hike"
var eventRe = /\((.*)\) (.*)$/;

var nameRe = /@\w+/g;

var categoryTemplate = Mustache.compile($('#category-template').html());

var categoryBoxFromData = function(title, elements) {
  var events = [];
  var props = {};
  $.each(elements, function(i, el) {
    if(typeof el !== 'object') {
      var match = el.match(eventRe);
      events.push({
        time: match[1],
        event: match[2]
      });
    } else {
      if(el.time && el.event) {
        events.push(el);
      } else {
        $.extend(props, el);
      }
    }
  });
  var count = events.length;
  var note = props['note'] || '';

  events = formatEvents(events);

  return categoryTemplate({
    title: title,
    events: events,
    count: count,
    note: note
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

var order = window.DATA['order'];
$.each(order, function(i, cat) {
  $('body').append(categoryBoxFromData(cat, window.DATA[cat]));
});
