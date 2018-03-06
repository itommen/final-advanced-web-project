import angular from 'angular';

const CONTROLLER = 'statisticsController';

angular.module('advanced.controllers')
  .controller(CONTROLLER, ($scope, $state, Post, LoggedUser) => {
    //LoggedUser.ensureLogged();

    $scope.createDetailedRecipesGraph = () => {
      const margin = { top: 20, right: 30, bottom: 150, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // set the ranges
      const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.4);
      const y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

      // add the SVG element
      var svg = d3.select("#detailed-recipes-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // get the recipes' data
      Post.query().$promise
        .then(result => {
          let data = result;
          data.forEach(function (d) {
            d.Title = d.title;
            d.Length = + d.content.length;
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
        });
    };

    $scope.createContributingUsersGraph = () => {
      var width = 400,
        height = 400,
        radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(["#a05d56", "#6b486b", "#ff8c00", "#98abc5", "#8a89a6", "#d0743c", "#7b6888"]);
      debugger;

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var svg = d3.select("#contributing-users-graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      Post.byUsername().$promise
        .then((data) => {
          debugger;
          var pie = d3.layout.pie()
            .sort(null)
            .value(({ count }) => count);

          data.forEach(function (d) {
            d.count = +d.count;
          });

          var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

          g.append("path")
            .attr("d", arc)
            .style("fill", ({ _id }) => color(_id));

          g.append("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(({ _id }) => _id);
        });
    };
  });

export default CONTROLLER;