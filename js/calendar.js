// Visual Studio references

/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="jquery-ui-1.10.2.min.js" />
/// <reference path="moment.min.js" />
/// <reference path="timelineScheduler.js" />

var today = moment().startOf('day');

var Calendar = {
    Periods: [
        {
            Name: '3 days',
            Label: '3 days',
            TimeframePeriod: (60 * 3),
            TimeframeOverall: (60 * 24 * 3),
            TimeframeHeaders: [
                'Do MMM',
                'HH'
            ],
            Classes: 'period-3day'
        },
        {
            Name: '1 week',
            Label: '1 week',
            TimeframePeriod: (60 * 24),
            TimeframeOverall: (60 * 24 * 7),
            TimeframeHeaders: [
                'MMM',
                'Do'
            ],
            Classes: 'period-1week'
        },
        {
            Name: '1 month',
            Label: '1 month',
            TimeframePeriod: (60 * 24 * 1),
            TimeframeOverall: (60 * 24 * 28),
            TimeframeHeaders: [
                'MMM',
                'Do'
            ],
            Classes: 'period-1month'
        }
    ],

    Items: [
        {
            id: 20,
            name: '<div>Item 1</div><div>Sub Info</div>',
            sectionID: 1,
            start: moment(today).add('days', -1),
            end: moment(today).add('days', 3),
            classes: 'item-status-three',
            events: [
                {
                    label: 'one',
                    at: moment(today).add('hours', 6),
                    classes: 'item-event-one'
                },
                {
                    label: 'two',
                    at: moment(today).add('hours', 10),
                    classes: 'item-event-two'
                },
                {
                    label: 'three',
                    at: moment(today).add('hours', 11),
                    classes: 'item-event-three'
                }
            ]
        },
        {
            id: 21,
            name: '<div>Item 2</div><div>Sub Info</div>',
            sectionID: 3,
            start: moment(today).add('days', -1),
            end: moment(today).add('days', 3),
            classes: 'item-status-one',
            events: [
                {
                    icon: '',
                    label: 'one',
                    at: moment(today).add('hours', 6),
                    classes: 'item-event-one'
                }
            ]
        },
        {
            id: 22,
            name: '<div>Item 3</div>',
            start: moment(today).add('hours', 12),
            end: moment(today).add('days', 3).add('hours', 4),
            sectionID: 1,
            classes: 'item-status-none'
        }
    ],

    Sections: [
        {
            id: 1,
            name: 'Section 1'
        },
        {
            id: 2,
            name: 'Section 2'
        },
        {
            id: 3,
            name: 'Section 3'
        }
    ],

    Init: function () {
        TimeScheduler.Options.GetSections = Calendar.GetSections;
        TimeScheduler.Options.GetSchedule = Calendar.GetSchedule;
        TimeScheduler.Options.Start = today;
        TimeScheduler.Options.Periods = Calendar.Periods;
        TimeScheduler.Options.SelectedPeriod = '1 week';
        TimeScheduler.Options.Element = $('.calendar');

        TimeScheduler.Options.AllowDragging = true;
        TimeScheduler.Options.AllowResizing = true;

        TimeScheduler.Options.Events.ItemClicked = Calendar.Item_Clicked;
        TimeScheduler.Options.Events.ItemDropped = Calendar.Item_Dragged;
        TimeScheduler.Options.Events.ItemResized = Calendar.Item_Resized;

        TimeScheduler.Options.Events.ItemMovement = Calendar.Item_Movement;
        TimeScheduler.Options.Events.ItemMovementStart = Calendar.Item_MovementStart;
        TimeScheduler.Options.Events.ItemMovementEnd = Calendar.Item_MovementEnd;

        TimeScheduler.Options.Text.NextButton = '&nbsp;';
        TimeScheduler.Options.Text.PrevButton = '&nbsp;';

        TimeScheduler.Options.MaxHeight = 100;

        TimeScheduler.Init();
    },

    GetSections: function (callback) {
        callback(Calendar.Sections);
    },

    GetSchedule: function (callback, start, end) {
        callback(Calendar.Items);
    },

    Item_Clicked: function (item) {
        console.log(item);
    },

    Item_Dragged: function (item, sectionID, start, end) {
        var foundItem;

        console.log(item);
        console.log(sectionID);
        console.log(start);
        console.log(end);

        for (var i = 0; i < Calendar.Items.length; i++) {
            foundItem = Calendar.Items[i];

            if (foundItem.id === item.id) {
                foundItem.sectionID = sectionID;
                foundItem.start = start;
                foundItem.end = end;

                Calendar.Items[i] = foundItem;
            }
        }

        TimeScheduler.Init();
    },

    Item_Resized: function (item, start, end) {
        var foundItem;

        console.log(item);
        console.log(start);
        console.log(end);

        for (var i = 0; i < Calendar.Items.length; i++) {
            foundItem = Calendar.Items[i];

            if (foundItem.id === item.id) {
                foundItem.start = start;
                foundItem.end = end;

                Calendar.Items[i] = foundItem;
            }
        }

        TimeScheduler.Init();
    },

    Item_Movement: function (item, start, end) {
        var html;

        html =  '<div>';
        html += '   <div>';
        html += '       Start: ' + start.format('Do MMM YYYY HH:mm');
        html += '   </div>';
        html += '   <div>';
        html += '       End: ' + end.format('Do MMM YYYY HH:mm');
        html += '   </div>';
        html += '</div>';

        $('.realtime-info').empty().append(html);
    },

    Item_MovementStart: function () {
        $('.realtime-info').show();
    },

    Item_MovementEnd: function () {
        $('.realtime-info').hide();
    }
};

$(document).ready(Calendar.Init);