import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';

import "/imports/lib/collections";
import './home.html';

// For chartJS
let config = {};

function madeChartData(activities) {
  config = {
    type: 'pie',
    data: {
      labels: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7', 'Page 8', 'Page 9'],
      datasets: [{
        label: '# of Views',
        data: [
          activities.filter(p => p.page === 'PageView1').length,
          activities.filter(p => p.page === 'PageView2').length,
          activities.filter(p => p.page === 'PageView3').length,
          activities.filter(p => p.page === 'PageView4').length,
          activities.filter(p => p.page === 'PageView5').length,
          activities.filter(p => p.page === 'PageView6').length,
          activities.filter(p => p.page === 'PageView7').length,
          activities.filter(p => p.page === 'PageView8').length,
          activities.filter(p => p.page === 'PageView9').length,
        ],
        backgroundColor: [
          'rgba(25, 94, 131, 0.4)',
          'rgba(237, 184, 121, 0.4)',
          'rgba(224, 123, 57, 0.4)',
          'rgba(105, 189, 210, 0.4)',
          'rgba(128, 57, 30, 0.4)',
          'rgba(204, 231, 232, 0.4)',
          'rgba(4, 47, 102, 0.4)',
          'rgba(185, 116, 85, 0.4)',
          'rgba(68, 188, 216, 0.4)',
        ],
        borderColor: [
          'rgba(25, 94, 131, 1)',
          'rgba(237, 184, 121, 1)',
          'rgba(224, 123, 57, 1)',
          'rgba(105, 189, 210, 1)',
          'rgba(128, 57, 30, 1)',
          'rgba(204, 231, 232, 1)',
          'rgba(4, 47, 102, 1)',
          'rgba(185, 116, 85, 1)',
          'rgba(68, 188, 216, 1)',
        ],
        borderWidth: 1
      }],
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
    },
  };
}

let myChart = null;

function changeChart(newType) {
  const ctx = document.getElementById("container").getContext("2d");
  // Remove the old chart and all its event handles
  if (myChart) {
    myChart.destroy();
  }
  // Chart.js modifies the object you pass in. Pass a copy of the object so we can use the original object later
  let temp = jQuery.extend(true, {}, config);
  temp.type = newType;
  myChart = new Chart(ctx, temp);
}

const doChart = () => {
  const activities = UserActivities.find({}).fetch();
  setTimeout( () => {
    madeChartData(activities);
    changeChart('pie');
  }, 500);
};

Template.App_home.helpers({
  isReady: sub => {
    let subs;
    if (sub) {
      subs = FlowRouter.subsReady(sub);
    } else {
      subs = FlowRouter.subsReady();
    }
    if (!subs) {
      return false;
    }
    doChart();
    return true;
  },
  userActivities: () => UserActivities.find({}),
});

Template.App_home.onRendered(() => {
  console.log(` ${moment().format('DD.MM.YYYY HH:mm:ss')} > App_home start`);
});

Template.App_home.events({
  'click .changeChart': event => {
    event.preventDefault();
    changeChart(event.currentTarget.dataset.id);
  },
});
