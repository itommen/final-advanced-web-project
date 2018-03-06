import angular from 'angular';

//import d3 from 'd3';

const CONTROLLER = 'statisticsController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, ($scope, $state, Post) => {
    $scope.createDetailedRecipesGraph = () => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // set the ranges
      const x = d3.scale.ordinal().range([0, width], 0.1);
      const y = d3.scale.linear().range([height, 0]);

      // const xAxis = d3.axisBottom(x);
      // const yAxis = d3.axisLeft(y);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

      // const chart = d3.select('.chart')
      //   .attr('width', width + margin.left + margin.right)
      //   .attr('height', height + margin.top + margin.bottom)
      //   .append('g')
      //   .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // add the SVG element
      var svg = d3.select("#detailed-recipes-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // TODO: Get real recipes' data instead of stubs
      let data = [{ Title: 'Cake recipe', Length: 10 }, { Title: 'Salad recipe', Length: 20 }, { Title: 'Soup recipe', Length: 30 }];

      // load the data
      data.forEach(function (d) {
        d.Title = d.Title;
        d.Length = +d.Length;
      });

      Promise.resolve()
        .then(() => {
          // scale the range of the data
          x.domain(data.map(d => { return d.Title; }));
          y.domain([0, d3.max(data, d => { return d.Length; })]);

          // add axis
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Length");

          // Add bar chart
          svg.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.Title); })
            .attr("width", x.rangeBand())
            .attr("y", function (d) { return y(d.Length); })
            .attr("height", function (d) { return height - y(d.Length); });
        });
    };
  });

export default CONTROLLER;